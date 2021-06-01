<template>
  <div v-if="isLogin===true">
    <Logout @setLogout="setLogout" v-on:reload="reload()"/>
  </div>
  <div v-else>
    <Login  @setLogin="setLogin" v-on:reload="reload()"/>
  </div>
  <h1>{{title}}</h1>
  <div v-if="isLogin===true">
    <PostsAdmin :key="resetKey" v-on:reload="reload()"/>
  </div>
  <div v-else>
    <Posts :key="resetKey" v-on:reload="reload()"/>
  </div>
  <PostingForm v-on:reload="reload()" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import Posts from './components/posts.vue';
import PostsAdmin from './components/posts_admin.vue';
import Login from './components/login.vue';
import Logout from './components/logout.vue';
import PostingForm from './components/form.vue';


export default defineComponent({
  name: 'App',
  components:{
    Login,
    Logout,
    Posts,
    PostsAdmin,
    PostingForm,
  },
  data(){
    return{
      title:'けいじばん',
      resetKey: 0,
      isLogin:Boolean
    }
  },
  /*
  created(){
    this.isLogin=false;
  },*/
  methods:{
    reload(){
      this.resetKey++;
    },
    setLogin(){
      this.isLogin=true;
    },
    setLogout(){
      this.isLogin=false;
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
