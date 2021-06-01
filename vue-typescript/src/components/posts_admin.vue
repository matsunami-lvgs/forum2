<template>
  <ul class = "Posts">
    <div v-for="kakikomi in kakikomi">
      <p>
        <id>{{kakikomi.id}}</id>
        <name>投稿者: {{kakikomi.name}}</name> 
        <time>投稿時間 {{kakikomi.createdAt}}</time>
        <button type="submit" @click="deletePost(kakikomi.id,kakikomi.body)">削除</button>
        <button type="submit" @click="updateSelect(kakikomi.id,kakikomi.body)">編集</button>
        <br>
        <postbody v-model="kbody">{{kakikomi.body}}</postbody>

        <update v-if="isUpdate===kakikomi.id">
          <br>
          <textarea v-model="ubody"></textarea>
          <br>
          <button type="submit" @click="updatePost(kakikomi.id)">編集確定</button>
        </update>
      </p>
    </div>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent ,} from 'vue';
import axios from 'axios';

export default defineComponent ({
  name: 'PostsAdmin',
  data() {
    return {
      kakikomi:Object,
      isUpdate:0,
      ubody:'',
      kbody:''
    };
  },
  async mounted() {
    const items= await axios.get('http://localhost:5000/');
    console.log(items);
    this.kakikomi=items.data;
    //const checkLogin = await axios.get('http://localhost:5000/checklogin');
    //console.log(checkLogin);
  },
  methods:{
    async getPostsData(){
    const items= await axios.get('http://localhost:5000/');
    console.log(items)
    this.kakikomi=items.data;
    return(true);
    //const checkLogin = await axios.get('http://localhost:5000/checklogin');
    //console.log(checkLogin);
    },
    async deletePost(postid:number,postbody:string){
      if(confirm(`この書き込みを削除しますか？\n${postid}: ${postbody}`)){
        //ここでログインチェックを行う
        await axios.post('http://localhost:5000/admin/delete',{
          deleteid: postid
        },{
          headers: {'Content-Type': 'application/json'},
        });
        await this.getPostsData();
      }else{
        //何もしない
      };
    },
    updateSelect(id:number,name:string){
      if(this.isUpdate===id){
        this.isUpdate=0
      }else{
        this.isUpdate=id;
        this.ubody=name

      }
    },
    async updatePost(id:number){
      const post:string = this.ubody;
      console.log(id);
      console.log(post);
      //サーバーがわにハッシュを渡して向こうで処理する、401で帰ってきたらなんか見せる
      await axios.post('http://localhost:5000/admin/updatesubmit',{
        updateid: id,
        updatebody: post
      },{
      headers: {'Content-Type': 'application/json'},
      });
      this.$emit('reload')
    },
  }

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
