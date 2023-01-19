import Vue from 'vue'
import VueRouter from 'vue-router'
import NewHome from '../components/NewHome.vue'
import AddCat from '../views/category/AddCat.vue'
import Category from '../views/category/ShowCat.vue'
import AddProduct from '../views/category/AddProduct.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Profile from '../views/Profile.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import ErrorPage from '../views/ErrorPage.vue'
import AdminPanal from '../views/AdminPanal.vue'
import SingleCat from '../views/category/SingleCat.vue'
import EditCat from '../views/category/EditCat.vue'
import EditProduct from '../views/category/EditProduct'
import DeleteCat from '../views/category/DeleteCat.vue'
import DeleteProduct from '../views/category/DeleteProduct.vue'
import ProductV from '../components/ProductV.vue'
import MyCart from '../views/MyCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/NewHome',
    name: 'NewHome',
    component: NewHome
  },
  {
    path: '/',
    name: 'NewHome',
    component: NewHome
  },
  {
    path: '/admin/category/AddCat',
    name: 'AddCat',
    component: AddCat
  },
  {
    path: '/admin/category/AddProduct',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/admin/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/LogIn',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/UpdateProfile',
    name: 'UpdateProfile',
    component: UpdateProfile
  },
  {
    path: '/AdminPanal',
    name: 'AdminPanal',
    component: AdminPanal
  },
  {
    path: '/SingleCat/:name/',
    name: 'SingleCat',
    component: SingleCat
  },
  {
    path: '/EditCat/:name/',
    name: 'EditCat',
    component: EditCat
  },
  {
    path: '/EditProduct/:name/',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/DeleteCat/:id/',
    name: 'DeleteCat',
    component: DeleteCat
  },
  {
    path: '/DeleteProduct/:id/',
    name: 'DeleteProduct',
    component: DeleteProduct
  }, {

    path: '/ProductV/:id/',
    name: 'ProductV',
    component: ProductV
  }
  , {

    path: '/MyCart',
    name: 'MyCart',
    component: MyCart
  }
  ,
  //stays last when enter page dont find it in project
  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: ErrorPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.params.pagaTitle !== undefined) {
    document.title = `${to.name} | ${to.params.pagaTitle} | ${process.env.VUE_APP_TITLE}`;
    console.log(document.title);
  }
  else {
    if (to.name == null) {
      document.title = `unkoun page | ${process.env.VUE_APP_TITLE}`;
    }
    else {
      document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`;
    }
  }
  next();

})
export default router
