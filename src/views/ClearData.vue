<template>
<div>
  <button class="btn btn-danger" @click="clearStore()">Clear</button>
</div>
</template>

<script>
export default {
  name: "ClearData",
  methods:{
    clearStore(){
      localStorage.clear()
    }
  }

}
</script>

<style scoped>

</style>
