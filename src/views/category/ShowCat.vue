<template>
    <div class="showcat">
       <div class="container">
        <div class="float-start">
            <h3>hihihi</h3>
        </div>
      <div class="row">
        <div class="col-12">
            <h2 class="pt-3">all categories</h2>
            <router-link to="/admin/category/addCat"><button class="btn">Add category</button></router-link>
        </div>
      </div>
        <div class="row">
            <div v-for="(cat,index) in blogs" :key="index" class="thiscard col-xl-4 col-md-6 col-12 d-flex">
            <div class="card" >
        <!-- <CategoryCom :cat="cat"></CategoryCom> -->
                <div class="catimg embed-responsive embed-responsive16by9 ">
                    <img :src="cat.category.imgurl" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{cat.category.name}}</h5>
                    <p class="card-text ">{{cat.category.desc}}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div> 
        </div>
      </div>
       

        </div>
       </div>
    </div>
</template>
<script>
//  import CategoryComVue from '@/components/CategoryCom.vue';
// import CategoryCom from '../../components/CategoryCom.vue';
export default {
    // name:"CategoryCom",
    // components:{CategoryCom},
    data(){
        return{
        blogs:[],
        }
    },
    methods:{
        getCategories(){
            fetch("https://online-store-79f2f-default-rtdb.firebaseio.com/posts.json").then(
  (result) =>{ console.log(result); //the response
  let mydata=result.json();//extract all data here return as promise
  console.log(mydata);
  return mydata
}).then(
    (data)=>{
    this.blogs=data;}
);
    }
},
mounted(){
this.getCategories();
}

}
    

</script>
<style lang="scss" scoped>
.thiscard{
    height: 500px;
.card{
// height:400px;

    // width:300px;
    // height: 200px;
    .catimg  .card-img-top{
        object-fit: cover;
        height: 300px;
    }
    .card-text{
        color: gray;
    }
}
}
</style>