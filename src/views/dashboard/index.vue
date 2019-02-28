<template>
  <div class="dashboard-container">
    <div class="dashboard-text">测土配方</div>
    <iframe src="http://touchcy.ccain.net/CTPF"
            style="height:866px;
            width:100%"
            frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
