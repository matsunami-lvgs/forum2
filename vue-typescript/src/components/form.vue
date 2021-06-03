<template>
  <form @submit.prevent="postRequest(pwriter,pbody)"  >
    <input  v-model="pwriter" class="Postingform" placeholder="投稿者">
    <br>
    <textarea v-model="pbody" placeholder="コメント内容" class="Postingform"></textarea>
    <br>
    <button type="submit" class="Postingform">投稿する</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent } from 'vue';
import axios from 'axios';
import {inputCheck} from './common';
export default defineComponent({
  name: 'PostingForm',
  data (){
    return{
      pwriter: '',
      pbody: ''
    }
  },
  methods:{
    postRequest:async function(pwriter:string,pbody:string){
      try{
        const inputcheck = new inputCheck;
        inputcheck.checkName(pwriter);
        inputcheck.checkBody(pbody);
        if(inputcheck.getError()){
          throw new Error (inputcheck.getMessage())
        }
        axios.interceptors.request.use(request => {
          console.log('Starting Request: ', request)
          return request
        });
        await axios.post('/api/postlist',{
          postwriter: pwriter,
          postbody: pbody
        },{
          headers: {'Content-Type': 'application/json'},
        });
        this.$emit('reload')
      }catch(err){
        alert(err.message)
      }
    },
  },
})
</script>

<style>
.Postingform{
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
textarea {
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  resize: none;
  height:250px;
}
input{
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>