const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");


function createTaskElement(taskText) {
    const elementoLista = document.createElement("li");
    elementoLista.className = "task-item";

    const span = document.createElement("span");
    span.textContent = taskText;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "delete-btn";

    botonEliminar.addEventListener("click", () => {
        elementoLista.remove();
        saveTasks(); 
    });

    elementoLista.appendChild(span);
    elementoLista.appendChild(botonEliminar);
    taskList.appendChild(elementoLista);

    saveTasks(); //Se utiliza cada que se agrega o elimina una tarea, para mantener sincronizado localStorage.
}


addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim(); //Obtenemos lo que escribió el usuario, eliminando espacios extra.

    if (taskText !== "") { //Aquí validamos si taskText no es una cadena vacía.
        createTaskElement(taskText); //Se llama a la función que crea el <li>, el <span> con el texto y el botón eliminar
        taskInput.value = "";  //Limpia el campo de texto después de crear la tarea      
    }

});


function saveTasks() {
    const tasks = [];

    document.querySelectorAll(".task-item span").forEach(span => { //selecciona todos los textos de las tareas
        tasks.push(span.textContent); //los mete en un array.
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // localStorage.setItem("tasks", ...) → guarda la lista bajo la clave "tasks"
    //JSON.stringify(tasks) → convierte el array en texto porque localStorage solo guarda cadenas

}


function loadTasks() {
    const storedTasks = localStorage.getItem("tasks"); //devuelve el contenido que guardamos en el paso anterior.
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks); //lo transforma en un array de strings.
        tasks.forEach(taskText => {
            createTaskElement(taskText); 
        });
    }
}

loadTasks();
//Al final hace que las tareas se carguen automáticamente apenas se abra o recargue la página.






