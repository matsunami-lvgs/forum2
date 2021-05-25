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
export default defineComponent({
  name: 'Login',
  data(){return{isAdmin:false}}
});
</script>

<style>
#login {
  display: flex;
}
</style>