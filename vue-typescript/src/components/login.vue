<template>
  <form action="" method="" id="login" v-if="isAdmin===false">
    <div>ID: </div>
    <input type="text" name="username">
    <div>Password: </div>
    <input type="password" name="password">
    <button type="submit">Login</button>
  </form>
  <form action="" method="" id="" v-else>
    <button type="submit">Logout</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  data(){return{isAdmin:false}},
  async mounted() {
    //const checkLogin = await axios.get('http://localhost:5000/checklogin');
    //console.log(checkLogin.status);
    this.isAdmin = true;
  },
});
</script>

<style>
#login {
  display: flex;
}
</style>