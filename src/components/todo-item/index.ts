// import {state} from "./state.ts";

customElements.define(
    "todo-item",
    class extends HTMLElement {
        shadow: ShadowRoot;
        title: string;
        checked: boolean = false;
        constructor(){
            super();
            this.shadow = this.attachShadow({mode: "open"});
        }
        connectedCallback(){
            this.title = this.getAttribute("title") || "";
            // Como via attr sólo podemos pasar texto, para definir checked tenemos que hacerlo asi
            this.checked = this.hasAttribute("checked");
            (this.id as any) = this.getAttribute("id");

            const style = document.createElement("style");
            style.innerHTML = `


                .root {
                    border-radius: 4px;
                    padding: 22px 13px;
                    background-color: #FFF599;
                    margin-bottom: 15px;
                    font-size: 18px;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    height: 64px;
                    width: 79.5%;
                }

                @media (min-width: 960px) {              
                    .root {
                        display: flex;
                        min-width: 280px;
                    }
                }

                .titulo {
                    margin: 0;
                }

                .titulo.checked {
                    text-decoration: line-through;
                }

            `;
            this.shadow.appendChild(style);
            
            this.render();
        }
        addListeners(){
            const checkedEl = this.shadow.querySelector(".checkbox-input");
            checkedEl?.addEventListener('click', (e) => {
                // esto se llama casteo. Es cambiar el valor de un tipo de dato a otro tipo de dato
                const target = e.target as any;
                const event = new CustomEvent("change", {detail: {
                    id: this.id,
                    value: target.checked
                    }
                });
                this.dispatchEvent(event);
            })
        }
        render(){
            const div = document.createElement("div");
            // acá el componente no toma decisiones. Se somete a los attributos simlpemente. Esto es asi para que un comp mayor, que puede ser la página.
            // la línea 33 es un ternary operator quiere decir que si hay checked asigná checked si no, string vacio
            div.innerHTML = `
                <div class="root">
                    <h4 class="titulo ${this.checked ? "checked" : ""}">
                        ${this.title}
                    </h4>
                    <div>
                        <input type="checkbox" class="checkbox-input"  ${this.checked ? "checked" : ""}>
                    </div>
                </div>
            `;
            this.classList.add("todo-item");
            this.shadow.appendChild(div);
            this.addListeners();
        }
    }
);