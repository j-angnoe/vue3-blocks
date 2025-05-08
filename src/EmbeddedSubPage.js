import { EmbeddedPage } from "./EmbeddedPage.js";


export class EmbeddedSubPage extends EmbeddedPage { 

    RegisterWith(app) { 
        console.log("Register subpage " + this.url + " with name " + this.name, app);
        app.routes ??= [];

        let foundParent = {path: ''}
        for (let parentUrl of app.routes) {
            console.log('checking parent ' + parentUrl.path);
            if (this.url.indexOf(parentUrl.path) === 0) {
                foundParent = parentUrl.path > foundParent.path ? parentUrl : foundParent;
                //break;
            }
        }

        if (!foundParent) {
            throw new Error('sub-url could not find parent for url `' + this.url + '`');
        }

        const remainder = this.url.substr(foundParent.path.length+1)
        let route = this.CreateRoute();
        
        route.name = this.name.replace(/^page-/,'subpage-') + (remainder > '' ? '' : 'index'),
           
        foundParent.children ??= [];
        foundParent.children.push(route);
        // router.addRoute(foundParent.name, route)

        console.log('Attaching ' + this.url + ' to ' + foundParent.name + ' ' + foundParent.path);
    }
}