<template>
  <div>
    <form @submit.prevent="addTodo">
      <input type="text" name="title" v-model="title" />
      <button type="submit">Add Todo</button>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data: () => ({
    title: ""
  }),
  methods: {
    addTodo() {
      // e.preventDefault(); //no need for it since we used the .prevent postfix
      const newTodo = {
        id: uuidv4(),
        title: this.title,
        completed: false
      };
      this.$emit("addTodo", newTodo);
      this.title = "";
    }
  }
};
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 20px auto;
}

.todo {
  background: #999;
  padding: 20px 40px;
  color: #fff;
  margin-bottom: 10px;
}

.isCompleted {
  text-decoration: line-through;
}
</style>
