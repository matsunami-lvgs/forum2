<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{title}}</h1>
  <Posts />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import Posts from './components/posts.vue';

export default defineComponent({
  name: 'App',
  components:{
    Posts
  },
  data(){return{title:'けいじばん'}},
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
