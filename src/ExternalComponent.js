import { EmbeddedComponent } from "./EmbeddedComponent.js";
import { fetchXhr } from "./utils.js";


export class ExternalComponent extends EmbeddedComponent {
    constructor(el, src) { 
        const name = src.split('/').pop().split('.').shift();
        super(el, name);
        this.src = src;
    }

    async GetClonedTemplate() {
        let emptyTemplate = document.createElement('template');
        var html = await fetchXhr(this.src).then(resp => resp.text())
        emptyTemplate.innerHTML = html;
        return emptyTemplate;
    }
}