<template>
  <form @submit.prevent="loginRequest(username, password)">
    ID:
    <input type="text" name="username" v-model="username" class="loginbox" />
    Password:
    <input
      type="password"
      name="password"
      v-model="password"
      class="loginbox"
    />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {userNameCheck, passCheck} from './errorcheck';
import {postlogin} from './request'

export default defineComponent({
  name: 'Login',
  data() {
    return {
      isAdmin: false,
      username: '',
      password: '',
    };
  },
  methods: {
    loginRequest: async function (username: string, password: string) {
      try {
        const usernamecheck = new userNameCheck(username);
        const passcheck = new passCheck(password)
        if (usernamecheck.iscorrect==false||passcheck.iscorrect===false){
          throw new Error (`${usernamecheck.message}${passcheck.message}`);
        }
        const res = await postlogin(username,password)
        if (res.status === 200) {
          this.$emit('setLogin');
        } else {
          throw new Error('認証に失敗しました');
        }
      } catch (err) {
        alert(err);
      }
    },
  },
});
</script>

<style>
#login {
  display: flex;
}
.loginbox {
  margin-right: 5px;
}
</style>
