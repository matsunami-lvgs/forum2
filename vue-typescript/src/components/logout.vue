<template>
  <form @submit.prevent="logoutRequest()">
    <button type="submit">Logout</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Logout',
  data() {},
  methods: {
    logoutRequest: async function () {
      const res = await axios.delete('/api/login');
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
