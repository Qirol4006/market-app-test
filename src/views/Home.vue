<template>
  <div>

   <div class="card col-sm-4 container-fluid">
     <button class="btn btn-primary btn-round" @click="replaceToLogin()">Kirish</button>
     <button class="btn btn-round btn-info" @click="$router.push('/user/register')">Ro'yxatdan o'tish</button>
   </div>

  </div>
</template>

<script>

export default {
  name: 'Home',
  created() {
    document.title = "Market App"
  },
  methods:{
    replaceToLogin(){
      location.replace('/login')
    }
  }
}
</script>
