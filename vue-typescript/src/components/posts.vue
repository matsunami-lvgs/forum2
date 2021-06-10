<template>
  <ul class="Posts">
    <div v-for="kakikomi in kakikomi">
      <id class="kakikomielement">{{ kakikomi.id }}</id>
      <name class="kakikomielement">投稿者: {{ kakikomi.name }}</name>
      <time class="kakikomielement">投稿時間: {{ kakikomi.showCreated }}</time>
      <br />
      <postbody v-model="kbody">{{ kakikomi.body }}</postbody>
      <p></p>
      <hr />
    </div>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {getposts} from './request';

export default defineComponent({
  name: 'Posts',
  data() {
    return {
      kakikomi: Object,
      isUpdate: 0,
      ubody: '',
      kbody: '',
    };
  },
  async mounted() {
    const res = await getposts();
    console.log(res);
    this.kakikomi = res.data;
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.Posts {
  white-space: pre-wrap;
  text-align: left;
}
.kakikomielement {
  margin-right: 7px;
}
name {
  color: blue;
}
postbody {
  font-size: 115%;
  color: black;
}
</style>
