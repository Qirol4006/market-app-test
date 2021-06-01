<template>
<div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-rose card-header-icon">
            <div class="card-icon">
              <i class="material-icons">badge</i>
            </div>
            <h4 class="card-title text-center">Ishchilar</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th>Ismi</th>
                  <th>Tiofa</th>
                  <th>Amallar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in employee" v-bind:key="item.id">
                  <td class="text-center">{{ item.id }}</td>
                  <td>{{ item.userName }}</td>
                  <td>{{ item.type }}</td>

                  <td class="td-actions text-right">
                    <button type="button" rel="tooltip" @click="deleteItem(item.id, item.userName)" class="btn btn-danger btn-round">
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
  name: "EmployeeList",
  data(){
    return{
      marketToken:'',
      employee:[]
    }
  },

  async created() {
    document.title = "Ishchilar | Market App"

    if (!localStorage.getItem("marketToken")){
      await this.$router.push('/');
    }

    this.marketToken = localStorage.getItem("marketToken");

    axios.get('/user/employee',{
      headers:{
        Authorization: this.marketToken
      }
    }).then(
        res => {
          this.employee = res.data
        }
    )
  },

  methods:{
    deleteItem(id, name){
      this.$swal({
        title: 'Siz ' + name + " ishchingizni o'chirib yuborishni istaysizmi ?",
        showCancelButton: true,
        confirmButtonText: `Ha albatta`,
        cancelButtonText: 'Bekor qilish'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.get('/user/delete/employee/' + id, {
            headers:{
              Authorization: this.marketToken
            }
          })
          if (res.data === 'NotFoundMarket!'){
            this.$swal("Bunday market yo'q qayta urinib ko'ring !", '', 'error')
            return;
          }
          if (res.data === 'NotAccepted'){
            this.$swal("Bu ishchi siz bilan ishlamaydi !", '', 'error')
          }else {
            this.$swal("Ishchi o'chirib yuborildi !", '', 'success')
            await axios.get('/products/getall').then(
                res => {
                  this.products = res.data
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
