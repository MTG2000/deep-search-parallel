<template>
  <div>
    <FileItem v-for="file in files" :key="file.path" :file="file" />
  </div>
</template>

<script>
import FileItem from "./FileItem";
export default {
  props: {
    files: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    FileItem
  },
  updated() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
