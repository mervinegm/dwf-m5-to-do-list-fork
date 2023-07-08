customElements.define(
    "my-header", 
    class extends HTMLElement {
        shadow: ShadowRoot;
        constructor(){
            super();
            this.shadow = this.attachShadow({mode: "open"});
        }
        connectedCallback(){
            const style = document.createElement("style");
            style.innerHTML = `
            .header {
                background-color: #FF8282;
                height: 68px;
                display: block;
            }
            `;
            this.shadow.appendChild(style);
            this.render();
        }
        render(){
            const div = document.createElement("div");
            div.innerHTML = `
                <header class="header">
                </header>
            `;
            this.shadow.appendChild(div);
        }
    }
);