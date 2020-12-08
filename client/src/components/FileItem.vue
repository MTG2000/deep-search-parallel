<template>
  <b-row
    v-b-tooltip.hover
    :title="file.path"
    class="file"
    :class="{'found':file.result,'notFound':(!file.result && file.finished)}"
  >
    <PulseLoader size="10px" class="spinner" v-if="file.processing"></PulseLoader>
    <div class="ml-3">{{file.name}}</div>
  </b-row>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader";

export default {
  components: {
    PulseLoader
  },
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  methods: {},
  updated: function() {}
};
</script>

<style scoped>
.file {
  flex-wrap: nowrap;
  align-items: center;
  /* background: #9e9e9e; */
  color: #222;
  padding: 6px 9px;
  margin: 8px auto 2px;
  border-radius: 10px;
  max-width: 300px;
  text-align: left;
  overflow: hidden;
}

.spinner {
  flex: 0 0 48px;
}

.found {
  background: rgb(94, 179, 94);
  color: #fff;
}
.notFound {
  background: rgba(51, 51, 51, 0.493);
  color: #fff;
}
</style>