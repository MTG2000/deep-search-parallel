<template>
  <div>
    <FilesList :files="files" />
    <div class="text" v-if="isDone && files.length===0">
      <p>Couldn't find any match with files at this directory :(</p>
    </div>
  </div>
</template>

<script>
import FilesList from "./FilesList";

export default {
  components: { FilesList },
  props: {
    files: {
      type: Array,
      required: true,
      default: () => []
    },
    isDone: {
      type: Boolean,
      required: false
    }
  },
  methods: {},
  updated: function() {}
};
</script>

 

<style lang="scss" scoped>
.text {
  color: tomato;
  font-size: large;
}
</style>