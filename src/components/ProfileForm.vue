<template>
  <div class="profile container">
    <nav-bar></nav-bar>
    <form @click.prevent action="">
        <div class="row g-3 align-items-center">
        <h1 class="text-center mt-4">Update Your Profile</h1>
        <div class="col-auto d-block mx-auto">
            <input disabled type="text" class="form-control" placeholder="enter youe name" v-model="name">
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
            <input disabled type="email" class="form-control" placeholder="enter youe email" v-model="email">
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto ">
            <input disabled type="password" class="form-control" placeholder="enter youe password" v-model="password">
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto ">
            <input disabled type="text" class="form-control" placeholder="enter youe phone number" v-model="phoneNum">
        </div>
      </div>
      <br/>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
            <button @click="updateProfile" type="submit" class="btn mt-3 btn-secondary">Update Your Profile</button>
        </div>
      </div>
       </form>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import { mapActions } from 'vuex';
export default {
  components: { NavBar },
    name:'ProfileForm'
    ,data(){
        return{
            name:'',
            email:"",
            password:"",
            phoneNum:"",

        }
    },
    methods:{
        ...mapActions(['redirectto']),
        updateProfile(){
            this.redirectto({val:'UpdateProfile'});
        }
    },
    mounted(){
        let user=localStorage.getItem('user-info');
        let admin=localStorage.getItem('admin-info');
        if(user){
            this.name=JSON.parse(user).name;
            this.email=JSON.parse(user).email;
            this.password=JSON.parse(user).password;
            this.phoneNum=JSON.parse(user).phoneNum;
        }
        else{
          if(admin){
            this.name=JSON.parse(admin).name;
            this.email=JSON.parse(admin).email;
            this.password=JSON.parse(admin).password;
            this.phoneNum=JSON.parse(admin).phoneNum;
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