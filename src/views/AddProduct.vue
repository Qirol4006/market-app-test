<template>
  <div>
    <div class="content text-left" data-color="green">
      <div class="container ">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header card-header-rose card-header-icon">
                <div class="card-icon">
                  <i class="material-icons">add_circle_outline</i>
                </div>
                <h4 class="card-title">Maxsulot Qo'shish</h4>
              </div>
              <div class="card-body ">
                <form method="#" action="#">
                  <div class="form-group">
                    <label for="inputName" class="bmd-label-floating">Nomi</label>
                    <input type="text" v-model="name" @keyup="nameUpperCase" class="form-control" id="inputName">
                  </div>
                  <div class="form-group">
                    <label for="inputRealPrice" class="bmd-label-floating">Kelgan Narxi</label>
                    <input type="number" v-model="realPrice" class="form-control" id="inputRealPrice">
                  </div>
                  <div class="form-group">
                    <label for="inputSellPrice" class="bmd-label-floating">Sotilish Narxi</label>
                    <input type="number" v-model="sellPrice" class="form-control" id="inputSellPrice">
                  </div>
                  <div class="form-group">
                    <label for="inputSoni" class="bmd-label-floating">Soni</label>
                    <input type="number" v-model="soni" class="form-control" id="inputSoni">
                  </div>
                  <div class="form-group">
                    <label for="inputValyuta" class="bmd-label-floating">Valyuta</label>
                    <input type="text" v-model="valyuta" class="form-control" id="inputValyuta">
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="dropdown">
                      <button class="dropdown-toggle btn btn-rose btn-round btn-sm"
                              type="button" id="dropdownMenuButton"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Mavjud Valyutalar
                      </button>
                      <div class="dropdown-menu block-md" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="javascript:void(0)" @click="setValyuta('Som')">so'm</a>
                        <a class="dropdown-item" href="javascript:void(0)" @click="setValyuta('$')">$</a>
                        <a class="dropdown-item" href="javascript:void(0)" @click="setValyuta('y.e.')">y.e.</a>
                      </div>
                    </div>
                  </div>

                  <br>
                  <b class="input-group no-border col-sm-7 text-danger h6">Turlari</b>
                  <button
                      class="btn  btn-rose btn-sm btn-round"
                      v-if="type1name"
                      @click="clearType(1)"
                  >
                    {{ type1name }} <i class="material-icons">close</i>
                  </button> <b v-if="type1name"> => </b>
                  <button
                      class="btn  btn-rose btn-sm btn-round" v-if="type2name"
                      @click="clearType(2)"
                  >{{ type2name }} <i class="material-icons">close</i></button>
                  <div class="input-group no-border col-sm-7">

                    <div class="dropdown" v-if="query && (type1 > 0)">
                      <ul class="dropdown-menu show" data-style="select-with-transition" >
                        <li v-for="item in types0" v-bind:key="item.id">
                          <a class="dropdown-item"
                             href="javascript:void(0)" @click="setExType(item.id, item.name)">{{ item.name }}</a>
                        </li>
                      </ul>
                    </div>

                    <input v-if="!type2name" @keyup="searchData()" v-model="query" type="text" class="form-control" placeholder="Type here...">
                    <button v-if="!type2name" @click="addTypes()" class="btn btn-just-icon btn-round btn-rose">
                      <i class="material-icons">add_circle_outline</i>
                    </button>
                  </div>


                </form>
              </div>





              <div class="card-group justify-content-between col-sm-12">
                <button type="submit" class="btn btn-round btn-rose">
                  <i class="material-icons">arrow_back_ios</i>Maxsulotlarga</button>
                <button @click="saveProduct()" class="btn btn-round btn-success">
                  <i class="material-icons ">add_box</i> Saqlash</button>
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
name: "AddProduct",
  data(){
    return {
      name: "",
      type1: 1,
      type1name:'',
      type2: null,
      type2name:'',
      realPrice: null,
      sellPrice: null,
      soni: 1,
      marketId: 0,
      valyuta: "$",
      allTypes:[],
      parentId:null,
      type1Select:null,
      query:'',
      types0:[],
      queryResult:false,
      typesB:[],
      newType1:false,
      newType2:false,
    }
  },
  async created() {
    const typesReq = await axios.get('/types/all')
    this.allTypes = typesReq.data;
    this.sortedTypes(0);
    document.title = "Maxsulot Qo'shish | MarketApp"
    this.marketId = localStorage.getItem('marketId')
  },
  methods:{

    async saveProduct() {
      if (!(this.type1name && this.type2name)){
        console.log(12222222)
        this.$toast.error("Turlarni To'diring !", {
          position: "top-center",
          timeout: 5000,
          rtl: false
        });
        this.$swal('Hello Vue world!!!')
        return 0
      }
      if (this.newType1) {
        // const res = await axios.post('/types/save',
        //     {
        //       name: this.type1name,
        //       parentId: 0,
        //       marketId: this.marketId
        //     })
        // this.type1 = res.data.id
        console.log('Save Type1')
      }
      if (!this.type2){
        //   const res = await axios.post('/types/save',
        //       {
        //         name: this.type2name,
        //         parentId: this.type1,
        //         marketId: this.marketId
        //       })
        // this.type2 = res.data.id
        console.log('save type 2')
      }
    },

    nameUpperCase: function (){
      this.name = this.name.toUpperCase()
    },

    searchData: function (){
      this.query = this.query.toUpperCase()
      this.types0 = this.typesB.filter(p => p.name.includes(this.query))
      if (this.types0.length > 0){
        this.queryResult = true
      }else {
        this.queryResult = false
      }
    },

    setExType(id, names){
      if (this.type1name){
        this.type2name = names
        this.type2 = id
      }else {
        this.type1name = names;
        this.type1 = id
        this.sortedTypes(id);
      }
      this.query = ''
    },

    clearType(id){
      if (id === 1){
        this.type1name = ''
        this.type1 = 1
        this.sortedTypes(0)
        this.type2name = ''
        this.type2 = null
        this.newType1 = false
        this.newType2 = false
      }else {
        this.newType2 = false
        this.type2name = ''
        this.type2 = null
      }
    },

    addTypes(){
      if (this.type1name){
        this.type2name = this.query
        this.newType2 = true
      }else {
        this.newType1 = true
        this.type1name = this.query
        this.type1 = null
      }
      this.query = ''
    },

    sortedTypes(parentId){
      this.typesB = this.allTypes.filter(p => p.parentId === parentId)
    },

    setValyuta(name){
      if (name === 'Som'){
        this.valyuta = "so'm"
      }else this.valyuta = name;
    }
  }
}
</script>

<style scoped>



</style>
