<template>
  <form @submit.prevent="postRequest(pwriter, pbody)">
    <input v-model="pwriter" class="Postingform" placeholder="投稿者" />
    <br />
    <textarea
      v-model="pbody"
      placeholder="コメント内容"
      class="Postingform"
    ></textarea>
    <br />
    <button type="submit" class="Postingform">投稿する</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { nameCheck,bodyCheck } from './errorcheck';
import {posttimeline} from './request'
export default defineComponent({
  name: 'PostingForm',
  data() {
    return {
      pwriter: '',
      pbody: '',
    };
  },
  methods: {
    postRequest: async function (pwriter: string, pbody: string) {
      try {
        const namecheck = new nameCheck(pwriter);
        const bodycheck = new bodyCheck(pbody);
        if (bodycheck.iscorrect===false||namecheck.iscorrect===false) {
          throw new Error(`${bodycheck.message}${namecheck.message}`);
        };
        const res = posttimeline(pwriter,pbody)
        this.$emit('reload');
      } catch (err) {
        alert(`${err}`);
      }
    },
  },
});
</script>

<style>
.Postingform {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
textarea {
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  resize: none;
  height: 250px;
}
input {
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
