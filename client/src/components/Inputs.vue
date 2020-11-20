<template>
  <div class="container">
    <form @submit="startSearch">
      <b-row>
        <b-col sm="12">
          <b-form-input class="my-3" v-model="path" placeholder="Enter the search directory"></b-form-input>
        </b-col>
        <b-col sm="12">
          <b-form-input class="my-3" v-model="search" placeholder="Search Keyword"></b-form-input>
        </b-col>
      </b-row>
      <b-button type="submit" v-if="!isRunning" @click="startSearch" variant="outline-success">
        <PlayBtnIcon />Start Search
      </b-button>
      <b-button v-if="isRunning" @click="stopSearch" variant="outline-danger">
        <StopBtnIcon />Stop Search
      </b-button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StopBtnIcon from "./Icons/StopBtnIcon";
import PlayBtnIcon from "./Icons/PlayBtnIcon";

export default {
  components: { StopBtnIcon, PlayBtnIcon },
  data: () => ({
    path: "E:\\University Subjects\\projects\\MPI\\first-test\\files",
    search: "moon"
  }),
  computed: {
    ...mapState(["queryId", "isRunning"])
  },
  methods: {
    startSearch(e) {
      if (e) e.preventDefault();
      this.$socket.emit("newQuery", {
        path: this.path + "/",
        search: this.search
      });
    },
    stopSearch() {
      this.$socket.emit("stopQuery", { queryId: this.queryId });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>