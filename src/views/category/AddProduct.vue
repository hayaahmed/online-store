<template>
    <div class="addproduct">
      <nav-bar></nav-bar>
      <div class="container">
    
        <div class="row text-center">   
            <div class="col-12">
                <h3 class="pt-3 top-heading">Add Product</h3>
            </div>
        </div>
        <div class="row">
       <div class="col-lg-8 col-md-12">
        <form action="">
        <div class="form-groub">      
            <label for="">Product name</label>
            <input type="text" class="form-control" v-model="state.name">
            <span class="error-feedback" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
          </div>
          <div class="form-groub">      
            <label for="">Product description</label>
            <input type="text" class="form-control" v-model="state.desc">
            <span class="error-feedback" v-if="v$.desc.$error">{{v$.desc.$errors[0].$message}}</span>
          </div>
          <div class="form-groub">      
            <label for="">Product img</label>
            <input type="text" class="form-control" v-model="state.imgurl">
            <span class="error-feedback" v-if="v$.imgurl.$error">{{v$.imgurl.$errors[0].$message}}</span>
          </div>
          <div class="form-groub">      
            <label for="">Product category</label>
            <input type="text" class="form-control" v-model="state.categoryname">
            <span class="error-feedback" v-if="v$.categoryname.$error">{{v$.categoryname.$errors[0].$message}}</span>
          </div>
          <div class="form-groub">      
            <label for="">Product categoryID</label>
            <input type="text" class="form-control" v-model="state.categoryID">
            <span class="error-feedback" v-if="v$.categoryID.$error">{{v$.categoryID.$errors[0].$message}}</span>
          </div>
          <div class="form-groub">      
            <label for="">Product price</label>
            <input type="text" class="form-control" v-model="state.price">
            <span class="error-feedback" v-if="v$.price.$error">{{v$.price.$errors[0].$message}}</span>
          </div>
        <button @click="postit" type="button" class="add">Add Product</button>
    </form>
       </div>
        </div>
     <div v-if="submitted" class="showcat">
        <h2>thank you for adding a product</h2>
     </div>
      </div>

    </div>
</template>
<script>
 import axios from 'axios'
import { mapActions } from 'vuex';
import usevalidate from '@vuelidate/core';
import {required,email} from '@vuelidate/validators';
import {reactive,computed} from 'vue'
import NavBar from '../../components/NavBar.vue';
export default {
  components: { NavBar },
  setup(){
    const state=reactive({
      name:"",desc:""
            ,imgurl:"",categoryname:"",price:0,categoryID:"",
    });
    const rules=computed(()=>{
        return{
            name:{required},
          desc:{required},
          imgurl:{required},
          categoryname:{required},
          price:{required},
          categoryID:{required},
        }
      });
      const v$=usevalidate(rules,state);
      return{
        state,v$
      }
  },
    data(){
        return{
          added:"",
            // cat:[],
            submitted:false,
        }

    },
    methods:{
      ...mapActions(['redirectto']),
      async postit(){
        this.v$.$validate();
      if(this.v$.$errors.length===0){  
          console.log("valid");
          let result=await axios.post('http://localhost:3000/product',{
            name:this.state.name,
            desc:this.state.desc,
            imgurl:this.state.imgurl,
            categoryname:this.state.categoryname,
            categoryID:this.state.categoryID,
            price:this.state.price
          });
          if(result.status==201){
            console.log("new product added successfully");
            this.added="new product added successfully";
            // localStorage.setItem('category',JSON.stringify(result.data));
            // console.log(result.data);
          this.redirectto({val:'AdminPanal'});
          }
          else{
            console.log("error on adding new user successfully");
          }

        }
          else{ 
            console.log("not valid");
          }
         

        }
    
        }
    }

</script>
<style lang="scss">

.addproduct{
  .container{
  margin-top: 100px;
  h3.top-heading{
    color: rgb(20, 76, 76);
  }
  form{
button.add{
    margin-top: 20px;
    background-color: rgb(32, 124, 124);
    color: white;
    border: none;
    padding: 10px;
    font-size: 18px;
    border-radius: 10px;

}
  }
}
}

</style>