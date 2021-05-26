<template>
  <form @submit.prevent="sendPost" id="Postigform" >
    <input  v-model="pwriter">
    <br>
    <textarea v-model="pbody" placeholder="コメント内容"></textarea>
    <br>
    <button type="submit">投稿する</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import axios from 'axios';
export default defineComponent({
  name: 'PostingForm',
  data (){
    return{
      pwriter: '',
      pbody: ''
    }
  },
  methods:{
    sendPost:async function(){
      var params = new URLSearchParams()
      params.append('postwriter', this.pwriter);
      params.append('postbody', this.pbody);
      const datas:object = {
        postwriter: this.pwriter,
        postbody: this.pbody
      }
      console.log(datas);
      console.log(params)
      axios.interceptors.request.use(request => {
        console.log('Starting Request: ', request)
        return request
      });
      await axios.post('http://localhost:5000/write',{
        postwriter: this.pwriter,
        postbody: this.pbody
      },{
        headers: {'Content-Type': 'application/json'},
      });
      this.$emit('reload')
    }
  },
})
</script>

<style>
#Postingform{

}
</style>