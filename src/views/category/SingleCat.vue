<template>
 <div class="category">
  <nav-bar></nav-bar>
  <div class="container">
  
    <h3 class="mb-5">Our {{catname}}</h3>
    <input type="text" v-model="search" placeholder="  search" class="searchbox">
        <div class="row">
            <div v-for="(product,index) in filterproducts" :key="index" class="thiscard col-xl-4 col-md-6 col-12 d-flex">
            <div class="card" >
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="product.imgurl" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                  <router-link :to="'/ProductV/'+product.id"> <h5 class="card-title">{{product.name}}</h5></router-link>
                    <p class="card-text">{{product.desc}}</p>
                    <h6 class="fw-bold fs-3">{{product.price}} <span>$</span></h6>
                   <!-- <router-link :to="'/Singlecat/'+cat.id"><a href="#" class="btn btn-primary">see products</a></router-link>  -->
                </div> 
        </div>
      </div>
        </div>
  </div>
 </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import axios from 'axios';
import { mapActions } from 'vuex';
import SearchMixins from '@/mixins/SearchMixins';
export default {
  components: { NavBar },
    data(){
        return{
            catname:this.$route.params.name,
            products:[],search:"",
        }
    }
    ,computed:{
    //  filterproducts:function(){
    //     return this.products.filter((product)=>{
    //         return product.name.match(this.catname)
    //     })
  }
   , methods:{
    ...mapActions(['redirectto']),
                  async doGetRequest() {
                    let result=await axios.get(`http://localhost:3000/product?categoryname=${this.catname}`);
                  let data= result.data;
                  this.products=data;
                //  await axios.get('http://localhost:3000/products?').then((mydata)=>{
                //     let res = mydata.data;
                //   this.cats=res;
                //   });               
                //   console.log((this.cats[0].name));
                  }
    },
    mixins:[SearchMixins],
     mounted(){
           this.doGetRequest();
     }

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
$light-bg: #f7f7f7;
$box-shadow: 0 1rem 1rem rgba(0, 0, 0, .05);
$black: #130f40;
$font-color:darkcyan;
.container{
  margin-top: 20px;
  .searchbox{
    height: 40px;
    width: 300px;
    font-size: 20px;
    border-radius:10px;
    margin-bottom: 30px;
    border: 1px solid lightgray;
  }
  &:focus{
    border: 1px solid #274046;
  }
  .thiscard{
  height: 500px;
  width: 320px;
  margin-bottom: 30px;
  margin-right:10px;
  text-align: center;
.card{
  background-color: $light-bg;
    color: $black;
  box-shadow:  #cbc4adaf 0px 3px 8px;

  .catimg .card-img-top{
      // object-fit: cover;
      height: 290px;
      width: 300px;

  }

  .card-text{
    text-transform: capitalize;
        line-height: 2;
  }
  .card-title{
    cursor: pointer;
    text-transform: capitalize;
        color: $font-color;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
             
  }
  h6{
    color: #274046;
    font-family: 'Satisfy', cursive;
    font-size: 30px;
    span{
      color: $font-color;
    }

}
  a{
    color: lightgray;
    text-decoration: none;
    border-radius: 10px;
}
  .btn{
    background:$font-color;
    // background-color: #a79f88;
    color: white;
    box-shadow:  #274046 0px 3px 8px;
    border: none;
    margin-top: 30px;
    &:hover{
          background-color:white;
        color: $font-color;

        }
  }
}}
}
</style>