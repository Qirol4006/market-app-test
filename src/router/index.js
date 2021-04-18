import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserRegister from "@/views/UserRegister";
import Login from "@/views/Login";
import AllProducts from "@/views/AllProducts";
import AddProduct from "@/views/AddProduct";

Vue.use(VueRouter)

const routes = [
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/products',
    name: 'AllProducts',
    component: AllProducts
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/:id',
    name: 'About',

    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
