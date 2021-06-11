<template>
  <div v-if="isLogin === true">
    <Logout @setLogout="setLogout" v-on:reload="reload()" />
  </div>
  <div v-else>
    <Login @setLogin="setLogin" v-on:reload="reload()" />
  </div>
  <h1>{{ title }}</h1>
  <div v-if="isLogin === true" class="timeline">
    <TimelineAdmin :key="resetKey" v-on:reload="reload()" />
  </div>
  <div v-else class="timeline">
    <Timeline :key="resetKey" v-on:reload="reload()" />
  </div>
  <div class="timeline">
    <PostingForm v-on:reload="reload()" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import Timeline from './components/timeline.vue';
import TimelineAdmin from './components/timeline_admin.vue';
import Login from './components/login.vue';
import Logout from './components/logout.vue';
import PostingForm from './components/form.vue';

export default defineComponent({
  name: 'App',
  components: {
    Login,
    Logout,
    Timeline,
    TimelineAdmin,
    PostingForm,
  },
  data() {
    return {
      title: 'けいじばん',
      resetKey: 0,
      isLogin: false,
    };
  },
  /*
  created(){
    this.isLogin=false;
  },*/
  methods: {
    reload() {
      this.resetKey++;
    },
    setLogin() {
      this.isLogin = true;
    },
    setLogout() {
      this.isLogin = false;
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  margin-bottom: 60px;
}
.timeline {
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  overflow-wrap: break-all;
  word-break: break-all;
}
</style>
