<template>
<div class=" justify-content-center form-group">
  <div class="input-group">


      <div class="input-group no-border col-sm-12  col-lg-12 col-sm-12">
        <input @keyup="searchData()" v-model="query" type="text" class="form-control" placeholder="Qidirish...">
        <button type="submit" class="btn btn-white btn-round btn-just-icon">
          <i class="material-icons">qr_code_scanner</i>
          <div class="ripple-container"></div>
        </button>
      </div>

    <div class="dropdown col-sm-12  col-lg-12 col-sm-12" v-if="query && products.length > 0">
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
      <div class="col-md-12 col-lg-12 col-sm-12">
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
                      <button class="btn btn-round btn-info" @click="minusCount(item.productId)"> <i class="material-icons">remove</i> </button>
                      <button class="btn btn-round btn-info" @click="plusCount(item.productId)"> <i class="material-icons">add</i> </button>
                    </div>
                  </td>
                  <td class="td-actions text-right">
                    <button type="button" rel="tooltip" @click="delItem(item.productId)" class="btn btn-danger btn-round">
                      <i class="material-icons">close</i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="material-icons">edit</i>
                            </span>
                  </div>
                  <input type="text" v-model="note" class="form-control" placeholder="Qo'shimcha eslatma...">
                </div>
              </div>
              <h5>Umumiy summa {{ sTring(summ) }}</h5>
            </div>
          </div>
          <div class="card-footer justify-content-around">
            <button class="btn btn-danger" @click="$router.go(-1)">
              <i class="material-icons">arrow_back_ios</i> Ortga</button>
            <button class="btn btn-info" @click="sell()">
              <i class="material-icons">done</i> Sotish</button>
            <br>
          </div>
          <div class="card-footer justify-content-end">
            <a href="javascript:void(0)" @click="$router.push('/transactions')">
              <i class="material-icons">print</i> Cheklar</a>
          </div>

        </div>
      </div>
    </div>
  </div>


</div>
</template>

<script>
import axios from "axios";
import numeral from "numeral"

export default {
  name: "SellProduct",
  data(){
    return{
      query:'',
      products:[],
      orgProducts:[],
      selectedProducts:[],
      filteredProducts:[],
      summ:0,
      note:''
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

    sTring(summa){
      return numeral(summa).format('0,0')
    },

    async sell() {
      if (this.note === '') this.note = 'Sold With ☺'
      this.selectedProducts.push({
        name: this.note
      })
      await axios.post('/products/sell', this.selectedProducts)
      this.$swal.fire(
          {
            text:"Sotildi!",
            icon:'success'
          }
      )

      await axios.get('/products/getall').then(
          res => {
            this.products = res.data
          }
      )
      this.orgProducts = this.products

      this.selectedProducts = []
      this.summ = 0
      this.note = ''
    },

    searchData:function (){

      this.query = this.query.toUpperCase()
      this.filteredProducts = this.products.filter(p => p.name.includes(this.query))
    },

    delItem(id){
      const indexObj = this.selectedProducts.findIndex(s => s.productId === id)
      this.products.push(
          this.orgProducts.filter(s => s.id === id)[0]
      );
      this.summ -= this.selectedProducts[indexObj].price * this.selectedProducts[indexObj].count
      this.selectedProducts.splice(indexObj, 1);
    },

    plusCount(id){
      const indexObj = this.selectedProducts.findIndex(s => s.productId === id)
      const prod = this.orgProducts.filter(p => p.id === this.selectedProducts[indexObj].productId)
      if (this.selectedProducts[indexObj].count === prod[0].soni){
        return;
      }
      this.summ += this.selectedProducts[indexObj].price
      this.selectedProducts[indexObj].count ++
    },

    minusCount(id){
      const indexObj = this.selectedProducts.findIndex(s => s.productId === id)
      if (this.selectedProducts[indexObj].count === 1){
        return;
      }
      this.summ -= this.selectedProducts[indexObj].price
      this.selectedProducts[indexObj].count --
    },

    selectProducts(prod){
      const p = this.products.filter(s => s.id === prod)
      if (p[0].soni < 1) return;
      this.selectedProducts.push(
          {
            productId:p[0].id,
            name:p[0].name,
            price:p[0].sellPrice,
            count:1,
            valyuta:p[0].valyuta
          }
      )
      this.summ += p[0].sellPrice
      this.query = '';
      this.products = this.products.filter(k => k.id !== prod)
    }
  }
}
</script>

<style scoped>

</style>
