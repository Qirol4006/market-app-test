<template>
  <div class="wrapper wrapper-full-page">
    <div class="page-header register-page header-filter" filter-color="black" style="background-image: url('../../assets/img/register.jpg')">
      <div class="container">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="card card-signup">
              <h2 class="card-title text-center">Marketga kirish</h2>
              <div class="card-body">
                <div class="row justify-content-center">
                  <div class="">

                    <form class="form" method="" action="">
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
                              <i class="material-icons">lock_outline</i>
                            </span>
                          </div>
                          <input type="password" v-model="password" placeholder="Parol..." class="form-control">
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
                        <a v-if="termsCheck" @click="logIn()" href="javascript:void(0)" class="btn btn-primary btn-round mt-4" >Get Started</a>
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
import axios from 'axios'
export default {
  name: "LoginMarket",
  data(){
    return {
      username:'',
      password:'',
      termsCheck: false
    }
  },
  created() {
    if (localStorage.getItem('marketToken')){
      location.replace('/')
    }
    document.title = "Market | Market App"
  },
  methods:{
    async logIn() {
        const res = await axios.post('/user/market', {
          username: this.username,
          password: this.password
        });
        if (res.data !== 'hatok' && res.data !== 'xatok'){
          localStorage.setItem('marketToken', res.data);
          location.replace('/')
        }else{
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
