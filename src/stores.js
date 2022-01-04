import { derived, writable } from "svelte/store";
// import LocalStorage from "./Localstorage.js";

const todoStores = () => {
    const { subscribe, update, set } = writable([]);
    return {
        subscribe,
        addTodo: (task) => {
            update((oldTasks) => [...oldTasks,{ text: task, completed: false, id: Math.random() * 100 }]);
        },
        deleteTodo: (id) => {
            update((oldTasks) => oldTasks.filter((task) => task.id !== id));
        }
    };
};

export const todos = todoStores();

export const filter = writable("all");

const displayTodos = derived([todos, filter], ([$todos, $filter]) => {
    return $todos.filter((task) => {
        switch($filter){
            case "completed" :
                return task.completed;
            case "uncompleted" :
                return !task.completed;
            default:
                return true;
        }});
});

export {displayTodos};

