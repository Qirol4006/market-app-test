import {createRouter, createWebHistory} from 'vue-router'
import Edittype from "@/views/EdittypeView.vue";
import ManageTypes from "@/views/ManageTypes.vue";
import EmployeeList from "@/views/EmployeeList.vue";
import Transactions from "@/views/Transactions.vue";
import ClearData from "@/views/ClearData.vue";
import SellProduct from "@/views/SellProduct.vue";
import ThirdCategory from "@/views/ThirdCategory.vue";
import SecondCategory from "@/views/SecondCategory.vue";
import ProductCategory from "@/views/ProductCategory.vue";
import PermissionRequests from "@/views/PermissionRequests.vue";
import EditProduct from "@/views/EditProduct.vue";
import GetPermissionRequest from "@/views/GetPermissionRequest.vue";
import LoginMarket from "@/views/LoginMarket.vue";
import MarketRegister from "@/views/MarketRegister.vue";
import AddProduct from "@/views/AddProduct.vue";
import AllProducts from "@/views/AllProducts.vue";
import Login from "@/views/LoginView.vue";
import UserRegister from "@/views/UserRegister.vue";
import Home from "@/views/HomeComponent.vue";

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

    component: () => import('../views/AboutComponent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
