<template>
    <div class="thishome">
        <!-- <p>hi there is home</p>-->
        <nav-bar></nav-bar>
      <div class="container">
        <div class="text-end">
        <h3 class="N text-end"> welcome {{username.includes(" ")?username.substr(0, username.indexOf(" ")):username}}</h3> 
        <router-link :to="{name:'Profile'}">
            <button class="btn rounded-bill">Profile</button>
        </router-link>
      </div>
     <LandingVue></LandingVue>
     <section class="about" id="about">
     <div class="image">
      <img src="../images/pexels-henry-&-co-1233648.jpg" alt="">
     </div>
     <div class="content">
      <h3 class="mainheaing">why choose us</h3>
          <p>We are good in ..✭</p>
          <div class="icons-container">
            <div class="icons">
                    <img src="../images/serv-2.png" alt="">
                    <h3>find what you search for</h3>
                </div>
                <div class="icons">
                    <img src="../images/serv-1.png" alt="">
                    <h3>fast delivery</h3>
                </div>
                <div class="icons">
                  <img src="../images//icon-1.png" alt="">
                    <h3>save time</h3>
                </div>
                <div class="icons">
                    <img src="../images/serv-3.png" alt="">
                    <h3>best quality</h3>
                </div>
                <div class="icons">
                    <img src="../images/serv-4.png" alt="">
                    <h3>24/7 support</h3>
                </div>
            </div>
     </div>
     </section>
     <br>
<section class="categories" id="categories">
  <div class="row">
        <div class="col-12">
            <h2 class=" catss">all categories</h2>
        </div>
      </div>
        <div class="row">
            <div v-for="(cat,index) in cats" :key="index" class="thecat col-xl-4 col-md-6 col-12 d-flex">
            <div class="card catcard" >
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="cat.imgurl" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{cat.name}}</h5>
                    <p class="card-text ">{{cat.desc}}</p>
                    <router-link :to="'/Singlecat/'+cat.name"><a href="#" class="btn btn-primary">Products</a></router-link>
                </div> 
        </div>
      </div>
        </div>
</section>
        <br>
        <div class="row">
          <input type="search" v-model="search" placeholder="  search for what you want" class="searchbox">
        </div>
          <div class="row">
            <div v-for="(product,index) in filterproducts" :key="index" class="thiscard col-xl-4  col-lg-3 col-md-6 col-12 d-flex">
            <router-link :to="'/ProductV/'+product.id">
             <div class="card" >
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="product.imgurl" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                   <h5 class="card-title">{{product.name}}</h5>
                    <p class="card-text">{{product.desc}}</p>
                    <h6 class="fw-bold fs-3">{{product.price}} <span>$</span></h6>
                
                </div> 
      </div>
    </router-link>
        </div>

        </div>
      

      </div>
      <footer-vue></footer-vue>
    </div>
</template>
<script>
import axios from 'axios';
import SearchMixins from '@/mixins/SearchMixins';
   import {mapActions} from 'vuex'
import NavBar from './NavBar.vue';
import LandingVue from './Landing.vue';
import FooterVue from './Footer.vue';
export default {
  components: { NavBar,LandingVue,FooterVue },
    name:'NewHome',
    data(){
        return{
            hello:"hi from home",
            username:"",
            cats:[],
            products:[],
            search:"",
        }
    },
    methods:{
        ...mapActions(['redirectto']),
                  async doGetRequest() {

                 await axios.get('http://localhost:3000/category').then((mydata)=>{
                    let res = mydata.data;
                  this.cats=res;
                  });               
                  },
                  async getproducts() {

                  await axios.get('http://localhost:3000/product').then((mydata)=>{
                    let res = mydata.data;
                  this.products=res;
                  });               
                  }
        },
    mixins:[SearchMixins],
    mounted(){
        let user =localStorage.getItem('user-info');
        let admin=localStorage.getItem('admin-info');
        if(!user){
          if(!admin){
          this.redirectto({val:'SignUp'});
        }
        else{
          this.username=JSON.parse(admin).name;
        }
        }
        else{
            this.username=JSON.parse(user).name;
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
router-link{
}
.container{
  margin-top: 100px;
  scroll-behavior: smooth;
  .about{
    display: flex;
        align-items: center;
        flex-wrap: wrap-reverse;
        gap: 2rem;
        background-color: white;
        height: 40rem;
        border-radius: 1rem;
        overflow: hidden;
        position: relative;
        @media (max-width:768px) {
                  height: 60rem;

                    }
        .image{
            flex: 1 1 20rem;
            border-radius: 1rem;
            img{
              // margin-top: 2rem;
                width: 100%;
                height: 30rem;
                border-radius: 1rem;
                @media (max-width:768px) {
                  height: 20rem;

                    }
            }
        }
        .content{
            flex:1 1 20rem;
            padding: 1rem .5rem;
            text-align: center;
 
            h3.mainheaing{
                font-family: 'Satisfy', cursive;
                font-size: 3rem;
                color: $font-color;

            }
            p{
              font-size: 1.5rem;
                color: rgb(94, 92, 92);
            }
            .icons-container {
                margin-top: 2rem;
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;

                .icons {
                    flex: 1 1 5rem; // grow shrink flex-basis
                    border-radius: 0.5rem;
                    box-shadow: $box-shadow;
                    background-color: $light-bg;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;

                    @media (max-width:768px) {
                       flex: 1 1 3rem; //to be one in line

                    }

                    h3 {
                        font-size: 1.1rem;
                        color: $black;
                        @media (max-width:768px) {
                     font-size: 0.8rem;

                    }
                    }
                }
            }
          }
        }
  .searchbox{
    height: 50px;
    width: 360px;
    font-size: 25px;
    border-radius:10px;
    margin-bottom: 30px;
    border: 1px solid lightgray;
    outline: none;
    color: $font-color;
  }
  &:focus{
    border: 1px solid #274046;
  }
  .rounded-bill{
    border-radius: 20px;
    background-color: #274046;
    box-shadow:  #cbc4adaf 0px 3px 8px;
    color: white;
  }
  .rounded-bill:hover{
    background-color: #4d7b87;
  }
  .N{
    font-weight: bold;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
  max-height: 500px;
  width: 320px;
  margin-bottom: 30px;
  margin-right:10px;
  text-align: center;
  a{
    text-decoration: none;
  }
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
        line-height: 1.5;
    
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
    text-decoration: none;
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
}
}
.catss{
  text-align: center;
  font-family: 'Satisfy', cursive;
                font-size: 3rem;
                color: $font-color;
}

}
</style>