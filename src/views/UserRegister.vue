<template>

    <div class="wrapper wrapper-full-page">
      <div class="page-header register-page header-filter" filter-color="black" style="background-image: url('../../assets/img/register.jpg')">
        <div class="container">
          <div class="row">
            <div class="col-md-10 ml-auto mr-auto">
              <div class="card card-signup">
                <h2 class="card-title text-center">Register</h2>
                <div class="card-body ">
                  <div class="row justify-content-center">
                    <div class="">

                      <form class="form"  method="" action="">
                        <div class="form-group has-default bmd-form-group">
                          <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">face</i>
                            </span>
                            </div>
                            <input type="text" v-model="name" class="form-control" placeholder="Ismingiz...">
                          </div>
                        </div>
                        <div class="form-group has-default bmd-form-group">
                          <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">badge</i>
                            </span>
                            </div>
                            <input type="text" v-model="lastname" class="form-control" placeholder="Familiyangiz...">
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
                            I agree to the {{ termsCheck }}
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
  name: "UserRegister",
  data(){
    return {
      name:'',
      lastname: '',
      username: '',
      password: '',
      password_cofirm:'',
      email:'',
      type: 'BOSHLIQ',
      termsCheck: false
    }
  },
  created() {
    document.title = "Ro'yxatdan o'tish | Market App"
  },
  methods:{
    async submitData() {
      const res = await axios.post('/user/register',{
        name: this.name,
        lastName: this.lastname,
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
