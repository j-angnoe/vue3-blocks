import { createDeferred } from "./utils.js";
import { defineAsyncComponent } from "vue";

export class EmbeddedScript {
    constructor(scriptEl) {
        this.scriptEl = scriptEl
    }

    splitScriptIntoParts() {
        const scriptLines = this.scriptEl.innerHTML.split("\n").map(line => [line.trimLeft().startsWith("import "), line]);

        let components = {};

        const preamble = scriptLines.filter(e => e[0]).map(e => e[1]).map(line => {
            const [fullMatch, importName] = line.match(/["']([^'"]+)["']\s*;?\s*/)
            if (importName.endsWith('.vue')) { 
                components[importName.split('/').pop().split('.vue')[0]] = defineAsyncComponent(async () => {
                    const {ExternalComponent} = await import('./ExternalComponent.js')
                    return new ExternalComponent(document.createElement('template'), importName).GetVueDefinition();
                });
                return null;
            }
            try {
                import.meta.resolve(importName);
                return line;
            } catch (e) {
                console.log('esming ' + importName)
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

    async EvaluateComponentDefinition() {
        let deferred = createDeferred();

        let [preamble, code, components] = this.splitScriptIntoParts();

    
        
        let receivePayload;
        if (this.scriptEl.hasAttribute('setup')) {

            if (!preamble.includes("vue")) {
                preamble = `import { ref, nextTick, reactive, provide, inject, computed, watch, onMounted, onUnmounted } from "vue";\n${preamble}`
            }

            let props = null;
            let propName = '$props';
            let emits = null;
            let emitName = '$emit';

            if (code.trim() > '') { 
                let acorn;
                try { 
                    acorn = await import('acorn');
                } catch (e) { 
                    acorn = await import('https://esm.sh/acorn');
                }
                const referenceCode = 'function program(){'+code+"\n"+'}';
                const ast = acorn.parse(referenceCode, { ecmaVersion: "latest", sourceType: "module" });

                console.log(ast);
                let returnValues = [];

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

                let replaces = {};
                for (const node of ast.body[0].body.body) { 
                    console.log('node',node);
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

                Object.entries(replaces).forEach(([search, replace]) => {
                    code = code.replace(search, replace);
                })
                if (returnValues.length) {
                    console.log('return values will be ' + returnValues.join(','));
                    code += "\nreturn {" + returnValues.join(",") + "}\n";
                }
                console.log(code);
            }

            receivePayload = (setup) => deferred.resolve({ components, props, emits, setup })

            // @fixme - as well as automatically returning all the defined variables and functions
            // @fixme - should it be $props or emit?
            code = `function(${propName}, { emit: ${emitName} }) { ${code} \n}`;

            console.log(code);

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

        const scriptId = Math.random().toString(36).substring(2, 10);

        const newScript = document.createElement('script');
        newScript.type = 'module';
        newScript.id = scriptId;
        newScript.innerHTML = `${preamble}\n
        document.getElementById("${scriptId}").dispatchEvent(new CustomEvent("payload", {detail: ${code}})\n)`;
        newScript.addEventListener('payload', (event) => {
            receivePayload(event.detail);
        });

        document.body.appendChild(newScript);

        return await deferred.promise;
    }
}