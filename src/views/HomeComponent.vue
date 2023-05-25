<template>
  <div>


     <button
         class="btn btn-primary btn-round col-sm-3"
         @click="replaceToLogin()"
         v-if="!okAuth"
     >Kirish</button>
     <button
         class="btn btn-round btn-info col-sm-3"
         @click="$router.push('/user/register')"
         v-if="!okAuth"
     >Ro'yxatdan o'tish</button>
    <button
      class="btn btn-lg btn-warning col-sm-6 btn-round"
      @click="$router.push('/sell')"
      v-if="okAuth"
    >
      <i class="material-icons">sell</i>
      Sotish
    </button>
    <button
      class="btn btn-round btn-round btn-primary btn-lg"
      @click="$router.push('/products')"
      v-if="okAuth"
    >
      <i class="material-icons">inventory_2</i>
      Barcha mahsulotlar
    </button>
    <button
      class="btn btn-lg btn-success btn-round col-sm-9"
      @click="$router.push('/category')"
      v-if="okAuth"
      >
      <i class="material-icons">filter_list</i>
      Turlari bo'yicha
    </button>
    <button
      class="btn btn-round btn-instagram btn-lg"
      @click="$router.push('/employee')"
      v-if="isBoshliq && okAuth"
      >
      <i class="material-icons">badge</i>
      Ishchilar
    </button>
    <button
      class="btn btn-lg btn-round btn-rose"
      @click="$router.push('/transactions')"
      v-if="okAuth"
      >
      <i class="material-icons">print</i>
      Cheklar
    </button>



  </div>
</template>

<script>

export default {
  name: 'HomeComponent',
  data(){
    return{
      okAuth:false,
      userInfo:[],
      isBoshliq:true
    }
  },

  created() {
    document.title = "Market App"
    this.okAuth = localStorage.getItem('okAuth')
    if (this.okAuth){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if (this.userInfo.type !== 'BOSHLIQ'){
        this.isBoshliq = false
      }
    }
  },
  methods:{
    replaceToLogin(){
      location.replace('/login')
    }
  }
}
</script>
