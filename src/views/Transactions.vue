<template>
<div class="content">
  <div class="content ">
    <div class="container">
      <div class="row justify-content-center">

        <div class="card col-md-7" v-for="items in sells" :key="items.id">
          <div class="card-header">{{ items.user }} :: <span class="text-right"> {{ items.sellDate }} </span></div>
          Mahsulotlar soni: {{ items.soni }}
          <span>-------------------------------------------------</span>
          <div v-for="item in sold" :key="item.id">
            <span v-if="item.transactionId === items.id">{{ item.name }} : {{ item.count }}x : {{ item.price }} {{ item.valyuta }}</span>
          </div>
          <span>-------------------------------------------------</span>
          Summa: {{ withTab(items.summa) }}
          <br>
          Note: {{ items.note }}
          <div class="card-footer">
            <a href="javascript:void(0)" ><i class="material-icons">print</i></a>
            <a @click="deleteTransaction(items.id)" href="javascript:void(0)" ><i class="material-icons">close</i></a>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import axios from "axios";
import numeral from "numeral";

export default {
  name: "Transactions",
  data(){
    return{
      sold:[],
      sells:[],
    }
  },

  async created(){
    document.title = 'Cheklar | Market App'
    await axios.get('/products/sold').then(
        res => {
          if (res.data === 'NotAccepted'){
            this.$router.replace('/')
          }
          this.sold = res.data
        }
    );
    await axios.get('/products/sells').then(
        res => {
          if (res.data === 'NotAccepted'){
            this.$router.replace('/')
          }
          this.sells = res.data
          this.sells = this.sells.reverse()
        }
    )
  },

  methods:{

    withTab(n){
      return numeral(n).format('0,0')
    },

    async deleteTransaction(id) {
      let res = await axios.get('/products/delete/transaction/' + id)
      console.log(res.data)
      if (res.data === "Deleted!"){
        await axios.get('/products/sold').then(
            res => {
              if (res.data === 'NotAccepted'){
                this.$router.replace('/')
              }
              this.sold = res.data
            }
        );
        await axios.get('/products/sells').then(
            res => {
              if (res.data === 'NotAccepted'){
                this.$router.replace('/')
              }
              this.sells = res.data
              this.sells = this.sells.reverse()
            }
        )
      }
    }
  }
}
</script>

<style scoped>

</style>
