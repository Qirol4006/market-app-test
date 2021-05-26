<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
    <div class="container">
      <div class="navbar-wrapper">
        <a class="navbar-brand" href="javascript:;">Kirish sahifasi</a>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
  <div class="wrapper wrapper-full-page">
    <div class="page-header login-page header-filter" filter-color="black" style="background-image: url('../../assets/img/login.jpg'); background-size: cover; background-position: top center;">
      <!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
            <form class="form" method="" action="">
              <div class="card card-login card-hidden">
                <div class="card-header card-header-rose text-center">
                  <h4 class="card-title">Kirish
                  </h4>
                </div>
                <div class="card-body ">
                  <span class="bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input type="username" v-model="username" class="form-control" placeholder="Foydalanuvchi nomi...">
                    </div>
                  </span>
                  <span class="bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">password</i>
                        </span>
                      </div>
                      <input type="password" v-model="password" class="form-control" placeholder="Parol...">
                    </div>
                  </span>
                </div>
                <div class="card-footer justify-content-center">
                  <a href="javascript:void(0)" @click="$router.push('/')" class="btn btn-rose btn-link btn-lg">Bosh sahifa</a>
                  <a href="javascript:void(0)" @click="logIn()" class="btn btn-rose btn-link btn-lg">Kirish</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data(){
    return {
      username:'',
      password:''
    }
  },
  created() {
    if (localStorage.getItem('token')){
      location.replace('/')
    }
    document.title = "Kirish | Market App"
  },
  methods:{
    async logIn() {
      try {
        const res = await axios.post('/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', res.data);
        localStorage.setItem('okAuth', true)
        location.replace('/')
      }catch (e){
        this.$swal.fire({
          icon: 'error',
          text: "Parol yoki Login xato"
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
