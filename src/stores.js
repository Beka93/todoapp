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
    // deleteTodo: (id) => {
    //   update((oldTasks) => oldTasks.filter((task) => task.id !== id));
    // },
    deleteTodo: (task) => {
      update((oldTasks) => { 
        oldTasks.splice(oldTasks.indexOf(task),1);
        return oldTasks;
      });
    },
    toggleCompleted: (id) => { 
      update((oldTasks) => { oldTasks.forEach(function(task, index){
      if (task.id === id){
        oldTasks[index].completed = !oldTasks[index].completed;
         }
        })
        return oldTasks;
      })
    },
    sortTodos: () => {
      update((oldTasks) => oldTasks.sort(function(a,b){
          return a.text.localeCompare(b.text);
        })
      )
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
        return task.completed && task.text.toLowerCase().includes($search.toLowerCase());
      case "uncompleted":
        return !task.completed && task.text.toLowerCase().includes($search.toLowerCase());
      default:
        return task.text.toLowerCase().includes($search.toLowerCase());
    }
  });
});

export { displayTodos };
