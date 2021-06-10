<template>
  <form @submit.prevent="logoutRequest()">
    <button type="submit">Logout</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {deletelogin} from './request';

export default defineComponent({
  name: 'Logout',
  methods: {
    logoutRequest: async function () {
      const res = deletelogin();
      this.$emit('setLogout');
    },
  },
});
//CSSはあとで書き換え
</script>

<style>
#login {
  display: flex;
}
</style>
