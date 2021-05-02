<template>

  <div class="wrapper wrapper-full-page">
    <div class="page-header register-page header-filter" filter-color="black" style="background-image: url('../../assets/img/register.jpg')">
      <div class="container">
        <div class="row">
          <div class="col-md-10 ml-auto mr-auto">
            <div class="card card-signup">
              <h2 class="card-title text-center">Register</h2>
              <div class="card-body">
                <div class="row justify-content-center">
                  <div class="">

                    <form class="form" method="" action="">
                      <div class="form-group has-default bmd-form-group">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">face</i>
                            </span>
                          </div>
                          <input type="text" v-model="name" class="form-control" placeholder="Nomi...">
                        </div>
                      </div>
                      <div class="form-group has-default bmd-form-group">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">account_circle</i>
                            </span>
                          </div>
                          <input type="text" v-model="username" class="form-control" placeholder="Foydalanuvchi nomi (username)">
                        </div>
                      </div>
                      <div class="form-group has-default bmd-form-group">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">call</i>
                            </span>
                          </div>
                          <input type="text" v-model="tel" class="form-control" placeholder="Telefon raqami">
                        </div>
                      </div>
                      <div class="form-group has-default bmd-form-group">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">mail</i>
                            </span>
                          </div>
                          <input v-model="email" type="text" class="form-control" placeholder="Email...">
                        </div>
                      </div>
                      <div class="form-group has-default bmd-form-group">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">lock_outline</i>
                            </span>
                          </div>
                          <input type="password" v-model="password" placeholder="Parol..." class="form-control">
                        </div>
                      </div>
                      <div class="form-group has-default bmd-form-group">
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">lock_outline</i>
                            </span>
                          </div>
                          <input type="password" v-model="password_cofirm" placeholder="Parolni qayta tering..." class="form-control">
                        </div>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" v-model="termsCheck" :checked="termsCheck">
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                          I agree to the
                          <a href="#something">terms and conditions</a>.
                        </label>
                      </div>
                      <div class="text-center">
                        <a v-if="!termsCheck" class="btn disabled btn-round mt-4" @click="submitData()" >Get Started</a>
                        <a v-if="termsCheck" @click="submitData()" href="javascript:void(0)" class="btn btn-primary btn-round mt-4" >Get Started</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MarketRegister",
  data(){
    return {
      name:'',
      username: '',
      password: '',
      password_cofirm:'',
      email:'',
      type: 1,
      tel:'+998',
      termsCheck: false
    }
  },
  created() {
    document.title = "Do'konni ro'yxatdan o'tkaziash | Market App"
  },
  methods:{
    async submitData() {
      const res = await axios.post('/user/register/market',{
        name: this.name,
        tel: this.tel,
        username: this.username,
        password: this.password,
        email: this.email,
        type: this.type
      })
      console.log(res.data)
    }
  }
}
</script>

<style scoped>

</style>
