const state = {
    data: {
        tasks: [
            {id: 1, title: "primer item",
            completed: false,
            },
            {id: 2, title:"segundo item",
            completed: true,
            },
            {id: 3, title:"tercer item",
            deleted: true
            }
        ],
    },
    listeners: [],
    init(){
        // Acá hay un problema y es que cuando cerramos el navegador en incógnito, se borran los datos de localStorage. Entonces, al iniciar de nuevo la app, se rompe.
        const localData = localStorage.getItem("saved-state");
        this.setState(JSON.parse(localData as any));
        // const currentState = this.getState();
        // this.setState(currentState);
    },
    getState(){
        return this.data;
    },
    getEnabledTasks(){
        const currentState = this.getState();
        
        return currentState.tasks.filter((t) => 
            !t.deleted
        );
    },
    addTask(id, title){
        // siempre nos manejamos haciendo una copia, modificándola y seteándola nuevamente
        const currentState = this.getState();
        currentState.tasks.push({id, title, completed: false})
        this.setState(currentState);
    },
    changeItemState(id, value){
        const currentState = this.getState();
        const found = currentState.tasks.find(t => t.id == id);
        found.completed = value;
        this.setState(currentState);
    },
    setState(newState){
        this.data = newState;
        for (const cb of this.listeners){
            // haciendo esto nos ahorramos leer el estado en el subscribe y siempre recibimos el ultimo estado
            cb(newState);
            localStorage.setItem("saved-state", JSON.stringify(newState));
        }
        console.log('soy el state he cambiado ', this.data);
    },
    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    }

};

export {state};