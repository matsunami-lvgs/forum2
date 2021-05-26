<template>
  <Login v-on:reload="reload()"/>
  <h1>{{title}}</h1>
  <Posts :key="resetKey" v-on:reload="reload()"/>
  <PostingForm v-on:reload="reload()" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import Posts from './components/posts.vue';
import Login from './components/login.vue';
import PostingForm from './components/form.vue';


export default defineComponent({
  name: 'App',
  components:{
    Login,
    Posts,
    PostingForm,
  },
  data(){
    return{
      title:'けいじばん',
      resetKey: 0
    }
  },
  methods:{
    reload(){
      this.resetKey++
    }
  }
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
