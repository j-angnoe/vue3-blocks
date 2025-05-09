import { createDeferred, highlightErrorInSource } from "./utils.js";
import { defineAsyncComponent } from "vue";

export class EmbeddedScript {
    constructor(scriptEl, templateEl) {
        this.scriptEl = scriptEl;
        this.templateEl = templateEl;
    }

    splitScriptIntoParts() {
        const scriptLines = this.scriptEl.innerHTML.split("\n").map(line => [line.trimLeft().startsWith("import "), line]);

        let components = {};

        const baseUrl = this.templateEl.getAttribute('base-url');

        const preamble = scriptLines.filter(e => e[0]).map(e => e[1]).map(line => {

            let [fullMatch, importName] = line.match(/["']([^'"]+)["']\s*;?\s*/)

            // Make relative paths absolute
            if (importName.startsWith('.')) { 
                console.log('import interpretting', importName, ' against ', baseUrl);

                let importNameAbsolute = (new URL(importName, baseUrl)).href;
                line = line.replace(importName, importNameAbsolute);
                console.log('import ', importName, ' becomes ', importNameAbsolute);
                importName = importNameAbsolute;
            }

            if (importName.endsWith('.vue')) { 
                components[importName.split('/').pop().split('.vue')[0]] = defineAsyncComponent(async () => {
                    const {ExternalComponent} = await import('./ExternalComponent.js')
                    return new ExternalComponent(this.templateEl.cloneNode(true), importName).GetVueDefinition();
                });
                return null;
            }
            if (importName == "vue") { 
                return line.replace(/import\s+/, 'const ')
                            .replace(/\sfrom\s/,' = ')
                            .replace(fullMatch, 'window.VueBlocksBundle.Vue;')
            }
            
            try {
                import.meta.resolve(importName);
                return line;
            } catch (e) {
                // console.log('esming ' + importName)
                return line.replace(fullMatch, `"https://esm.sh/${importName}"`);
            }
        }).filter(Boolean).join("\n")

        let code = scriptLines.filter(e => !e[0]).map(e => e[1]).join("\n");

        return [preamble, code, components];
    }

    converClassDefinitionToVueOptionsDefinition(classDefinition) {
        let classInstance = classDefinition ? new classDefinition : {};

        // filters.. filters can be a prop but it can also be data.
        // it's ambigious, so dont remove filters from data because it may brake
        // applications and there is no risk to define them as Vue filters as well.
        let { props, watch, computed, components, directives, ...data } = classInstance;

        const lifeCycleMethods = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'beforeUnmount', 'unmounted', 'errorCaptured', 'renderTracked', 'renderTriggered', 'destroyed', 'beforeDestroy'];
        let methods = {};
        let lifeCycle = {};
        for (var method of Object.getOwnPropertyNames(classDefinition.prototype)) {
            if (method == 'constructor') continue;
            if (typeof classDefinition.prototype[method] == 'function') {
                if (~lifeCycleMethods.indexOf(method)) {
                    lifeCycle[method] = classDefinition.prototype[method];
                } else {
                    methods[method] = classDefinition.prototype[method];
                }
                delete data[method];
            }
        }

        return {
            data() {
                return JSON.parse(JSON.stringify(data));
            },
            props,
            watch,
            computed,
            components,
            directives,
            ...lifeCycle,
            filters: data.filters || {},
            methods
        }
    }

    async recompileScriptSetup(code, preamble) { 

        // console.log("RECOMPILING ", [code, preamble]);

        let props = null;
        let propName = '$props';
        let emits = null;
        let emitName = '$emit';

        // console.log(ast);
        let returnValues = [];
        let replaces = {};

        const ReturnValue = () => {
            Object.entries(replaces).forEach(([search, replace]) => {
                code = code.replace(search, replace);
            })
            
            if (returnValues.length) {
                // console.log('return values will be ' + returnValues.join(','));
                code += "\nreturn {" + returnValues.join(",") + "}\n";
            }
            code = `function(${propName}, { emit: ${emitName} }) { ${code} \n}`;

            return {code, props, emits};
        }

        const SHOULD_RECOMPILE_PREAMBLE = preamble.includes('import');
        const SHOULD_RECOMPILE_CODE = code.trim() > '';

        if (!(SHOULD_RECOMPILE_CODE || SHOULD_RECOMPILE_PREAMBLE)) {
            return ReturnValue(); 
        }

        let acorn;
        try { 
            acorn = await import('acorn');
        } catch (e) { 
            acorn = await import('https://esm.sh/acorn');
        }

        if (SHOULD_RECOMPILE_PREAMBLE) { 
            const referencePreamble = ''+preamble+"\n"+'';
            const astPreamble = acorn.parse(referencePreamble, { ecmaVersion: "latest", sourceType: "module" });

            for (const node of astPreamble.body) { 
                switch(node.type) { 
                    case "ImportDeclaration":
                        returnValues.push(...node.specifiers.map(spec => spec.local.name));
                    break;
                }
            }
        }

        if (SHOULD_RECOMPILE_CODE) { 
            let getVariableNames = (node) => {
                switch(node.id.type) {
                    case "Identifier":
                        return [node.id.name]
                    case "ObjectPattern": 
                        return node.id.properties.map(p => {
                            return p.value.name
                        });
                }
            }

            const referenceCode = 'function program(){'+code+"\n"+'}';
            const ast = acorn.parse(referenceCode, { ecmaVersion: "latest", sourceType: "module" });

            for (const node of ast.body[0].body.body) { 
                switch(node.type) {
                    case "VariableDeclaration":
                        node.declarations.forEach(node => {
                            returnValues.push(...getVariableNames(node));

                            let callee = node.init?.callee?.name;
                            
                            switch(callee) {
                                case "defineProps":
                                    props = eval(referenceCode.substring(node.init.callee.end, node.init.end))
                                    propName = '$setupFunctionProps';
                                    replaces[referenceCode.substring(node.init.start, node.init.end)] = '$setupFunctionProps';
                                    break;
                                    case "defineEmits":
                                        emits = eval(referenceCode.substring(node.init.callee.end, node.init.end))
                                        replaces[referenceCode.substring(node.init.start, node.init.end)] = '$setupFunctionEmits';
                                        emitName = '$setupFunctionEmits';
                                    break;
                            }
                        })
                    break;
                    case "FunctionDeclaration":
                        returnValues.push(...getVariableNames(node))
                    break;
                    case "ReturnStatement":
                        // Bail, it has a toplevel return statement
                        // user does it himself.
                        returnValues = []
                }
            }
        }
        
        return ReturnValue();
    }
    async EvaluateComponentDefinition() {
        let deferred = createDeferred();

        let [preamble, code, components] = this.splitScriptIntoParts();

        let receivePayload;
        if (this.scriptEl.hasAttribute('setup')) {
            
            if (!preamble.includes("window.VueBlocksBundle.Vue")) {
                preamble = `const { ref, nextTick, reactive, provide, inject, computed, watch, onMounted, onUnmounted } = window.VueBlocksBundle.Vue;\n${preamble}`
            }
            if (!window.VueBlocksBundle?.Vue) {
                window.VueBlocksBundle ??= {};
                window.VueBlocksBundle.Vue = window.Vue || await import('vue');
            }

            let parsed = await this.recompileScriptSetup(code, preamble);
            
            let { props, emits } = parsed; 

            receivePayload = (setup) => deferred.resolve({ components, props, emits, setup })

            code = parsed.code;
            
            // console.log('core is here', code);

            // alert(Parser);
        } else {
            let process = this.converClassDefinitionToVueOptionsDefinition;
            if (code.match('return class vue')) {
                code = code.replace(/return\s+class\s+vue\s*\{/, 'return class {');
            } else if (code.match('export default')) {
                code = code.replace('export default', 'return ');
                process = (comp) => comp;
            } else {
                code = code.replace(/return\s+class\s+\{/, 'return class {');
            }

            code = code.replace(/\sconstructor\s*\(/, 'mounted(');
            code = code.replace(/\sdestructor\s*\(/, 'destroyed(');

            code = `(function() { ${code} \n })()`;
            receivePayload = function (receive) {
                let final = process(receive);
                final.components ??= {};
                final.components = {...components, ...final.components};
                deferred.resolve(final); 
            }
        }

        this.evaluateModuleCode(preamble, code).then(result => {
            receivePayload(result);
        })

        return await deferred.promise;
    }
    
    async evaluateModuleCode(preamble, code) {
        try { 
            try {
                const { default: dynamicModule } = await this._evaluateModuleCodeWithDynamicModule(preamble, code);
                return dynamicModule;
            } catch (e) {
                if (!(preamble.includes("import") || e instanceof TypeError)) { 
                    throw e;
                }
                var templateId = this.templateEl.outerHTML.split(/\n/)[0];
                console.debug(`using fallback modulecode evaluator for:\n\n${templateId}\n`);
                return await this._evaluateModuleCodeWithScriptNode(preamble, code);
            }
        } catch (e) { 
            const codeHighlighted = e.codeHighlighted || `// preamble\n${preamble}\n\n// code\n${code}`;
            console.error(`module code error in ${templateId}:\n\n${e.message}\n\nin code:\n\n${codeHighlighted}`);
            console.error(e);
        }
    }

    async _evaluateModuleCodeWithDynamicModule(preamble, code) { 
        const blob = new Blob([`${preamble}\n; export default ${code}\n;`], { type: 'application/javascript'});
        const moduleUrl = URL.createObjectURL(blob);
        return await import(moduleUrl);
    }

    _evaluateModuleCodeWithScriptNode(preamble, code) {
        return new Promise((resolve,reject) => {
            const scriptId = 'resolveDynamicModule' + Math.random().toString(36).substring(2, 10);
            const newScript = document.createElement('script');
            const errorHandler = event => {
                if (event.lineno && event.colno) { 
                    event.codeHighlighted = highlightErrorInSource(newScript.textContent, event);
                }
                event.preventDefault();
                reject(event);
            }
            window.addEventListener('error', errorHandler, { once: true });
            newScript.onload = () => {
                window.removeEventListener('error', errorHandler);
            }
            newScript.onerror = () => {
                window.removeEventListener('error', errorHandler);
            }
            newScript.type = 'module';
            newScript.innerHTML = `
                ${preamble};
                window["${scriptId}"](${code});
            `;
            window[scriptId] = payload => {
                delete window[scriptId];
                resolve(payload);
            }
            
            document.body.appendChild(newScript);
        });
    }
}