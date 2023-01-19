<template>
    <div class="cart">
        <nav-bar></nav-bar>
        <div class="container">
            <div class="row" v-if="show">
             <div v-for="(product,index) in productsorder" :key="index" class="thiscard col-xl-4 col-md-6 col-12 d-flex">
            <div class="card" >
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="product.productimg" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                <h5 class="card-title">{{product.productname}}</h5>
                    <p class="card-text">{{product.productcategory}}</p>
                    <h6 class="fw-bold fs-3">{{product.productprice}}$</h6>
                    <a href="#" @click="removeit(product.id)" class="btn">Remove from cart</a>
                </div> 
      </div>
        </div> 
        </div>
        <div class="row">
            <div class="col-lg-6">
                <h4 class="fw-bold fs-3">total price {{totalprice}} $</h4>
                <label class="me-3" for="">enter your address</label>
                <input class="inputaddress" type="text" v-model="useraddress">
                <button @click="sendorder" class="btn send btn-secondry"> checkout order</button>
            </div>
        </div>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
export default {
  components: { NavBar },
    data(){
        return{
            username:"",
            userid:"",
            useremail:"",
            totalprice:0,
            productsorder:[],
            useraddress:"",
            productsids:[],
            productsname:[],
            productsimgs:[],
            orderids:[],
            show:false,

        }
    },methods:{
        async getorder(){
            this.totalprice=0;
            let result=await axios.get(`http://localhost:3000/order?userid=${this.userid}&useremail=${this.useremail}`);
        if(result.status==200){
            let res=result.data;
            this.productsorder=res;
            this.show=true;
            for (let i = 0; i <this.productsorder.length; i++) {
                let price = this.productsorder[i].productprice;
                this.totalprice=this.totalprice+price;  
                this.productsids.push(this.productsorder[i].productid);
                this.productsname.push(this.productsorder[i].productname);
                this.productsimgs.push(this.productsorder[i].productimg);
                this.orderids.push(this.productsorder[i].id);
            }
        }
        else{
            console.log("something went wrong");
        }
        },
        async sendorder(){
            let result1=await axios.post('http://localhost:3000/cartorders',{
                userid:this.userid,
                username:this.username,
                useremail:this.useremail,
                userAddress:this.useraddress,
                produstsIds:this.productsids,
                produstsname:this.productsname,
                produstsImgs:this.productsimgs,
                orderprice:this.totalprice,
            });
            if(result1.status==201){
                console.log("the cart order is sent");
                //delete old orders
                console.log(  this.orderids.length);
                for(let i=0;i<this.orderids.length;i++){
                    let thisid=this.orderids[i];
                    console.log(Number(thisid));
                     let result2=await axios.delete(`http://localhost:3000/order/${Number(thisid)}`);
                     if(result2.status==200){
                console.log("order which sended deleted");             
                }
            }
            this.useraddress="";
            this.getorder();  
            }
            else{
                console.log("something went wrong");
            }

        },
        async removeit(productid){
            let result=await axios.delete(`http://localhost:3000/order/${productid}`);
               if(result.status==200){
                this.getorder();
               }
        }
    }
    ,
        mounted(){
        let user =localStorage.getItem('user-info');
        if(user){
            this.username=JSON.parse(user).name;
            this.userid=JSON.parse(user).id;
            this.useremail=JSON.parse(user).email;
            this.getorder();
        }
        //http://localhost:3000/order
     
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
    .thiscard{
  height: 500px;
  width: 320px;
  margin-bottom: 30px;
  margin-right:10px;
  text-align: center;
.card{
  color: $black;
  // #cbc4ad
  background:$light-bg ;
  box-shadow:  $box-shadow;
  .catimg  .card-img-top{
      // object-fit: cover;
      height: 290px;
      width: 300px;
  }
  .card-text{
     text-transform: capitalize;
        line-height: 2;;
  }
  .card-title{
    cursor: pointer;
    text-transform: capitalize;
        color: $font-color;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  a{
    color: white;
    text-decoration: none;
    border-radius: 10px;
    background:$font-color ;
}
}
}
.inputaddress{
    width: 300px;
    height: 40px;
    border-radius: 20px;
    outline: none;
    & :focus{
    border:1px solid lightgray;
}
  &::placeholder{
    color: #274046;

}
}
button.send{
    background:$font-color ;
    // background-color: #a79f88;
    color: white;
    box-shadow:  #274046 0px 3px 8px;
    border: none;
    margin-top: 30px;
    display: block;
    margin-bottom: 30px;
  }
}

</style>