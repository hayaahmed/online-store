<template>
  <div class="deletecat">
    <nav-bar></nav-bar>
   <div class="container text-center">
    <h2 class="text-center">delete category</h2>
    <h6>Are you sure you want to delete category ?</h6>
    <div v-if="showit" class="data">
        <h3 class="fs-5">category name " {{catname}}"</h3>
        <h4 class="fs-5">category description " {{catdesc}}"</h4>
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
        catid:this.$route.params.id,
        adminname:"",
        catname:"",
        catdesc:"",
        showit:false,
        productsid:[],
    }
  },
  methods:{
    ...mapActions(['redirectto']),
    async canacessit(){
        console.log(this.adminname);
        let res1=await axios.get(`http://localhost:3000/category?id=${this.catid}`);
        let data1=res1.data;
        this.showit=true;
        this.catname=data1[0].name;
        this.catdesc=data1[0].desc;
        console.log(res1.data);
    },async deleteit(){
        let res=await axios.get(`http://localhost:3000/product?categoryID=${this.catid}`);
        if(res.status==200){
            let data2=res.data;
            for (let i = 0; i<data2.length; i++) {
             
             this.productsid.push(data2[i].id);
            }
   
              console.log(this.productsid);
          for (let i = 0; i < this.productsid.length; i++) {
            let thisid=this.productsid[i];
                   console.log(Number(thisid));
                   let result2=await axios.delete(`http://localhost:3000/product/${Number(thisid)}`);
                   if(result2.status==200){
               console.log("product  deleted"); 
                   }
          }
          
        let res2=await axios.delete(`http://localhost:3000/category/${this.catid}`);
        if(res2.status=200){
               console.log("deleted cat and products successfully");
                this.redirectto({val:'AdminPanal'});
        }    
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