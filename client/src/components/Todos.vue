<template>
  <div class="todos">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      v-on:delTodo="$emit('delTodo',todo.id)"
    />
  </div>
</template>

<script>
import TodoItem from "./Todo";

export default {
  //   name: "TodosList",
  props: {
    todos: Array
  },
  components: {
    TodoItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todos {
  margin: auto;
  max-width: 600px;
}
</style>
