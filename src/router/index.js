import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserRegister from "@/views/UserRegister";
import Login from "@/views/Login";
import AllProducts from "@/views/AllProducts";
import AddProduct from "@/views/AddProduct";
import MarketRegister from "@/views/MarketRegister";
import LoginMarket from "@/views/LoginMarket";
import GetPermissionRequest from "@/views/GetPermissionRequest";
import EditProduct from "@/views/EditProduct";
import PermissionRequests from "@/views/PermissionRequests";
import ProductCategory from "@/views/ProductCategory";
import SecondCategory from "@/views/SecondCategory";
import ThirdCategory from "@/views/ThirdCategory";
import SellProduct from "@/views/SellProduct";
import ClearData from "@/views/ClearData";
import Transactions from "@/views/Transactions";
import EmployeeList from "@/views/EmployeeList";
import ManageTypes from "@/views/ManageTypes";
import Edittype from "@/views/Edittype";


Vue.use(VueRouter)

const routes = [
  {
    path: '/type/edit/:id',
    name: 'EditType',
    component: Edittype
  },
  {
    path: '/manage/types',
    name: 'ManageTypes',
    component: ManageTypes
  },
  {
    path: '/employee',
    name: 'MarketEmployee',
    component: EmployeeList
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/cleardata',
    name: 'ClearData',
    component: ClearData
  },
  {
    path:'/sell',
    name: 'SellProduct',
    component: SellProduct
  },
  {
    path: '/categories/:id/:id2',
    name: 'ThirdCategory',
    component: ThirdCategory
  },
  {
    path: '/category/:id/:name',
    name: 'SecondCategory',
    component: SecondCategory
  },
  {
    path: '/category',
    name: "ProductCategory",
    component: ProductCategory
  },
  {
    path: "/permission/requests",
    name: 'PermissionRequests',
    component: PermissionRequests
  },
  {
    path: '/product/edit/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/get/permission',
    name: 'GetPermissionRequest',
    component: GetPermissionRequest

  },
  {
    path: '/market/login',
    name: 'LoginMarket',
    component: LoginMarket
  },
  {
    path: '/market/register',
    name: 'MarketRegister',
    component: MarketRegister
  },
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
