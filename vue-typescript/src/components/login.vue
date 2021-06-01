<template>
  <sts></sts>
  <form @submit.prevent="loginRequest()">
    <div>ID: </div>
    <input type="text" name="username" v-model="username">
    <div>Password: </div>
    <input type="password" name="password" v-model="password">
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent} from 'vue';
import axios from 'axios';
import cookie from 'vue-cookies';


export default defineComponent({
  name: 'Login',
  data(){
    return{
      isAdmin:false,
      username:'',
      password:''
    }
  },
  methods:{
    loginRequest: async function(){
      console.log(`username:${this.username},password:${this.password}`)
      axios.interceptors.request.use(request => {
        console.log('Starting Request: ', request)
        return request
      });
      const res = await axios.post('http://localhost:5000/login',{
        username: this.username,
        password: this.password,
        withCredentials: true
      },{
        headers: {'Content-Type': 'application/json'},
      },);
      console.log(res.data);
      if (res.data.sessID!==""){
        const expires:string= res.data.expires;
        const sessID:string = res.data.sessID;
        console.log(sessID);
        console.log(expires)
        document.cookie = `sessID=${sessID};expires=${expires}path=/`;
        //ここにログイン状態に移行するしかけを入れる
        this.$emit('setLogin')
      }else{
        console.log('failue');
      }
    },
  }
});
</script>

<style>
#login {
  display: flex;
}
</style>