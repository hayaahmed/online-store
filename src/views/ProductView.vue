<template>
<div class="product">
    <nav-bar></nav-bar>
    <product-view></product-view>
</div>
</template>

<script>
import ProductVVue from '@/components/ProductV.vue';
import NavBar from '../components/NavBar.vue';
export default {
components:{
    ProductVVue,
NavBar,
}
}
</script>

<style>

</style>