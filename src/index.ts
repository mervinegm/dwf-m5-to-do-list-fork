import "./components/texto";
import "./components/todo-item";
import "./components/header";
import { initHomePage } from "./pages/home";
import { state } from "./state";

(function(){
    // Si habilitamos y lo corremos de manera local podemos hacer que persista datos en localStorage y luego el state los recupere
    // state.init();
    const root = document.querySelector(".root");
    initHomePage(root);
})();
