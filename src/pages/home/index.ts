// la page estará enchufada al estado y puede ser un custom element o un elemento con createElement y lo manipulamos para que muestre el listado de pendientes
import {state} from "../../state";

// lo creamos en una funcion para que sea invocable
export function initHomePage(container){
    const div = document.createElement("div");
    const tasks = state.getEnabledTasks();
    const style = document.createElement("style");
    div.innerHTML = `
        <my-header></my-header>
        <div class="div-container">
            <h1 class="home-title">Mis pendientes</h1>
            <div class="container">
                <div class="input-container">
                    <p class="p">Nuevo pendiente</p>
                    <input type="text" class="input">
                </div>
                <button class="add-button">Agregar</button>
            </div>
            <ul class="lista">
            </ul>
        </div>
    `;
    const listaEl = div.querySelector(".lista");
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        .div-container {
            display: flex;
            flex-direction: column;
        }

        @media (min-width: 960px) {
            .div-container {
                justify-content: center;
                padding: 48px 160px 0px 160px;
                gap: 30px;
            }
        }

        .home-title { 
            font-family: 'Roboto', sans-serif;
            font-size: 52px;
            font-weight: 700;
            padding: 41px 74px 25px 30px;
            margin: 0;
        }

        @media (min-width: 960px) {
            .home-title {
                padding: 0;
            }
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 31px;
            margin-bottom: 46px;
            width: 100%;
        }

        @media (min-width: 960px) {
            .container {
                margin: 0;
                flex-direction: row;
                align-items: flex-end;
                align-self: center;
            }
        }

        .input-container {
            width: 82.5%;
        }

        @media (min-width: 960px) {
            .input-container {
                display: flex;
                flex-direction: column;
                width: 70%;
            }
        }

        .input {
            width: 100%;
            height: 55px;
            border-radius: 4px;
            border: 2px solid #000;
            margin-bottom: 12px;
        }

        @media (min-width: 960px) {
            .input {
                width: 95%;
                margin-bottom: 0px;
            }
        }

        .p {
            font-size: 18px;
            font-family: Roboto;
            font-weight: 400;
            margin-bottom: 0px;
        }

        .add-button {
            width: 84.5%;
            height: 55px;
            flex-shrink: 0;
            border: none;
            border-radius: 4px;
            background: #9CBBE9;
            color: #000;
            text-align: center;
            font-size: 22px;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        @media (min-width: 960px) {
            .add-button {
                width: 35%;
                height: 60px;
            }
        }

        .add-button:hover {
            cursor: pointer;
        }

        .lista {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0;
            margin: 0 31px;
            height: auto;
        }

        @media (min-width: 960px) {
            .lista {
                flex-flow: row wrap;
                justify-content: space-around;
                margin: 0;
                padding: 0;
                gap: 10px;
            }
        }
    `;

    const btnEl = div.querySelector(".add-button");
    const inputEl = div.querySelector(".input")
    
    function createTasks(tasks){
        // vaciamos la lista cada vez que invocamos a createTasks para que se imprima con la última version del state
        (listaEl as any).innerHTML = "";
        for (const task of tasks) {
            const todoItemEl = document.createElement("todo-item");
            todoItemEl.setAttribute("title", task.title);
            todoItemEl.setAttribute("id", task.id);
            if (task.completed){
                todoItemEl.setAttribute("checked", "true");
            }
            todoItemEl.addEventListener("change", (e:any) => {
                state.changeItemState(e.detail.id, e.detail.value);
            })
            listaEl?.appendChild(todoItemEl);
        }
    };

    // cada vez que se modifique el state y se invoque a setState, se van a ejecutar los listeners que son estas funciones que pasamos como callback a subscribe. Esto se ejecuta cada vez que cambie el state (se agregue un item, un item pase a completed, etc)
    state.subscribe(()=>{
        createTasks(state.getEnabledTasks());
    });

    // Esto se ejecuta cuando se inicia la homePage por primera vez
    createTasks(tasks);

    (btnEl as any).addEventListener('click', () => {
        if((inputEl as any).value == "") {
            alert("Por favor, inserta un task");
        } else {
            state.addTask(Math.random(), (inputEl as any).value);
        }
    });
    
    div.appendChild(style);
    container.appendChild(div);
};