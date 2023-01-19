<template>
    <div class="signup">
       <form @click.prevent action="">
        <div class="row g-3 align-items-center">
        <h1 class="text-center mt-4">Sign Up</h1>
        <div class="col-auto d-block mx-auto">
            <input type="text" class="form-control" placeholder="enter youe name" v-model="name">
            <span class="error-feedback" v-if="nameerrors">{{nameerrors}}</span>
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
            <input type="email" class="form-control" placeholder="enter youe email" v-model="email">
            <span class="error-feedback" v-if="emailerrors">{{emailerrors}}</span>
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto ">
            <input type="password" class="form-control" placeholder="enter youe password" v-model="password">
            <span class="error-feedback" v-if="passworderrors">{{passworderrors}}</span>
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto ">
            <input type="text" class="form-control" placeholder="enter youe phone number" v-model="phoneNum">
            <span class="error-feedback" v-if="phoneNumerror">{{phoneNumerror}}</span>
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
            <button @click="signup" type="submit" class="btn mt-3 btn-secondary">Sign Up</button>&nbsp;&nbsp;&nbsp;
            <button @click="redirectto({val:'LogIn'})" type="button" class="btn mt-3 btn-secondary">Login</button>
        </div>
      </div>
       </form>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex';
import usevalidate from '@vuelidate/core';
import {required,email} from '@vuelidate/validators';
// import { json } from 'stream/consumers';
export default {
    name:"SignUpForm",
    data(){
        return{
          // v$:usevalidate(),
            name:"",
            email:"",
            password:"",
            phoneNum:"",
            nameerrors:"",
            emailerrors:"",
            passworderrors:"",
            phoneNumerror:"",


        }
     }
    //,validations(){
    //   return{
    //     name:{required},
    //     password:{required},
    //     email:{required,email},
    //     phoneNum:{required},
    //   }
    // }
    ,methods:{
      ...mapActions(['redirectto']),
      tologin(){
        this.$router.push({name:"LogIn"});
      },
      async signup(e){
        // this.v$.$validate();
        // if(!this.v$.$errors){
        //   console.log("form validated");
        // }
        // else{
        //   console.log("validation failed")
        // }
      // this.errors = [];

      if (!this.name) {
        this.nameerrors="Name required.";
      }
      else if(this.name.length < 4){
        this.nameerrors="Name should be more than 3 letters.";
      }
      else{
        this.nameerrors="";
      }
      if (!this.email) {
        this.emailerrors='Email required.';
      } else if (!this.validEmail(this.email)) {
        this.emailerrors='Valid email required.';
      }
      else{
        this.emailerrors="";
      }
      if(!this.password){
        this.passworderrors="password required";
      }
      else if(this.password.length<8){
        this.passworderrors="password should be more than 8 letters.";
      }
      else{
        this.passworderrors="";
      }
      if(!this.phoneNum){
        this.phoneNumerror= 'phone number required';
      }
      else{
        this.phoneNumerror="";
      }

      // if (!this.errors.length) {
      //   return true;
      // }
        if(!this.nameerrors&&!this.passworderrors&&!this.emailerrors&&!this.phoneNumerror){
          if(this.name.startsWith("admin")&&this.password.startsWith("admin")){
            console.log("hi you are admin validation sucsses");
            let result=await axios.post('http://localhost:3000/admins',{
            name:this.name,
            email:this.email,
            password:this.password,
            phoneNum:this.phoneNum
          })
          if(result.status==201){
            console.log("new admin added successfully");
            localStorage.setItem('admin-info',JSON.stringify(result.data));
            console.log(result.data);
          this.redirectto({val:'AdminPanal'});
          }
          else{
            console.log("error on adding new admin successfully");
          }
            
          }
          else{
            console.log("validation sucsses");
            let result=await axios.post('http://localhost:3000/users',{
            name:this.name,
            email:this.email,
            password:this.password,
            phoneNum:this.phoneNum
          })
          if(result.status==201){
            console.log("new user added successfully");
            // console.log(result);
            localStorage.setItem('user-info',JSON.stringify(result.data));
            console.log(result.data);
          this.redirectto({val:'NewHome'});
          }
          else{
            console.log("error on adding new user successfully");
          }

          }
        
        }
      e.preventDefault();
    },
    validEmail(email) {
      var re =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return re.test(email);
    }
      }
      ,mounted(){
        let user =localStorage.getItem('user-info');
        if(user){
          this.redirectto({val:'NewHome'});
        }

      }
    }

</script>
<style lang="scss">
.error-feedback{
  color: red;
  font-size: 0.85rem;
}

</style>