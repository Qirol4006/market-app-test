<template>
  <div>
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
                      <th>Real Narxi</th>
                      <th>Sotilishi</th>
                      <th class="text-right">Soni</th>
                      <th class="text-right">Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in filteredProducts" v-bind:key="item.id">
                      <td class="text-center">{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.realPrice }}</td>
                      <td>{{ item.sellPrice }} {{ item.valyuta}}</td>
                      <td class="text-right">{{ item.soni }}</td>

                      <td class="td-actions text-right">
                        <button type="button" @click="$router.push('/product/edit/' + item.id)" rel="tooltip" class="btn btn-success btn-round">
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

      <div v-if="!query" class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header card-header-rose card-header-icon">
                <div class="card-icon">
                  <i class="material-icons">segment</i>
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
                      <th>Real Narxi</th>
                      <th>Sotilishi</th>
                      <th class="text-right">Soni</th>
                      <th class="text-right">Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in products" v-bind:key="item.id">
                      <td class="text-center">{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.realPrice }}</td>
                      <td>{{ item.sellPrice }} {{ item.valyuta}}</td>
                      <td class="text-right">{{ item.soni }}</td>

                      <td class="td-actions text-right">
                        <button type="button" rel="tooltip" @click="$router.push('/product/edit/' + item.id)" class="btn btn-success btn-round">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ThirdCategory",

  data(){
    return{
      secondTypes:[],
      products:[],
      filteredProducts:[],
      query:''
    }
  },

  async created() {

    await axios.get('/products/all/filter/' + this.$route.params.id + '/' + this.$route.params.id2).then(
        res => {
          this.products = res.data
        }
    )

    await axios.get('/types/all/' + this.$route.params.id).then(
        res => {
          this.secondTypes = res.data
        }
    )

    document.title = "Tur Bo'yicha Maxsulotlar | Market App"
  },

  methods:{

    searchData:function (){

      this.query = this.query.toUpperCase()
      this.filteredProducts = this.products.filter(p => p.name.includes(this.query))
    },

    deleteItem(id, name){
      this.$swal({
        title: 'Siz ' + name + " maxsulotingizni o'chirib yuborasizmi ?",
        showCancelButton: true,
        confirmButtonText: `Ha albatta`,
        cancelButtonText: 'Bekor qilish'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.get('/products/del/' + id)
          if (res.data === 'market'){
            this.$swal("Bunday market yo'q qayta urinib ko'ring !", '', 'danger')
            return;
          }
          if (res.data === 'product'){
            this.$swal("Bu maxsulot oldindan o'chirib yuborilgan !", '', 'error')
          }else {
            this.$swal("Maxsulot o'chirib yuborildi !", '', 'success')
            await axios.get('/products/all/simplefilter/' + this.$route.params.id).then(
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
