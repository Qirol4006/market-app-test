<template>
<div class="card-body justify-content-center form-group">
  <div class="input-group no-border col-sm-12">


      <div class="input-group no-border col-sm-12">
        <input @keyup="searchData()" v-model="query" type="text" value="" class="form-control" placeholder="Qidirish...">
        <button type="submit" class="btn btn-white btn-round btn-just-icon">
          <i class="material-icons">search</i>
          <div class="ripple-container"></div>
        </button>
      </div>

    <div class="dropdown col-sm-12" v-if="query && products.length > 0">
      <ul class="dropdown-menu show col-sm-11" data-style="select-with-transition" >
        <li v-for="item in filteredProducts" v-bind:key="item.id">
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
            <h4 class="card-title">Mahsulotlar</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th class="text-center">Nomi</th>
                  <th>Narxi</th>
                  <th>Soni</th>
                  <th><i class="material-icons">exposure</i></th>
                  <th>Amallar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in selectedProducts" v-bind:key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }} {{ item.valyuta }}</td>
                  <td>{{ item.count }}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-round btn-info" @click="minusCount(item.product_id)"> <i class="material-icons">remove</i> </button>
                      <button class="btn btn-round btn-info" @click="plusCount(item.product_id)"> <i class="material-icons">add</i> </button>
                    </div>
                  </td>
                  <td class="td-actions text-right">
                    <button type="button" rel="tooltip" @click="delItem(item.product_id)" class="btn btn-danger btn-round">
                      <i class="material-icons">close</i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer justify-content-center">
            <button class="btn btn-info" @click="sell()">Sotish</button>
            <br>
            <h5>Umumiy summa {{ summ }}</h5>
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
      products:[],
      orgProducts:[],
      selectedProducts:[],
      filteredProducts:[],
      summ:0
    }
  },
  async created() {
    await axios.get('/products/getall').then(
        res => {
          this.products = res.data
        }
    )
    this.orgProducts = this.products
    document.title = "Maxsulotlarni sotish | Market App"
  },
  methods:{
    async sell() {
      const res = await axios.post('/products/sell', this.selectedProducts)
      console.log(res.data)
    },

    searchData:function (){

      this.query = this.query.toUpperCase()
      this.filteredProducts = this.products.filter(p => p.name.includes(this.query))
    },

    delItem(id){
      const indexObj = this.selectedProducts.findIndex(s => s.product_id === id)
      this.selectedProducts.splice(indexObj, 1);
    },

    plusCount(id){
      const indexObj = this.selectedProducts.findIndex(s => s.product_id === id)
      const prod = this.orgProducts.filter(p => p.id === this.selectedProducts[indexObj].product_id)
      if (this.selectedProducts[indexObj].count === prod[0].soni){
        return;
      }
      this.selectedProducts[indexObj].count ++
    },

    minusCount(id){
      const indexObj = this.selectedProducts.findIndex(s => s.product_id === id)
      if (this.selectedProducts[indexObj].count === 1){
        return;
      }
      this.selectedProducts[indexObj].count --
    },

    selectProducts(prod){
      const p = this.products.filter(s => s.id === prod)
      this.selectedProducts.push(
          {
            product_id:p[0].id,
            name:p[0].name,
            price:p[0].sellPrice,
            count:1,
            valyuta:p[0].valyuta
          }
      )
      this.query = '';
      this.products = this.products.filter(k => k.id !== prod)
      console.log(this.selectedProducts)
    }
  }
}
</script>

<style scoped>

</style>
