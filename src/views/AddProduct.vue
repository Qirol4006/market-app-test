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
                    <input type="text" v-model="name" class="form-control" id="inputName">
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
                  <div class="col-lg-5 col-md-6 col-sm-6">
                    <select v-model="valyuta" class="selectpicker" data-size="7" data-style="btn btn-info btn-round" title="Valyutani Tanlang">
                      <option value="So'm" selected>So'm</option>
                    </select>
                  </div>



                  <div class="form-check">
                    <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" value=""> Sotishga Ruxsat
                      <span class="form-check-sign">
                          <span class="check"></span>
                        </span>
                    </label>
                  </div>
                  
                  <br>
                  <b class="input-group no-border col-sm-7 text-danger h6">Turlari</b>
                  <div class="input-group no-border col-sm-7">

                    <div class="dropdown">
                      <ul class="dropdown-menu show" data-style="select-with-transition">
                        <li v-for="item in allTypes" v-bind:key="item.id">
                          <a class="dropdown-item colo" v-if="item.parentId === 0"  href="#">{{ item.name }}</a>
                        </li>
                      </ul>
                    </div>

                    <input @keyup="searchData()" v-model="query" type="text" value="" class="form-control" placeholder="Qidirish...">
                  </div>






                </form>
              </div>





              <div class="card-footer justify-content-center">
                <button type="submit" class="btn btn-fill btn-rose">
                  <i class="material-icons">arrow_back_ios</i>Maxsulotlarga</button>
                <button type="submit" class="btn btn-fill btn-success">
                  <i class="material-icons">add_box</i> Saqlash</button>
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
      type1: null,
      type2: null,
      realPrice: null,
      sellPrice: null,
      soni: 1,
      marketId: 0,
      valyuta: "$",
      allTypes:[],
      parentId:null,
      type1Select:null
    }
  },
  async created() {
    const typesReq = await axios.get('/types/all')
    console.log(typesReq.data)
    this.allTypes = typesReq.data;
  }
}
</script>

<style scoped>



</style>
