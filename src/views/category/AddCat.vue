<template>
    <div class="addcat">
       
      <div class="container">
      
        <div class="row text-center">   
            <div class="col-12">
                <h3 class="pt-3">Add Category</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
       <div class="col-6">
        <form action="">
        <div class="form-groub">      
            <label for="">category name</label>
            <input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-groub">      
            <label for="">category description</label>
            <input type="text" class="form-control" v-model="desc">
          </div>
          <div class="form-groub">      
            <label for="">category img</label>
            <input type="text" class="form-control" v-model="imgurl">
          </div>
        <button @click="postit" type="button" class="btn">submit</button>
    </form>
       </div>
       <div class="col-3"></div>
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
           added:"",
            submitted:false,
        }

    },
    methods:{
        ...mapActions(['redirectto']),
        async postit(){
            let result=await axios.post("http://localhost:3000/category",{
                name:this.name,
                desc:this.desc,
                imgurl:this.imgurl
            });
                if(result.status==201){
            console.log("new category added successfully");
            this.added="new category added successfully";
          this.redirectto({val:'AdminPanal'});
          }
          else{
            console.log("error on adding new user successfully");
          }
           

        }
    
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