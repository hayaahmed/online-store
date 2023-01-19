<template>
    <div class="addcat">
       
      <div class="container">
      
        <div class="row text-center">   
            <div class="col-12">
                <h3 class="pt-3">edit product " {{productname}} "</h3>
            </div>
        </div>
        <div class="row ">
       <div class="col-lg-7 col-md-12">
        <form action="">
        <div class="form-groub">      
            <label for="">product name</label>
            <input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-groub">      
            <label for="">product description</label>
            <input type="text" class="form-control" v-model="desc">
          </div>
          <div class="form-groub">      
            <label for="">product img</label>
            <input type="text" class="form-control" v-model="imgurl">
          </div>
          <div class="form-groub">      
            <label for="">category name</label>
            <input type="text" class="form-control" v-model="categoryname">
          </div>
          <div class="form-groub">      
            <label for="">category ID</label>
            <input type="text" class="form-control" v-model="categoryID">
          </div>
          <div class="form-groub">      
            <label for="">product price</label>
            <input type="text" class="form-control" v-model="price">
          </div>
          
        <button @click="undateit" type="button" class="btn">Edit product</button>
    </form>
       </div>
        </div>
     <div v-if="submitted" class="showcat">
        <h2>thank you for adding a category</h2>
     </div>
      </div>

    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            name:"",
            desc:"",
            imgurl:"",
            categoryname:"",
            categoryID:"",
            price:"",
            productname:this.$route.params.name,
            productid:"",
            submitted:false,
            productnotfound:"",
        }

    },
    methods:{
      ...mapActions(['redirectto']),
        async undateit(){
            let result=await axios.put(`http://localhost:3000/product/${this.productid}`,{
            name:this.name,
            desc:this.desc,
            imgurl:this.imgurl,
            categoryname:this.categoryname,
            categoryID:this.categoryID,
            price:this.price


        }); 
        if(result.status==200){
            console.log("product is updated successfully");
            this.redirectto({val:'AdminPanal'});
          }
          else{
          this.catnotfound="something went wrong try again";
         }
        }
    },
    async mounted(){
        let result=await axios.get(`http://localhost:3000/product?name=${this.productname}`);
  
        let mydata=result.data;
        this.name=mydata[0].name;
        this.desc=mydata[0].desc;
        this.imgurl=mydata[0].imgurl;
        this.categoryname=mydata[0].categoryname;
        this.categoryID=mydata[0].categoryID;
        this.price=mydata[0].price;
        this.productid=mydata[0].id;
        console.log(mydata[0].name);
    }
}

</script>
<style lang="scss">
.addcat{
.btn{
    margin-top: 20px;
    background-color: rgb(32, 124, 124);
    color: white;
}
}

</style>