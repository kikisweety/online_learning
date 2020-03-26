<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <!-- <Head></Head> -->
    <Index></Index>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Head from "./components/Head";
import Index from "./components/Index";

export default {
  name: "App",
  components: {
    // Head,
    Index
  }
  // mounted(){
  //   this.$router.push('/HelloWorld')
  // }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
