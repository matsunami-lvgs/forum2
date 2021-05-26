<template>
  <ul class = "Posts">
    <div v-for="kakikomi in kakikomi">
      <p>
        <id>{{kakikomi.id}}</id>
        <name>投稿者: {{kakikomi.name}}</name> 
        <time>投稿時間 {{kakikomi.createdAt}}</time>
        <adminonly v-if="isAdmin===true">
          <button type="submit">削除</button>
          <button type="submit">編集</button>
        </adminonly>
        <br>
        <postbody>{{kakikomi.body}}</postbody>
      </p>
    </div>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent ({
  name: 'Posts',
  data() {
    return {
      kakikomi:Object,
      isAdmin:false
    };
  },
  async mounted() {
    const items= await axios.get('http://localhost:5000/');
    console.log(items)
    this.kakikomi=items.data;
    //const checkLogin = await axios.get('http://localhost:5000/checklogin');
    //console.log(checkLogin);
    this.isAdmin = true;
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
.Posts{
  white-space: pre-wrap;
  text-align: left;
}
</style>
