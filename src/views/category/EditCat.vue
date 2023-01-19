<template>
    <div class="editcat">
       
      <div class="container ">
      
        <div class="row text-center">   
            <div class="col-12">
                <h3 class="pt-3">edit Category {{catname}}</h3>
            </div>
        </div>
      
       <div class="col-lg-8 col-md-12 ">
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
        <button @click="undateit" type="button" class="btn">Edit Category</button>
    </form>
        </div>
     <div v-if="submitted" class="showcat">
        <h2>thank you for eidting a category</h2>
     </div>
      </div>

    </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            name:"",
            desc:"",
            imgurl:"",
            catname:this.$route.params.name,
            catid:"",
            submitted:false,
            catnotfound:"",
        }

    },
    methods:{
        ...mapActions(['redirectto']),
        async undateit(){
            let result=await axios.put(`http://localhost:3000/category/${this.catid}`,{
            name:this.name,
            desc:this.desc,
            imgurl:this.imgurl,
        }); 
        if(result.status==200){
            console.log("user profile is updated successfully");
            this.redirectto({val:'AdminPanal'});
         // console.log(result);
        //     localStorage.setItem('user-info',JSON.stringify(result.data));
        //     console.log(result.data);
        //   this.redirectto({val:'Profile'});
          }
          else{
          this.catnotfound="something went wrong try again";
         }
        }
    },
    async mounted(){
        let result=await axios.get(`http://localhost:3000/category?name=${this.catname}`);
  
        let mydata=result.data;
        this.name=mydata[0].name;
        this.desc=mydata[0].desc;
        this.imgurl=mydata[0].imgurl;
        this.catid=mydata[0].id;
        console.log(mydata[0].name);
    }
}

</script>
<style lang="scss">
.editcat{
.btn{
    margin-top: 20px;
    background-color: rgb(32, 124, 124);
    color: white;
}
@media (max-width:768px) {
    width: 375px;
   input{
    font-size: 15px;
   }
}
}


</style>