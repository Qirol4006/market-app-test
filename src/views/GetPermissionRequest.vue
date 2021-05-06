<template>
<div class="container-fluid">
  <div class="content">


    <form class="navbar-form">
      <div class="input-group no-border col-sm-11">
        <input @keyup="searchData()" v-model="query" type="text" value="" class="form-control" placeholder="Qidirish...">
        <button type="submit" class="btn btn-white btn-round btn-just-icon">
          <i class="material-icons">search</i>
          <div class="ripple-container"></div>
        </button>
      </div>
    </form>


    <div v-if="query" class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-rose card-header-icon">
              <div class="card-icon">
                <i class="material-icons">find_in_page</i>
              </div>
              <h4 class="card-title">Mahsulotlar Table</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                  <tr>
                    <th class="text-center">#</th>
                    <th>Nomi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in filteredMarkets" v-bind:key="item.id">
                    <td class="text-center">{{ item.id }}</td>
                    <td class="text-left"><a @click="saveRequest(item.id, item.name)" href="javascript:void(0)">{{ item.name }}</a></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!query" class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-rose card-header-icon">
              <div class="card-icon">
                <i class="material-icons">segment</i>
              </div>
              <h4 class="card-title">Do'konlar Table</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                  <tr>
                    <th class="text-center">#</th>
                    <th class="text-left">Nomi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in allMarkets" v-bind:key="item.id">
                    <td class="text-center">{{ item.id }}</td>
                    <td class="text-left"><a @click="saveRequest(item.id, item.name)" href="javascript:void(0)">{{ item.name }}</a></td>

                  </tr>
                  </tbody>
                </table>
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
  name: "GetPermissionRequest",
  data(){
    return{
      allMarkets:[],
      query:'',
      filteredMarkets:[],
      userInfo:[]
    }
  },
  async created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    await axios.get('/user/all/magazine').then(
        res => {
          this.allMarkets = res.data
        }
    )
  },
  methods:{
    searchData: function (){
      this.filteredMarkets = this.allMarkets.filter(p => p.name.includes(this.query))
    },
    saveRequest(id, name){
      this.$swal({
        title: 'Siz ' + name + " do'koniga a`zo bo'lishni xohlaysizmi ?",
        showCancelButton: true,
        confirmButtonText: `Ha albatta`,
        cancelButtonText: 'Bekor qilish'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.post('/user/getpermission', {
            magazinId: id,
            userId: this.userInfo.id,
            permission: "SOTUVCHI",
            name: this.userInfo.name
          })
          if (res.data === 'market'){
            this.$swal("Bunday market yo'q qayta urinib ko'ring !", '', 'danger')
            return;
          }
          if (res.data === 'bad'){
            this.$swal("Oldin so'rov yuborgansiz !", '', 'error')
          }else {
            this.$swal("So'rov yuborildi !", '', 'success')
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
