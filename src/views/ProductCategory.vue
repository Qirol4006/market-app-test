<template>
<div class="content">
  <div class="content text-left" data-color="green">
    <div class="container ">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header card-header-rose card-header-icon">
              <div class="card-icon">
                <i class="material-icons">format_align_left</i>
              </div>
              <h4 class="card-title">Kategoriyalar</h4>
            </div>
            <div class="card-body ">
              <button
                  class="btn btn-round btn-info"
                  v-for="item in allTypes"
                  v-bind:key="item.id"
                  @click="secondLevel(item.id, item.name)"
              >
                <span class="pull-left">{{ item.name }}</span>
                <span class="pull-right"><i class=" material-icons">arrow_forward</i></span>
              </button>
            </div>

            <div class="card-group justify-content-center col-sm-12">
              <button type="submit" @click="$router.push('/products')" class="btn btn-round btn-rose">
                <i class="material-icons">arrow_back_ios</i>Maxsulotlarga</button>
              <button class="btn btn-round btn-success" ><i class="material-icons">edit</i> Tahrirlash</button>

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
  name: "ProductCategory",
  data(){
    return{
      allTypes:[]
    }
  },

  async created() {

    await axios.get('/types/all/0').then(
        res => {
          this.allTypes = res.data
          console.log(res.data)
        }
    )



    document.title = "Kategoriyalar | Market App"
  },

  methods:{
    secondLevel(id, name){
      this.$router.push('/category/' + id + '/' + name)
    }
  }
}
</script>

<style scoped>


</style>
