<template>
    <div class="UpdateProfile container">
      <nav-bar></nav-bar>
      <form @click.prevent action="">
          <div class="row g-3 align-items-center">
          <h1 class="text-center mt-4">Update Your Profile</h1>
          <div class="col-auto d-block mx-auto">
              <input  type="text" class="form-control" placeholder="enter youe name" v-model="state.name">
              <span class="error-feedback" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
          </div>
        </div>
        <br/>
        <div class="row g-3 align-items-center">
          <div class="col-auto d-block mx-auto">
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
          <div class="col-auto d-block mx-auto ">
              <input type="text" class="form-control" placeholder="enter youe phone number" v-model="state.phoneNum">
              <span class="error-feedback" v-if="v$.phoneNum.$error">{{v$.phoneNum.$errors[0].$message}}</span>
          </div>
        </div>
        <br/>
        <div class="row g-3 align-items-center">
          <div class="col-auto d-block mx-auto">
              <button @click="updateProfilenow" type="submit" class="btn mt-3 btn-secondary">Update Your Profile</button>
          </div>
        </div>
        <div class="row g-3 align-items-center mt-5">
        <div class="notfound">{{usernotfound}}</div>
      </div>
         </form>
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue'
  import axios from 'axios'
import { mapActions } from 'vuex';
import usevalidate from '@vuelidate/core';
import {required,email} from '@vuelidate/validators';
import {reactive,computed} from 'vue'
  export default {
    components: { NavBar },
      name:'UpdateProfile',
      setup(){
      const state=reactive({
              name:'',
             email:"",
            password:"",
            phoneNum:"",
      });
      const rules=computed(()=>{
        return{
            name:{required},
          email:{required,email},
          password:{required},
          phoneNum:{required},
        }
      });
      const v$=usevalidate(rules,state);
      return{
        state,v$
      }
    }
      ,data(){
          return{
            //   name:'',
            //   email:"",
            //   password:"",
            //   phoneNum:"",
            userid:'',
            admin:false,
            usernotfound:"",
  
          }
      },
      methods:{
          ...mapActions(['redirectto']),
        async  updateProfilenow(){
            this.v$.$validate();
        if(this.v$.$errors.length===0){
          console.log("valid");
         if(this.state.name.startsWith("admin")){
          console.log(this.state.name); let result=await axios.put(`http://localhost:3000/admins/${this.userid}`,{
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            phoneNum:this.state.phoneNum
          });
          if(result.status==200){
            console.log("admin profile is updated successfully");
            // console.log(result);
            localStorage.setItem('admin-info',JSON.stringify(result.data));
            console.log(result.data);
          this.redirectto({val:'Profile'});
          }
          else{
          this.usernotfound="something went wrong try again";
         }
         }
         else{
          console.log("valid");
          let result=await axios.put(`http://localhost:3000/users/${this.userid}`,{
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            phoneNum:this.state.phoneNum
          });
          if(result.status==200){
            console.log("user profile is updated successfully");
            // console.log(result);
            localStorage.setItem('user-info',JSON.stringify(result.data));
            console.log(result.data);
          this.redirectto({val:'Profile'});
          }
          else{
          this.usernotfound="something went wrong try again";
         }
         }
        }
             
          }
      },
      mounted(){
          let user=localStorage.getItem('user-info');
          let admin=localStorage.getItem('admin-info');
          if(user){
              this.state.name=JSON.parse(user).name;
              this.state.email=JSON.parse(user).email;
              this.state.password=JSON.parse(user).password;
              this.state.phoneNum=JSON.parse(user).phoneNum;
              this.userid=JSON.parse(user).id;
          }
          else{
            if(admin){
            this.state.name=JSON.parse(admin).name;
            this.state.email=JSON.parse(admin).email;
            this.state.password=JSON.parse(admin).password;
            this.state.phoneNum=JSON.parse(admin).phoneNum;
            this.userid=JSON.parse(admin).id;
        }
        else{
            this.redirectto({val:'SignUp'});
        }
          }
        
      }
  
  }
  </script>
  
  <style>
  
  </style>