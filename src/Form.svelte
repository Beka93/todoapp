<script>
  import { todos, displayTodos, filter, search } from "./stores";
  import Fa from "svelte-fa/src/fa.svelte";
  import {
    faCheck,
    faPlus,
    faTrashAlt,
    faSortAlphaDown,
  } from "@fortawesome/free-solid-svg-icons";

  let task = "";

  // const addTodo = () => {
  //   // e.preventDefault();
  //   if (task)
  //     $todos = [
  //       ...$todos,
  //       { text: task, completed: false, id: Math.random() * 100 },
  //     ];
  //   task = "";
  //   LocalStorage.save($todos);
  // };
  // const deleteTodo = (id) => {
  //   $todos = $todos.filter((task) => task.id !== id);
  //   LocalStorage.save($todos);
  // };

  $: console.log($search);
</script>

<main class="form">
  <form
    id="toDoForm"
    on:submit|preventDefault={() => {
      if (task) {
        todos.addTodo(task);
      }
      task = "";
    }}
  >
    <input
      bind:value={task}
      type="text"
      name="inputText"
      id="inputText"
      placeholder="Write a new todo"
    />
    <button class="submit" type="submit"><Fa icon={faPlus} /></button>
  </form>
  <div class="filters">
    <button
      on:click={() => {
        $filter = "all";
      }}>All</button
    >
    <button
      on:click={() => {
        $filter = "completed";
      }}>Completed</button
    >
    <button
      on:click={() => {
        $filter = "uncompleted";
      }}>Uncompleted</button
    >
  </div>
  <div class="search">
    <input id="search" type="text" placeholder="search" bind:value={$search} />
    <button class="sort"><Fa icon={faSortAlphaDown} /></button>
  </div>
</main>
<div id="todo_container">
  <ul id="list_container">
    {#each $displayTodos as task}
      <div id="list-task">
        <li
          contenteditable="true"
          bind:textContent={task.text}
          class={task.completed ? "completed" : ""}
        >
          {task.text}
        </li>
        <div class="btn">
          <button on:click={todos.toggleCompleted(task.id)}
            ><Fa icon={faCheck} /></button
          >
          <button class="deleteBtn" on:click={todos.deleteTodo(task.id)}
            ><Fa icon={faTrashAlt} /></button
          >
        </div>
      </div>
    {/each}
  </ul>
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
  }
  .submit,
  .sort {
    background-color: #eb06ff;
    color: white;
    border: none;
    border-radius: 50%;
    margin: 0;
    padding: 0.5rem 0.75rem;
  }
  .sort {
    border-radius: 10%;
  }
  #toDoForm {
    margin-bottom: 15px;
  }
  #inputText,
  #search {
    background-color: #041955;
    color: white;
    border: none;
    padding: 0.5rem;
    margin: 15px;
    font-size: 18px;
  }
  #search {
    width: 400px;
  }
  .search {
    margin-top: 25px;
  }
  .filters button {
    background-color: #041955;
    color: white;
    margin: 0;
    border: none;
    border-radius: 25px;
    width: 130px;
    padding: 0.5rem 0.75rem;
    box-shadow: 2px 5px 16px 0px #0b325e;
  }
  #todo_container {
    background-color: #041955;
    color: #fff;
    width: 450px;
    min-height: 250px;
    padding: 15px;
    margin: 0 auto;
    border-radius: 25px;
    box-shadow: 2px 5px 16px 0px #0b325e;
  }
  #list-task {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    margin: 10px 0;
  }
  #list-task li {
    list-style: none;
    background-color: white;
    padding: 10px;
    color: black;
    width: 50%;
    max-width: 250px;
    overflow: auto;
  }
  .deleteBtn {
    background: white;
    border: none;
    color: darkslateblue;
    margin: 0 15px;
  }
  .completed {
    text-decoration: line-through;
    opacity: 0.5;
  }
</style>
