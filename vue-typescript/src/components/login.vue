<template>
  <sts></sts>
  <form @submit.prevent="login()" v-if="isAdmin===false">
    <div>ID: </div>
    <input type="text" name="username" v-model="username">
    <div>Password: </div>
    <input type="password" name="password" v-model="password">
    <button type="submit">Login</button>
  </form>
  <form @submit.prevent="login()" v-else>
    <button type="submit" >Logout</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { defineComponent} from 'vue';
import axios from 'axios';


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
    login: async function(){
      console.log(`username:${this.username},password:${this.password}`)
      axios.interceptors.request.use(request => {
        console.log('Starting Request: ', request)
        return request
      });
      const hoge = await axios.post('http://localhost:5000/login',{
        username: this.username,
        password: this.password
      },{
        headers: {'Content-Type': 'application/json'},
      });
      console.log(hoge);
      /*.catch(err=>{
        console.log(err)
        return err.response
      })*/
      /*
      if (res.status===200){
        this.isAdmin=true;
      }else{
        this.isAdmin=false;
      }
      //this.$emit('reload')*/
    },
    async logout(){
      const res = await axios.get('http://localhost:5000/logout');
    },
    hoge(num:number){
      if (num=1){
        return(true);
      }else{
        return(false);
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