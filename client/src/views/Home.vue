<template>
  <div>
    <AddTodo v-on:addTodo="addTodo" />
    <div>Remaining Todos: {{remaining}}</div>
    <TodosList v-bind:todos="todos" v-on:delTodo="deleteTodo" />
  </div>
</template>

<script>
//@ is to go to src folder
import TodosList from "@/components/Todos";
import AddTodo from "@/components/AddTodo";

const todos = [];

export default {
  name: "App",
  components: {
    TodosList,
    AddTodo
  },
  data: () => ({
    todos
  }),
  //computed props dont take params and dont change data and they always return something
  //plus: computed props uses caching so if you dont want caching you can use methods
  computed: {
    remaining() {
      return this.todos.filter(t => t.completed === false).length;
    }
  },
  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
    },
    addTodo(newTodo) {
      this.todos[0].title = "CHANGED";
      this.todos.unshift(newTodo);
    }
  },
  async created() {
    const res = await fetch(
      "http://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    const data = await res.json();
    this.todos = data.map(({ id, title, completed }) => ({
      id,
      title,
      completed
    }));
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
