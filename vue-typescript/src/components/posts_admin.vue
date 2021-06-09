<template>
  <ul class="Posts">
    <div v-for="kakikomi in kakikomi">
      <id class="kakikomielement">{{ kakikomi.id }}</id>
      <name class="kakikomielement">投稿者: {{ kakikomi.name }}</name>
      <time class="kakikomielement">投稿時間: {{ kakikomi.showCreated }}</time>
      <button
        type="submit"
        @click="deletePost(kakikomi.id, kakikomi.body)"
        class="submit"
      >
        削除
      </button>
      <button
        type="submit"
        @click="updateSelect(kakikomi.id, kakikomi.body)"
        class="submit"
      >
        編集
      </button>
      <br />
      <postbody v-model="kbody">{{ kakikomi.body }}</postbody>

      <update v-if="isUpdate === kakikomi.id">
        <br />
        <textarea v-model="ubody"></textarea>
        <br />
        <button
          type="submit"
          @click="updatePost(kakikomi.id, ubody)"
          class="submit"
        >
          編集確定
        </button>
        <br />
      </update>
      <p></p>
      <hr />
    </div>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import axios from 'axios';
import { inputCheck } from './common';

export default defineComponent({
  name: 'PostsAdmin',
  data() {
    return {
      kakikomi: Object,
      isUpdate: 0,
      ubody: '',
      kbody: '',
    };
  },
  async mounted() {
    const items = await axios.get('/api/postlist');
    console.log(items);
    this.kakikomi = items.data;
    //const checkLogin = await axios.get('http://localhost:5000/checklogin');
    //console.log(checkLogin);
  },
  methods: {
    async deletePost(postid: number, postbody: string) {
      try {
        if (confirm(`この書き込みを削除しますか？\n${postid}: ${postbody}`)) {
          const res = await axios.delete('/api/postlist', {
            data: { deleteid: postid },
          });
          if (res.status === 401) {
            //何らかのエラー処理
          }
          this.$emit('reload');
        } else {
          //何もしない
        }
      } catch (err) {
        alert(err.message);
      }
    },
    //デフォルト：書き込み欄をオープンする番号は0。どの書き込みも編集状態にならない
    //クリック：クリックした書き込み番号の編集欄がオープン。
    //オープンした状態で同じ編集ボタンをクリック：書き込み番号がになる。
    updateSelect(id: number, name: string) {
      if (this.isUpdate === id) {
        this.isUpdate = 0;
      } else {
        this.isUpdate = id;
        this.ubody = name;
      }
    },
    async updatePost(id: number, ubody: string) {
      try {
        const inputcheck = new inputCheck();
        inputcheck.checkBody(ubody);
        if (inputcheck.getError()) {
          throw new Error(inputcheck.getMessage());
        }
        console.log(id);
        console.log(ubody);
        //サーバーがわにハッシュを渡して向こうで処理する、401で帰ってきたらなんか見せる
        const res = await axios.put(
          '/api/postlist',
          {
            updateid: id,
            updatebody: ubody,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (err) {
        alert(err.message);
      }
      this.$emit('reload');
    },
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

textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  resize: none;
  height: 250px;
  width: 100%;
}
.submit {
  float: right;
}
</style>
