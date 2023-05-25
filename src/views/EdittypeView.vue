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
              <h4 class="card-title">Maxsulot o'zgartirish</h4>
            </div>
            <div class="card-body ">
              <form method="#" action="#">
                <div class="row">
                  <label class=" col-form-label">Nomi</label>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input class="form-control" type="text" number="true" required="true" v-model="typeData.name" @keyup="nameUpperCase"/>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="card-group justify-content-between col-sm-12">
              <button type="submit" @click="$router.go(-1)" class="btn btn-round btn-rose">
                <i class="material-icons">arrow_back_ios</i>Ortga</button>
              <button @click="saveType()" class="btn btn-round btn-success">
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
  name: "EdittypeView",
  data(){
    return{
      typeId:0,
      name:'',
      typeData:[]
    }
  },

  created() {

    this.allData()
  },

  methods:{

    async saveType(){
      await axios.post('/types/update', this.typeData).then(
          this.$swal('Saqlandikuu').then(async (result) => {
            if (result.isConfirmed) {
              this.$router.go(-1)
            }
          })
      )
    },

    async allData(){
      this.typeId = this.$route.params.id
      await axios.get('/types/single/' + this.typeId).then(
          res => {
            this.typeData = res.data
          }
      )
    },

    nameUpperCase(){
      this.typeData.name = this.typeData.name.toUpperCase()
    }
  }
}
</script>

<style scoped>

</style>
