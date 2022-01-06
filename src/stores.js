import { derived, writable } from "svelte/store";

const todoStores = () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    addTodo: (task) => {
      update((oldTasks) => [
        ...oldTasks,
        { text: task, completed: false, id: Math.random() * 100 },
      ]);
    },
    deleteTodo: (id) => {
      update((oldTasks) => oldTasks.filter((task) => task.id !== id));
    },
    set
  };
};

function localStore(key, store) {
  const init = JSON.parse(localStorage.getItem(key));

  function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  if (!init) {
    save(key, []);
  } else {
    store.set(init);
  }
  store.subscribe((val) => save(key, val));
    return store;
}

export const todos = localStore("todos", todoStores());


export const filter = writable("all");
export const search = writable("");

const displayTodos = derived([todos, filter, search], ([$todos, $filter, $search]) => {
  return $todos.filter((task) => {
    switch ($filter) {
      case "completed":
        return task.completed && task.text.includes($search);
      case "uncompleted":
        return !task.completed && task.text.includes($search);
      default:
        return task.text.includes($search);
    }
  });
});

export { displayTodos };
