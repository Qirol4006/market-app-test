<template>
<div class="card-body justify-content-center form-group">
  <td class="td-number">
    1
    <div class="btn-group btn-group-sm">
      <button class="btn btn-round btn-info"> <i class="material-icons">remove</i> </button>
      <button class="btn btn-round btn-info"> <i class="material-icons">add</i> </button>
    </div>
  </td>
  <div class="input-group no-border col-sm-12">

      <div class="input-group no-border col-sm-12">
        <input v-model="query" type="text" value="" class="form-control" placeholder="Qidirish...">
        <button type="submit" class="btn btn-white btn-round btn-just-icon">
          <i class="material-icons">search</i>
          <div class="ripple-container"></div>
        </button>
      </div>

    <div class="dropdown col-sm-12" v-if="query">
      <ul class="dropdown-menu show col-sm-11" data-style="select-with-transition" >
        <li v-for="item in products" v-bind:key="item.id">
          <a class="dropdown-item"
             href="javascript:void(0)" @click="selectProducts(item.id)">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-rose card-header-icon">
            <div class="card-icon">
              <i class="material-icons">sell</i>
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
                <tr v-for="item in selectedProducts" v-bind:key="item.id">
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
</template>

<script>
import axios from "axios";

export default {
  name: "SellProduct",
  data(){
    return{
      query:'',
      types0:[
        {
          id:1,
          name:'12'
        },
        {
          id:2,
          name:'12'
        }
      ],
      products:[],
      selectedProducts:[]
    }
  },
  async created() {
    await axios.get('/products/getall').then(
        res => {
          this.products = res.data
        }
    )
    document.title = "Maxsulotlarni sotish | Market App"
  },
  methods:{
    selectProducts(prod){
      const p = this.products.filter(s => s.id === prod)
      this.selectedProducts.push(p[0])
      console.log(this.selectedProducts)
    }
  }
}
</script>

<style scoped>

</style>
