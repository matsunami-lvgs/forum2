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
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import axios from 'axios';
import cookie from 'vue-cookies';

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
        console.log(`username:${username},password:${password}`);
        if (username === '' || password === '') {
          throw new Error('認証に必要な項目が不足しています');
        }
        const res = await axios.post(
          '/api/login',
          {
            username: username,
            password: password,
            withCredentials: true,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log(res.data);
        if (res.status === 200) {
          const expires: string = res.data.expires;
          const sessID: string = res.data.sessID;
          console.log(sessID);
          console.log(expires);
          this.$emit('setLogin');
        } else {
          throw new Error('認証に失敗しました');
        }
      } catch (err) {
        alert('認証に失敗しました');
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
