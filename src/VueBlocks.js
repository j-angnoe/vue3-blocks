import { EmbeddedComponent } from "./EmbeddedComponent.js";
import { createApp } from "vue";
import { fetchXhr } from "./utils.js";
import { EmbeddedPage } from "./EmbeddedPage.js";
import { EmbeddedSubPage } from "./EmbeddedSubPage.js";
import { ExternalComponent } from "./ExternalComponent.js";

export class VueBlocks {

    /**
     * @param DOMNode|null context 
     * @returns array<EmbeddedComponent>
     */
    static async collectComponents(context) {
        context = context || document.body;
        
        const componentFactories = ({
            'template[component]': el => new EmbeddedComponent(el, el.getAttribute('component')),
            'template[src*=".vue"]': el => {
                const src = el.getAttribute('src');
                if (src in VueBlocks.urlsLoaded) {
                    return;
                }
                VueBlocks.urlsLoaded[src] = true;

                return new ExternalComponent(el, src)
            },
            'template[url]': el => new EmbeddedPage(el, el.getAttribute('url')),
            'template[sub-url]': el => new EmbeddedSubPage(el, el.getAttribute('sub-url')),
            'template[src]:not([src*=".vue"])': async (el) => {
                const src = new URL(el.getAttribute('src'), window.location.href);
                
                if (src.href in VueBlocks.urlsLoaded) {
                    return;
                }
                VueBlocks.urlsLoaded[src.href] = true;

                var html = await fetchXhr(src.href).then(resp => resp.text())
                let container = document.createElement('template');

                container.innerHTML = html;

                [...container.content.querySelectorAll('link')].forEach(link => {
                    link.href = new URL(link.getAttribute('href'), src.href).href;
                    document.body.appendChild(link);
                });

                [...container.content.querySelectorAll('script[src]')].forEach(script => {
                    script.src = new URL(script.getAttribute('src'), src.href).href;
                    document.body.appendChild(script);
                });

                [...container.content.querySelectorAll('script')].forEach(script => {
                    script.innerHTML = script.innerHTML.replace(/document\.location/g, '(new URL(' + JSON.stringify(src.href)+'))');
                }); 

                /* 
                dont know if we should do this.
                [...container.content.querySelectorAll('template')].forEach(template => {
                    template.content.querySelectorAll('script').forEach(script => {
                        script.innerHTML = script.innerHTML.replace(/document\.location/g, '(new URL(' + JSON.stringify(src.href)+'))');
                    })
                }); 
                */
                
                return await VueBlocks.collectComponents(container.content);
            }
        })

        const componentsPerCategory = Object.entries(componentFactories)
            .map(([selector, mapper]) => Promise.all([...context.querySelectorAll(selector)].map(mapper)));

        var promises = await Promise.all(componentsPerCategory);

        var result = [];

        for (const promise of promises) { 
            if (promise instanceof Promise) { 
                result = result.concat(await promise);
            } else {
                result = result.concat(promise);
            }
        }
        console.log('reasult', result);

        return result.flat().filter(Boolean);
    }

    /**
     * 
     * @param VueApp app 
     * @param DOMNode|null context 
     */
    static async load(app, context) { 
        var components = await VueBlocks.collectComponents(context);
        for (const ec of components) {
            ec.RegisterWith(app);
        }
        return components;
    }

    static async mount(targetSelector, app) { 
        app = app || createApp({setup() { }})

        var registeredComponents = await VueBlocks.load(app);

        if (app.routes) { 
            const {createRouter, createWebHashHistory} = await import('vue-router');
            const router = createRouter({
                history: createWebHashHistory(),
                routes: app.routes
            });
            app.provide('routes', app.routes);
            app.config.globalProperties.routes = app.routes;
            app.use(router);
        }

        const targetElement = document.querySelector(targetSelector);
        if (targetElement.innerHTML.trim() == "") { 
            targetElement.innerHTML = "<app></app>";
        }

        app.mount(targetElement);

        return app;
    }
}

VueBlocks.urlsLoaded = {}
