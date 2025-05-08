import { EmbeddedScript } from "./EmbeddedScript.js";
import { EmbeddedStyle } from "./EmbeddedStyle.js";
import { createDeferred, tryEvaluateProperty } from "./utils.js";
import { defineAsyncComponent } from "vue";

export class EmbeddedComponent {
    constructor(el, name) {
        this.el = el
        this.name = name
    }

    RegisterWith(vueApp) {
        vueApp.component(this.GetName(), this.GetVueDefinition())
    }

    GetName() {
        return this.name;
    }

    // async, because it may involve lazy-loading form server in child classes.
    async GetClonedTemplate() { 
        return this.el.cloneNode(true);
    }

    FinalizeEvaluatedComponent(component, templateContent) { 
        const props = tryEvaluateProperty(this.el, 'props');
        const emits = tryEvaluateProperty(this.el, 'emits');

        const finalComponent = { template: templateContent, ...component};

        if (props) { finalComponent.props ??= props; }
        if (emits) { finalComponent.emits ??= emits; }

        return finalComponent;
    }

    GetVueDefinition() {
        let deferred = createDeferred();

        (async () => {
            
            let tpl = await this.GetClonedTemplate()

            let templateContent = '';

            const scriptEl = tpl.content.querySelector('script:not([src]):not([type^="text"])');

            if (scriptEl) {

                let script = new EmbeddedScript(scriptEl);

                scriptEl.parentNode.removeChild(scriptEl);

                script.EvaluateComponentDefinition().then(component => {                    
                    const finalComponent = this.FinalizeEvaluatedComponent(component, templateContent);
                    console.log('finalized Component', finalComponent)
                    deferred.resolve(finalComponent);
                })

            } else {
                window.setTimeout(() => {
                    deferred.resolve({ template: templateContent});
                })
            }

            var styles = tpl.content.querySelectorAll('style');

            var contentfulChildren = tpl.content.querySelectorAll(':not(style,script)')

            if (contentfulChildren.length == 1
                && contentfulChildren[0].matches('template')
            ) {
                tpl = contentfulChildren[0];
            }

            for (let style of styles) {
                (new EmbeddedStyle(style, tpl)).Activate();
                style.parentNode.removeChild(style);
            }

            templateContent = tpl.innerHTML
        })();

        return defineAsyncComponent(() => deferred.promise);
    }


}