<template>
<div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-rose card-header-icon">
            <div class="card-icon">
              <i class="material-icons">list</i>
            </div>
            <h4 class="card-title">Birinchi turlar</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th>Nomi</th>

                  <th class="text-right">Amallar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in firstTypes" v-bind:key="item.id">
                  <td class="text-center">{{ item.id }}</td>
                  <td  ><a href="javascript:;" @click="secondLevel(item.id, item.name)"> {{ item.name }}</a></td>

                  <td class="td-actions text-right"  >
                    <button type="button" rel="tooltip" @click="$router.push('/type/edit/' + item.id)" class="btn btn-success btn-round">
                      <i class="material-icons">edit</i>
                    </button>
                    <button type="button" rel="tooltip" @click="deleteItem(item.id, item.name)" class="btn btn-danger btn-round">
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
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-rose card-header-icon">
            <div class="card-icon">
              <i class="material-icons">list</i>
            </div>
            <h4 class="card-title">Ikkinchi turlar</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th>Nomi</th>

                  <th class="text-right">Amallar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in secondTypes" v-bind:key="item.id">
                  <td class="text-center">{{ item.id }}</td>
                  <td>{{ getParentName(item.parentId) }} <b>-></b>
                    <a href="javascript:;" @click="thirdLevel(item.id, item.parentId)"> {{ item.name }}</a></td>

                  <td class="td-actions text-right"  >
                    <button type="button" rel="tooltip" @click="$router.push('/type/edit/' + item.id)" class="btn btn-success btn-round">
                      <i class="material-icons">edit</i>
                    </button>
                    <button type="button" rel="tooltip" @click="deleteItem(item.id, item.name)" class="btn btn-danger btn-round">
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
  name: "ManageTypes",
  data(){
    return{
      allTypes:[],
      firstTypes:[],
      secondTypes:[],
      isBoshliq:false,
      userInfo:[]
    }
  },

  created() {
    document.title = 'Turlarni tahrirlash | Market App'
    this.allData();
  },

  methods:{

    thirdLevel(id, pid){
      this.$router.push('/categories/' + pid + '/' + id)
    },

    secondLevel(id, name){
      this.$router.push('/category/' + id + '/' + name)
    },

    getParentName(id){
      let p = this.firstTypes.filter(p => p.id === id)
      return p[0].name
    },

    async allData() {
      await axios.get('/types/all').then(
          res => {
            this.allTypes = res.data
          }
      )
      this.firstTypes = this.allTypes.filter(s => s.parentId === 0)
      this.secondTypes = this.allTypes.filter(s => s.parentId !== 0)

      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if (this.userInfo.type === 'BOSHLIQ'){
        this.isBoshliq = true
      }
    },

    deleteItem(id, name){
      console.log(id, name)
      if (!this.isBoshliq) return;
      this.$swal({
        title: 'Siz ' + name + " turni o'chirib yuborasizmi ?",
        showCancelButton: true,
        confirmButtonText: `Ha albatta`,
        cancelButtonText: 'Bekor qilish'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.get('/types/delete/' + id)
          if (res.data === 'TypeNotFound'){
            this.$swal("Bunday tur yo'q qayta urinib ko'ring !", '', 'error')
            return;
          }
          if (res.data === 'ProductsFound'){
            this.$swal("Bu turda mahsulotlar mavjud! Avval ularni turini o'zgartiring!", '', 'error')
          }else {
            this.$swal("Maxsulot o'chirib yuborildi !", '', 'success')
            await this.allData()
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
