<template>
  <div>
    <ProcessingSection
      :files="processingFiles"
      :isDone="isFinished"
      :numOfScannedFiles="files.filter(f=>f.finished).length"
    />
    <div class="mb-5"></div>
    <ResultSection :files="positiveFiles" :isDone="isFinished" />
  </div>
</template>

<script>
import ProcessingSection from "./ProcessingSection";
import ResultSection from "./ResultSection";
import { mapState, mapGetters } from "vuex";

export default {
  components: { ResultSection, ProcessingSection },

  computed: {
    ...mapState(["isFinished", "files"]),
    ...mapGetters(["processingFiles", "positiveFiles"])
  }
};
</script>

<style scoped>
</style>