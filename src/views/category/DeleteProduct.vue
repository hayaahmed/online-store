<template>
    <div class="deletecat">
      <nav-bar></nav-bar>
     <div class="container text-center">
      <h2 class="text-center">delete product</h2>
      <h6>Are you sure you want to delete product ?</h6>
      <div v-if="showit" class="data">
          <h3 class="fs-5">product name " {{productname}}"</h3>
          <h4 class="fs-5">product description " {{productdesc}}"</h4>
      </div>
      <button @click="deleteit" class="btn btn-info me-3">yes</button> <router-link :to="'/AdminPanal'"><button class="btn no">Go Back</button></router-link>
     </div>
    </div>
  </template>
  
  <script>
  import NavBar from '../../components/NavBar.vue'
  import {mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    components: { NavBar },
    data(){
      return{
        productid:this.$route.params.id,
          adminname:"",
          productname:"",
          productdesc:"",
          showit:false,
          productsid:[],
      }
    },
    methods:{
      ...mapActions(['redirectto']),
      async canacessit(){
          console.log(this.adminname);
          let res1=await axios.get(`http://localhost:3000/product?id=${this.productid}`);
          let data1=res1.data;
          this.showit=true;
          this.productname=data1[0].name;
          this.productdesc=data1[0].desc;
          console.log(res1.data);
      },async deleteit(){
        
           let res2=await axios.delete(`http://localhost:3000/product/${this.productid}`);
           if(res2.status=200){
                  console.log("deleted  product successfully");
                  this.redirectto({val:'AdminPanal'});
           }    
           else{
              console.log("something went wrong");
          }
      
       }
    },
    mounted(){
      let admin=localStorage.getItem('admin-info');
      if(admin){
          this.adminname=JSON.parse(admin).name;
          this.canacessit();
      }
      else{
          this.redirectto({val:'LogIn'});
  
      }
    }
  
  }
  </script>
  
  <style lang="scss" scoped>
.container{
  margin-top: 100px;
  .no{
      background-color:rgb(48, 96, 96);
      color: white;
      width: 90px;
      text-align: center;
      border: none;
  }
  .no:hover{
   background-color:rgba(48, 96, 96, 0.562) ;
  }
  
  .btn-info{
      background-color: rgb(166, 12, 12);
      color: white;
      width: 90px;
      text-align: center;
      border: none;
  
  }
  .data{
      color: gray;
      font-size: 16px;
  
  }
}
  
  </style>