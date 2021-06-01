<template>
<div>
  <div  class="container-fluid">
    <div class="row">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header card-header-rose card-header-icon">
            <div class="card-icon">
              <i class="material-icons">segment</i>
            </div>
            <h4 class="card-title">A`zo bo'lish uchun so'rovlar</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>Ismi</th>
                  <th>Turi</th>
                  <th class="text-right">Amallar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in allPermissionRequests" v-bind:key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.permission }}</td>

                  <td class="td-actions text-right">
                    <button type="button" rel="tooltip" @click="acceptRequest(item.id, item.name, item.permission)"
                            class="btn btn-success btn-round">
                      <i class="material-icons">done</i>
                    </button>
                    <button type="button" rel="tooltip" @click="deleteRequest(item.id, item.name)"
                            class="btn btn-danger btn-round">
                      <i class="material-icons">close</i>
                    </button>
                  </td>
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
</template>

<script>
import axios from "axios";

export default {
  name: "PermissionRequests",
  data(){
    return{
      allPermissionRequests:[],
      marketToken:''
    }
  },
  async created() {
    this.marketToken = localStorage.getItem('marketToken')
    await axios.get('/user/market/permissionrequests',
        {
          headers:{
            Authorization: this.marketToken
          }
        }).then(
        res => {
          this.allPermissionRequests = res.data
        }
    )
    document.title = "Qabul uchun So'rovlar | Market App"
  },
  methods:{
    async acceptRequest(id, name, type) {
      console.log(id, name)

      this.$swal({
        title: 'Siz ' + name + " do'koningizga "+type+" sifatida a`zo bo'lishini xohlaysizmi ?",
        showCancelButton: true,
        confirmButtonText: `Ha albatta`,
        cancelButtonText: 'Bekor qilish'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.get('/user/acceptrequest/'+id,
              {
                headers: {
                  Authorization: this.marketToken
                }
              })
          if (res.data === 'bad'){
            this.$swal("Oldin qabul qilingan !", '', 'error')
          }else {
            this.$swal("Qabul qilindi !", '', 'success')
            axios.get('/user/market/permissionrequests',
                {
                  headers:{
                    Authorization: this.marketToken
                  }
                }).then(
                res => {
                  this.allPermissionRequests = res.data
                }
            )
          }
        }
      })


    },

    deleteRequest(id, name){
      console.log(id, name)

      this.$swal({
        title: 'Siz ' + name + " do'koningizga a`zo bo'lish so'rovini bekor qilishni xohlaysizmi ?",
        showCancelButton: true,
        confirmButtonText: `Ha`,
        cancelButtonText: 'Bekor qilish'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.get('/user/delete/request/'+id,
              {
                headers: {
                  Authorization: this.marketToken
                }
              })
          if (res.data === 'bad'){
            this.$swal("Oldin bunday so'rov mavjud emas !", '', 'error')
          }else {
            this.$swal("O'chirb yuborildi !", '', 'success')
            axios.get('/user/market/permissionrequests',
                {
                  headers:{
                    Authorization: this.marketToken
                  }
                }).then(
                res => {
                  this.allPermissionRequests = res.data
                }
            )
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
