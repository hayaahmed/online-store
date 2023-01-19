<template>
  <div class="pagenotfound">
    <br/>
    <div class="text-center">
        <router-link :to="{name:'NewHome'}"><button class="btn btn-info">Visit Home Page</button></router-link>
       </div>
       <br/>
    <img class="rounded mx-auto d-block h400" src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=360&t=st=1669211093~exp=1669211693~hmac=c28bc6bd692236f4adba544df2e1d7c4747122f588fa868fe0b5fcd0e0ac5f68" alt="">
      
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: "ErrorPage",
    components: { NavBar },
}
</script>

<style>
.h400{
    height: 400px;
}
</style>