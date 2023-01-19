<template>
  <div class="admin">
    <nav-bar></nav-bar>
<div class="container">
  <div class="row text-center">
        <div class="col-auto mx-auto d-block">
        <button @click="addcatpage" class="btn btn-add btn-primary">Add category</button>
    </div>
</div>
    <div class="row text-center mt-4">
        <div class="col-auto mx-auto d-block">
            <button @click="addproduct" class="btn btn-add btn-primary">Add Product</button>
    </div>
    </div>
<section class="categories" id="categories">
  <div class="row">
        <div class="col-12">
          <h2 class=" catss">all categories</h2>
        </div>
      </div>
        <div class="row ">
            <div v-for="(cat,index) in cats" :key="index" class="thecat col-xl-4 col-md-6 col-12 d-flex">
            <div class="catcard card">
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="cat.imgurl" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{cat.name}}</h5>
                    <p class="card-text ">{{cat.desc}}</p>
                    <router-link :to="'/EditCat/'+cat.name"><a href="#" class="btn btn-primary">Edit category</a></router-link>
                    <router-link :to="'/DeleteCat/'+cat.id"><a href="#" class="btn btn-primary">Delete category</a></router-link>
                </div> 
        </div>
      </div>
        </div>
</section>
        <br>
        <h2 class="PP">our product</h2>
        <!-- <div class="row">
          <input type="text" v-model="search" placeholder="  search for what you want" class="searchbox">
        </div> -->
          <div class="row ">
            <div v-for="(product,index) in products" :key="index" class="thiscard col-xl-4 col-md-6 col-12 d-flex">
            <div class="card" >
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="product.imgurl" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{product.name}}</h5>
                    <p class="card-text  ">{{product.desc}}</p>
                    <h6 class="fw-bold fs-3">{{product.price}}$</h6>
                    <router-link :to="'/EditProduct/'+product.name"><a href="#" class="btn btn-primary">Edit Product</a></router-link>
                    <router-link :to="'/DeleteProduct/'+product.id"><a href="#" class="btn btn-primary">Delete product</a></router-link>
                </div> 
      </div>
        </div>

        </div>
</div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
  components: { NavBar },
  data(){
    return{
      cats:[],
            products:[],


    }
  },
  methods:{
    ...mapActions(['redirectto']),
    addcatpage(){
        this.redirectto({val:'AddCat'});
    },
    editcatpage(){
        this.redirectto({val:'EditCat'});
    },
    deletecatpage(){
        this.redirectto({val:'RemoveCat'});
    },
    addproduct(){
        this.redirectto({val:'AddProduct'});
    },
          async doGetRequest() {

              await axios.get('http://localhost:3000/category').then((mydata)=>{
                let res = mydata.data;
                this.cats=res;
                });               
                console.log((this.cats[0].name));
                },
          async getproducts() {

                 await axios.get('http://localhost:3000/product').then((mydata)=>{
                let res = mydata.data;
                this.products=res;
                });               
                console.log((this.products[0].name));
                }

  },
  mounted(){
    let admin=localStorage.getItem('admin-info');
    if(!admin){
          this.redirectto({val:'SignUp'});
        }
        else{
          this.username=JSON.parse(admin).name;
        }
        this.doGetRequest();
       this.getproducts();
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
  margin-top: 100px;
  // .PP{
  //   text-align: center;
  //   color: $font-color;
  //   text-transform: uppercase;
  // }
      .btn-add{
        width: 250px;
        height: 45px;
        font-size: 20px;
        background-color: $font-color;
        border: none;
        box-shadow:  $font-color 0px 3px 8px;
      }
      .thecat{
    height: 400px;
  width: 400px;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right:10px;
  border-radius: 50%;
  .catcard{
    text-align: center;
    background-color: $light-bg;
    color: $black;
    .catimg{
      width: 250px;
      height: 250px;
      border-radius: 50%;
      margin-left: 3rem;
      
    }
    .card-body{
      .card-title{
        text-transform: capitalize;
        color: $font-color;
        font-family: 'Satisfy', cursive;
                font-size: 2rem;
      }
      .card-text{
        text-transform: capitalize;
        line-height: 2;
      }
      a.btn{
        background-color: $font-color;
        color: white;
        border: none;
        margin-right: 10px;
        box-shadow: $box-shadow;
        font-weight: bold;
        &:hover{
          background-color:white;
        color: $font-color;

        }
      }
    }
  }
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
    margin-right: 10px;
    &:hover{
          background-color:white;
        color: $font-color;

        }
  }
}
}
.catss{
  text-align: center;
  font-family: 'Satisfy', cursive;
    font-size: 3rem;
    color: $font-color;
    margin: 10px;
    margin-top: 20px;
}
}
</style>