<template>
  <div>
    <h2 style="float: left; margin-top: 20px">{{classification}}</h2>
    <h5 style="float: right; margin-right: 50px; margin-top: 30px">查看更多</h5>
    <n-grid
        :cols="col"
        :collapsed="gridCollapsed"
        :collapsed-rows="gridCollapsedRows"
        item-responsive responsive="screen"
    >
      <n-gi
          v-for="i in gridItemCount"
          :key="i"
      >
          <Preview style="width: 160px"/>
      </n-gi>
    </n-grid>
  </div>

</template>

<script>
import Preview from "./Preview.vue";
import {ref} from "vue";
export default {
  name: "SubColumn",
  components: {Preview},
  setup() {
    return {
      gridCollapsed: ref(true),
      gridCollapsedRows: ref(1),
      gridItemCount: ref(68),
      showSuffix: ref(true),
      classification: 'Classification',
      col: ref(parseInt((document.documentElement.clientWidth / 250).toString())),
    }
  },
  mounted() {
    const _this = this;
    window.onresize = () => {
      return (() => {
        _this.col = parseInt((document.documentElement.clientWidth / 250).toString())
      })()
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
}
</style>
