// import {state} from "./state.ts";

class Texto extends HTMLElement {
    shadow: ShadowRoot;
    tagName: string;
    tags: string[] = ["h1", "p"];
    tag: string = "p";
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        // check que el tag sea alguno de los que definimos en tags, si no es, siempre será p por defecto
        if(this.tags.includes(this.getAttribute("tag") as any)){
            this.tag = this.getAttribute("tag") || this.tag;
        }
        this.render();
    }
    render(){
        const rootEl = document.createElement(this.tag);
        rootEl.textContent = this.textContent;
        this.shadow.appendChild(rootEl);
    }
}
customElements.define("my-text", Texto)