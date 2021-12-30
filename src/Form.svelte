<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faCheck, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
    let todos = [];
    let task = '';
    let filter = '';
  
  const addTodo = (e) => {
    e.preventDefault();
    if(task)
    todos = [...todos, {text: task, completed: false, id: Math.random() * 1000}];
      task = '';
  }
  const deleteTodo = (id) => {
    todos = todos.filter(task => task.id !== id);
  }
  </script>
  
  
  <main class="form">
    <form id="toDoForm" on:submit={addTodo}>
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
      <button on:click={()=>{filter='all'}}>All</button>
      <button on:click={()=>{filter='completed'}}>Completed</button>
      <button on:click={()=>{filter='uncompleted'}}>Uncompleted</button>
      </div>
  </main>
  <div id="todo_container">
      <ul id="list_container">
          {#each todos as task}
          {#if filter == 'completed'}
          {#if task.completed}
          <div id="list-task">
            <li class="completed">{task.text}</li>
              <div class="btn">
                <button class="deleteBtn" on:click={deleteTodo(task.id)}><Fa icon={faTrashAlt}/></button>
              </div>
            </div>
            {/if}
          {:else if filter == 'uncompleted'}
          {#if !task.completed}
          <div id="list-task">
            <li contenteditable="true" class={task.completed ? "completed" : ""}>{task.text}</li>
              <div class="btn">
                <button on:click={() => task.completed = !task.completed}><Fa icon={faCheck}/></button>
                <button class="deleteBtn" on:click={deleteTodo(task.id)}><Fa icon={faTrashAlt}/></button>
              </div>
            </div>
          {/if}
          {:else}
          <div id="list-task">
              <li contenteditable="true" class={task.completed ? "completed" : ""}>{task.text}</li>
              <div class="btn">
                <button on:click={() => task.completed = !task.completed}><Fa icon={faCheck}/></button>
                <button class="deleteBtn" on:click={deleteTodo(task.id)}><Fa icon={faTrashAlt}/></button>
              </div>
            </div>
          {/if}
          {/each}
      </ul>
  </div>
  
  <style>
    .form  {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 30px;
    }
    .submit {
      background-color: #eb06ff;
      color: white;
      border: none;
      border-radius: 50%;
      margin: 0;
      padding: 0.5rem 0.75rem;
    }
    #toDoForm {
      margin-bottom: 15px;
    }
    #inputText {
      background-color: #041955;
      color: white;
      border: none;
      padding: 0.5rem;
      margin: 15px;
      font-size: 18px;
    }
    .filters button {
      background-color: #041955;
      color: white;
      margin: 0;
      border: none;
      border-radius: 25px;
      width: 130px;
      padding: 0.5rem 0.75rem;
      box-shadow: 2px 5px 16px 0px #0B325E;
      }
    #todo_container {
      background-color: #041955;
      color: #fff;
      width: 450px;
      min-height: 250px;
      padding: 15px;
      margin: 0 auto;
      border-radius: 25px;
      box-shadow: 2px 5px 16px 0px #0B325E;
    }
    #list-task{
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
  
