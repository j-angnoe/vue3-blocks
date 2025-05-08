
export class EmbeddedStyle {
    constructor(styleEl, templateEl) {
        if (!styleEl) {
            throw new Error('styleEl is invalid');
        }
        if (!templateEl) {
            throw new Error('templateEl is invalid');
        }
        this.styleEl = styleEl
        this.templateEl = templateEl
    }
    Activate() {
        let styleEl = document.createElement('style');
        let style = this.styleEl.innerHTML.trim();

        if (!style) {
            return;
        }
        
        if (this.styleEl.hasAttribute('scoped')) {
            let cssPrefix = 'css-' + Math.random().toString(36).substring(2, 10);

            // this.templateEl.content.querySelectorAll('*').forEach(child => {
            //     child.setAttribute(cssPrefix,'');
            // })

            for (let child of this.templateEl.content.children) {
                child.setAttribute(cssPrefix, '');
            }
            style = style.replace(/([^\}]+?)\{/g, (full, selectors) => {
                if (full.match(/^\s*@/)) {
                    return full;
                }
                return selectors.split(',').map(x => {
                    // :scope will point to self.
                    return `&${x}`.replace(/&&/g, '&')
                }).join(',') + '{';
            });
            
            style = style.replace(/:(scope|root)/, '&');           
            style = `*[${cssPrefix}] { ${style} }`
        }
        styleEl.innerHTML = style;
        document.head.append(styleEl);
    }
}