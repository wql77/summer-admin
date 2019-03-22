<template>
  <div class="app-container">
    <el-button type="primary" @click="run">启动微信</el-button>
  </div>
</template>

<script>
import { runWx } from '@/api/wx'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },

  created() {
//    this.fetchData()
  },
  methods: {
    run(){
        runWx().then(response => {
          console.log(response)
        })
    }
  }
}
</script>
