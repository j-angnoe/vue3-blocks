import { EmbeddedComponent } from "./EmbeddedComponent.js";

export class EmbeddedPage extends EmbeddedComponent {
    constructor(el, url) {
        let name = EmbeddedPage.GetComponentName(url)
        super(el, name);
        this.url = url;
    }

    static GetComponentName(url) { 
        return 'page-' + (url.replace(/^\//,'').replace(/[^a-z0-9-]/g,'-') || 'index');
    }

    FinalizeEvaluatedComponent(component, templateContent) { 
        let finalComponent = super.FinalizeEvaluatedComponent(component, templateContent);

        if (this.url.match(/\/:/)) {
            finalComponent.props ??= [];
            // Ensure all route props are defined as props.
            this.url.replace(/\/:([a-z0-9_]+)/i, function(match, propName) {
                if (Array.isArray(finalComponent.props)) {
                    finalComponent.props.push(propName);
                } else if (typeof finalComponent.props == 'object') { 
                    finalComponent.props[propName] ??= String;
                } else {
                    console.error('failed to add route prop to props', finalComponent);
                }
            })
            
        }
        console.log('finalcomponent', finalComponent);
        return finalComponent;
    }

    CreateRoute() { 
        let route = {
            path: this.url,
            name: this.name,
            props: true,
            meta: {  title: this.el.getAttribute('title') } ,
            component: this.GetVueDefinition()
        };
        if (this.el.hasAttribute('redirect')) { 
            route.redirect = this.el.getAttribute('redirect');
        }
        return route;
    }
    RegisterWith(vueApp) { 
        // const {router} = await import('./router.js');
        // console.log('register url ' + this.url + ' with name ' + this.name);

        vueApp.routes ??= [];

        
        vueApp.routes.push(this.CreateRoute())
    }
}