<template>
  <header id="header" class="header">
    <h1>
      <SearchArchiveIcon />Deep Search
    </h1>
  </header>
</template>

<script>
import SearchArchiveIcon from "../components/Icons/SearchArchiveIcon";
export default {
  components: { SearchArchiveIcon },
  name: "Header"
};
</script>

<style lang="scss" scoped>
header {
  padding: 20px;
  background: linear-gradient(164deg, #4caf50, #009688);
  color: white;
  margin-bottom: 30px;
}
</style>
