<template>
  <div class="processing-section">
    <GearsIcon v-if="!isDone && files.length>0" />
    <FilesList :files="files" />
    <div class="text" v-if="files.length===0">
      <h2>{{isDone?"Done":"Waiting"}}</h2>
      <p v-if="isDone">
        <span>{{numOfScannedFiles}}</span> files was scanned
      </p>
    </div>
  </div>
</template>

<script>
import FilesList from "./FilesList";
import GearsIcon from "./Icons/GearsIcon";

export default {
  components: { FilesList, GearsIcon },
  props: {
    files: {
      type: Array,
      required: true,
      default: () => []
    },
    isDone: {
      type: Boolean,
      required: false
    },
    numOfScannedFiles: {
      type: Number,
      required: false
    }
  },
  methods: {},
  updated: function() {}
};
</script>

 

<style lang="scss" scoped>
.processing-section {
  min-height: 180px;
  background: #ececec;
  width: 320px;
  margin: auto;
  padding: 15px;
  box-shadow: 3px 10px 20px #888;
  position: relative;
}
.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Avenir, Helvetica, Arial, sans-serif;

  color: #a3a3a3;
  h2 {
    font-weight: 1000;
    font-size: xxx-large;
  }

  p span {
    font-weight: bolder;
    font-size: larger;
  }
}
</style>