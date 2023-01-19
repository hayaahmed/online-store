<template>
 <div class="product">
    <nav-bar></nav-bar>
  <div class="container">
     <h3 class="text-center f5-3">{{catname}} "{{productname}}"</h3> 
      <div class="row">
            <div class="col-xl-4 col-md-6 col-12 d-flex productcard" >
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="imgurl" class="card-img" alt="...">
                </div>
            </div>
            <div class="col-xl-4 col-md-5 col-12 card-body">
                 <h5 class="card-title fw-bold fs-2">{{productname}}</h5>
                    <p class="card-text">{{productdesc}}</p>
                    <p class="card-text ">{{catname}}</p>
                    <h6 class="price fw-bold fs-3">{{productprice}}$</h6>
                    <p class="quatity">quantity</p>
                    <select v-model="quantity" class="me-3" name="quantity" id="">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <h4>total price : {{producttotalprice}} $</h4>
                    <a href="#" @click="addtocart" class="btn btn-primary">Add to cart</a>
                   <!-- <router-link :to="'/Singlecat/'+cat.id"><a href="#" class="btn btn-primary">see products</a></router-link>  -->
                </div> 
      </div>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'
export default {
  components: { NavBar },
  data(){
    return{
        productid:this.$route.params.id,
        imgurl:"",
        productname:"",
        productdesc:"",
        productprice:"",
        catname:"",
        quantity:1,
        username:"",
        userid:"",
        useremail:""
    }
  },
  computed:{
    producttotalprice(){
        return this.quantity*(Number(this.productprice));
    }

  },methods:{
    async addtocart(){
        let result=await axios.post("http://localhost:3000/order",{
            productid:this.productid,
            productname:this.productname,
            productimg:this.imgurl,
            productcategory:this.catname,
            productprice:this.producttotalprice,
            quantity:this.quantity,
            userid:this.userid,
            useremail:this.useremail,
        });
        if(result.status==201){
            console.log("new order added successfully");
        }
        else{
            console.log("something went wrong");
        }

  }
  },
  
 async mounted(){
    let res=await axios.get(`http://localhost:3000/product/${this.productid}`);
        let mydata=res.data;
        console.log(mydata.name);
        this.productname=mydata.name;
        this.productdesc=mydata.desc;
        this.productprice=mydata.price;
        this.imgurl=mydata.imgurl;
        this.catname=mydata.categoryname;
        let user =localStorage.getItem('user-info');
        if(user){
            this.username=JSON.parse(user).name;
            this.userid=JSON.parse(user).id;
            this.useremail=JSON.parse(user).email;
        }
  }


}
</script>

<style lang="scss" scoped>
$font-color:darkcyan;
.container{
    margin-top: 100px;
}
    .catimg{
        margin-top: 20px;
        width: 400px;
     height: 320px;
     box-shadow:  #274046 0px 3px 8px;
     img{
        width: 100%;
        height: 100%;
    }
    }
    .card-body{
        margin: 20px;
        padding: 20px;
        margin-bottom: 100px;
        box-shadow:  #274046 0px 3px 8px;
        .price{
         color:   #274046;
         display: inline-block;
         margin-right: 20px;
        }
        .quatity{
            display: inline-block;
            margin-right: 10px;
        }
        .btn{
            display: block;
            //linear-gradient(to right ,#274046,#a8a1a1)
            background:$font-color ;
            color: white;
            box-shadow:  #274046 0px 3px 8px;
            border: none;
            margin-top: 10px;
            width: 200px;
        }
    }
  

</style>