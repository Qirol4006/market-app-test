<template>
  <div id="app">
    <div class="wrapper " v-if="okAuth" >
      <div class="sidebar text-left" data-color="green" data-background-color="black" data-image="/assets/img/sidebar-3.jpg">
        <!--
          Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

          Tip 2: you can also add an image using data-image tag
      -->
        <div class="logo"><a href="/" class="simple-text logo-mini">

        </a>
          <a href="/" class="simple-text logo-normal">
            Market App
          </a></div>
        <div class="sidebar-wrapper">
          <div class="user">
            <div class="photo">
              <img src="/assets/img/default-avatar.png">
            </div>
            <div class="user-info">
              <a data-toggle="collapse" href="#collapseExample" class="username">
              <span>
                {{ userInfo.name }}
                <b class="caret"></b>
              </span>
              </a>
              <div class="collapse" id="collapseExample">
                <ul class="nav">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <span class="sidebar-mini"> MP </span>
                      <span class="sidebar-normal"> My Profile </span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" @click="logOut()">
                      <span class="sidebar-mini"> S </span>
                      <span class="sidebar-normal"> Chiqish </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul class="nav">
            <div class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="material-icons">dashboard</i>
                <p> Boshqaruv paneli</p>
              </router-link>
            </div>
            <div class="nav-item" v-if="inMember">
              <router-link to="/sell" class="nav-link">
                <i class="material-icons">sell</i>
                <p> Sotish </p>
              </router-link>
            </div>
            <div class="nav-item " v-if="inMember">
              <router-link to="/category" class="nav-link">
                <i class="material-icons">filter_list</i>
                <p> Toifalar </p>
              </router-link>
            </div>
            <div class="nav-item " v-if="inMember && isBoshliq">
              <router-link to="/add" class="nav-link">
                <i class="material-icons">library_add</i>
                <p> Yangi mahsulot </p>
              </router-link>
            </div>
            <div class="nav-item" v-if="inMember">
              <router-link to="/products" class="nav-link">
                <i class="material-icons">inventory_2</i>
                <p> Barcha mahsulotlar </p>
              </router-link>
            </div>
            <div class="nav-item" v-if="inMember">
              <router-link to="/transactions" class="nav-link">
                <i class="material-icons">assignment_turned_in</i>
                <p> Cheklar </p>
              </router-link>
            </div>
            <div v-if="okMarket && isBoshliq" class="nav-item">
              <router-link to="/employee" class="nav-link">
                <i class="material-icons">badge</i>
                <p> Ishchilar </p>
              </router-link>
            </div>
            <div v-if="okMarket" class="nav-item">
              <router-link to="/permission/requests" class="nav-link">
                <i class="material-icons">done</i>
                <p> Qabul uchun so'rovlar </p>
              </router-link>
            </div>
            <div v-if="okAuth && !inMember" class="nav-item">
              <router-link to="/get/permission" class="nav-link">
                <i class="material-icons">search</i>
                <p> Marketga a`zo bo'lish </p>
              </router-link>
            </div>
            <div v-if="!okMarket" class="nav-item">
              <router-link to="/market/login" class=" nav-link">
                <i class="material-icons">input</i>
                <p> Marketga kirish </p>
              </router-link>
            </div>
            <div v-if="!okMarket" class="nav-item">
              <router-link to="/market/register" class=" nav-link">
                <i class="material-icons">add_circle_outline</i>
                <p> Marketni ro'yxatdan o'tkazish </p>
              </router-link>
            </div>
          </ul>
        </div>
      </div>
      <div class="main-panel">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div class="container-fluid">
            <div class="navbar-wrapper">
              <div class="navbar-minimize">
                <button id="minimizeSidebar" class="btn btn-just-icon btn-white btn-fab btn-round">
                  <i class="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
                  <i class="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
                </button>
              </div>
              <a class="navbar-brand text-left" href="javascript:;">Market App</a>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
              <span class="sr-only">Toggle navigation</span>
              <span class="navbar-toggler-icon icon-bar"></span>
              <span class="navbar-toggler-icon icon-bar"></span>
              <span class="navbar-toggler-icon icon-bar"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end">
              <form class="navbar-form">
                <div class="input-group no-border">
                  <input type="text" value="" class="form-control" placeholder="Search.">
                  <button type="submit" class="btn btn-white btn-round btn-just-icon">
                    <i class="material-icons">search</i>
                    <div class="ripple-container"></div>
                  </button>
                </div>
              </form>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="javascript:;" @click="$router.push('/')">
                    <i class="material-icons">dashboard</i>
                    <p class="d-lg-none d-md-block">
                      Stats
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar -->
        <div class="content">
          <div class="content">
            <router-view/>
          </div>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <nav class="float-left">
              <ul>
                <li>
                  <a href="https://t.me/qirol4006">
                    Komilov Abror
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/qirol_4006/">
                    Biz haqimizda
                  </a>
                </li>
              </ul>
            </nav>
            <div class="copyright float-right">
              &copy; 2021
              made with <i class="material-icons">favorite</i> by
              <a href="https://t.me/qirol4006" target="_blank">Komilov Abror</a> for a better web.
            </div>
          </div>
        </footer>
      </div>
    </div>
    <router-view v-if="!okAuth"/>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'App',
  data(){
    return{
      okAuth:false,
      userInfo:[],
      okMarket:false,
      inMember:false,
      isBoshliq:false
    }
  },
  async created() {

    this.okAuth = localStorage.getItem('okAuth')

    if (localStorage.getItem('marketToken')){
      this.okMarket = true
    }

    if (this.okAuth){
      await axios.get('/user/about/user').then(
          res => {
            this.userInfo = res.data
            localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          }
      )

      if (this.userInfo.type === 'BOSHLIQ') this.isBoshliq = true

      if (!localStorage.getItem('marketId')){
        await axios.get('/user/getmarketid').then(
            res => {
              if (res.data === 'NotAccepted!') return;
              localStorage.setItem('marketId', res.data.marketId)
            }
        )
      }


    }
    if (localStorage.getItem('marketId')){
      this.inMember = true;
    }
  },

  methods:{
    ros(ok){
      console.log(ok)
      return 'active'
    },

    logOut(){
      localStorage.clear()
      location.replace('/')
    }
  }
}
</script>

<style>
.router-link-exact-active {
  background-color: rgba(96, 11, 226, 0.93);
}

.nav-link:hover{
  background-color: rgba(99, 4, 231, 0.4);
}

.sidebar-wrapper{
  backdrop-filter: blur(10px);

}

</style>
