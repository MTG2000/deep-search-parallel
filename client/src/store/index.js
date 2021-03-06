import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const state = {
  queryId: "",
  isRunning: false,
  isFinished: false,
  files: [],
};

export const getters = {
  processingFiles: (state) => state.files.filter((f) => f.processing),
  positiveFiles: (state) => state.files.filter((f) => f.result),
};

export const mutations = {
  SOCKET_connect() {
    console.log("Connected");
  },
  SOCKET_disconnect() {
    console.log("Disconnected");
  },
  SOCKET_queryBegun(state, { queryId, files }) {
    state.queryId = queryId;
    state.isFinished = false;
    state.isRunning = true;
    state.files = files;
  },
  SOCKET_processingFile: function(state, { file } = {}) {
    const fileIndex = state.files.findIndex((f) => f.path === file.path);

    if (!state.files[fileIndex].finished) {
      Vue.set(state.files, fileIndex, {
        ...state.files[fileIndex],
        processing: true,
      });
    }
  },

  SOCKET_searchResult: function(state, { file, result = false } = {}) {
    //Find the index

    const fileIndex = state.files.findIndex((f) => f.path === file.path);
    Vue.set(state.files, fileIndex, {
      ...state.files[fileIndex],
      processing: false,
      result,
      finished: true,
    });

    const processingFiles = state.files.filter((f) => f.processing);

    if (processingFiles.length === 0) {
      state.isRunning = false;
      state.isFinished = true;
    }
  },
  SOCKET_finishedQuery: function(state) {
    state.isRunning = false;
    state.isFinished = true;
    state.files = state.files.map((f) => {
      if (f.processing) return { ...f, finished: true, processing: false };
      return f;
    });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
