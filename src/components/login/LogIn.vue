<template>
    <div class="LogIn">
       <form @click.prevent action="">
      <div class="row g-3 align-items-center mt-3">
        <h1 class="text-center mt-4">Login</h1>
        <div class="col-auto d-block mx-auto mt-3">
            <input type="email" class="form-control" placeholder="enter youe email" v-model="state.email">
            <span class="error-feedback" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</span>
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto ">
            <input type="password" class="form-control" placeholder="enter youe password" v-model="state.password">
            <span class="error-feedback" v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</span>
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
            <button @click="userlogin" type="submit" class="btn mt-3 btn-secondary">Login</button>&nbsp;&nbsp;&nbsp;
            <button @click="redirectto({val:'SignUp'})" type="button" class="btn mt-3 btn-secondary">Sign Up</button>
        </div>
      </div>
      <div class="row g-3 align-items-center mt-5">
        <div class="notfound">{{usernotfound}}</div>
      </div>
       </form>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex';
import usevalidate from '@vuelidate/core';
import {required,email} from '@vuelidate/validators';
import {reactive,computed} from 'vue'
export default {
    name:"LogInForm",
    //composition api
    setup(){
      const state=reactive({
             email:"",
            password:"",
      });
      const rules=computed(()=>{
        return{
          email:{required,email},
          password:{required}
        }
      });
      const v$=usevalidate(rules,state);
      return{
        state,v$
      }
    },
    data(){
        return{
            // email:"",
            // password:"",
            usernotfound:"",
            admin:false,

        }
    },methods:{
      ...mapActions(['redirectto']),
      tosignup(){
        this.$router.push({name:"SignUp"});
      },
      async userlogin(){
          this.v$.$validate();
        if(this.v$.$errors.length===0){
          console.log("valid");
      if(this.state.password.startsWith("admin")){
        this.admin=true;
        let result=await axios.get(`http://localhost:3000/admins?email=${this.state.email}&password=${this.state.password}`);
         if(result.status==200&&result.data.length>0){
          console.log("login successfully");
          this.usernotfound="";
          localStorage.setItem('admin-info',JSON.stringify(result.data[0]));
          this.redirectto({val:'AdminPanal'});
         }
         else{
          this.usernotfound="User Not Found";
         }
      }
      else{
        let result=await axios.get(`http://localhost:3000/users?email=${this.state.email}&password=${this.state.password}`);
         if(result.status==200&&result.data.length>0){
          console.log("login successfully");
          this.usernotfound="";
          localStorage.setItem('user-info',JSON.stringify(result.data[0]));
          this.redirectto({val:'NewHome'});
         }
         else{
          this.usernotfound="User Not Found";
         }
      }

        }
        else{
          console.log("not valid");
        }
      }
    }
    ,mounted(){
      if(!this.admin){
        let user =localStorage.getItem('user-info');
        if(user){
          this.redirectto({val:'NewHome'});
        }

      }
      }
}

</script>
<style lang="scss">
.notfound{
  color: red;

}
</style>