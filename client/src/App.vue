<template>
  <div id="app">
    <Header />
    <!-- <router-view /> -->
    <b-container>
      <Inputs />
      <div class="my-5"></div>
      <Body />
    </b-container>
  </div>
</template>

<script>
import Header from "./views/Header";
import Inputs from "./components/Inputs";
import Body from "./components/Body";

export default {
  components: {
    Header,
    Inputs,
    Body
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: monospace, Arial, Helvetica, sans-serif;
  line-height: 1.4;
  padding: 0 0 30px;
}

#app {
  font-family: Tahoma, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
