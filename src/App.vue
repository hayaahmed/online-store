<template>
  <div id="app">
  <!-- <NewHomeVue></NewHomeVue> -->
    <router-view/>
  </div>
</template>
<script>
import NewHomeVue from './components/NewHome.vue';
export default {
  name:'app',
  components:{
    NewHomeVue,
  }
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
