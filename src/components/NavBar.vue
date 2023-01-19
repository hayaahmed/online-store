<template>
  <nav class="navv">
    <div class="logo">
       <h3>Online Store 🛒</h3>
    </div>
    <ul class="list">     
        <li> <router-link :to="{name:'NewHome',params:{pagaTitle:'Home page'}}" exact>Home</router-link></li>
         <!-- <li> <router-link to="/addblog" exact>add a new Blog</router-link></li> -->
         <a href="#about">About</a>
         <a href="#categories">Categories</a>
         <a href="#" @click="logMeOut">LogOut</a>
    </ul>
    <div class="icon" @click="open">
        <div id="menu-btn" class="fas fa-bars"></div>
    </div>
    <button @click="mycart" class="btn cart">MyCart</button>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"NavBar",
    data(){
        return{

        }
    },methods:{
        ...mapActions(['redirectto']),
        logMeOut(){
            localStorage.clear();
            this.redirectto({val:'LogIn'});

        },
        mycart(){
            this.redirectto({val:'MyCart'});
        },
        open(){
            let menu=document.querySelector(".list")
            menu.classList.toggle("active");
            console.log("active");
            
        }
    }

}
</script>

<style lang="scss" scoped>
$font-color:darkcyan;
$nav-color:#525a5a;
.navv{
    background-color: white ;
  box-shadow:  #cbc4adaf 0px 3px 8px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items:center ;
  padding-left: 20px;
  padding-right: 20px;
  top: 0;
  width: 100%;
  z-index: 120;
  height: 70px;
.icon{
    display: none;
}

}
ul.list{
    margin-top: 30px;
    list-style: none;
display: flex;
justify-content: center;
margin-bottom: 50px;

a,li{
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
    color: $font-color;
    margin-right: 10px;
    font-size: 20px;
}
}
li.router-link-active,a:hover,li.hover{
 color: $nav-color;
 box-shadow: 2px 2px 4px 0 $nav-color;   
}
button.cart{
    // position: absolute;
    // top: 20px;
    // right: 80px;
    color:darkcyan ;
}
.cart:hover{
    color: $nav-color;
 box-shadow: 2px 2px 4px 0 $nav-color;   
}
@media (max-width:768px) {
    .navv{
    ul.list{
            position: absolute;
            top: 50px;
            right: 5rem;
            display: block;
            background-color: white;
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            &.active {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
            }

            a,li{
                font-size: 18px;
                margin:5px;
                display: block;
                text-decoration: none;
                 font-weight: bold;
            }
        } 
}
.icon {
            display: inline-block !important;
        }
    }
</style>
