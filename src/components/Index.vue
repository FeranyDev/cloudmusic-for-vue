<template>
  <div style="height: 850px">
    <div class="left">
      <Menu/>
    </div>
    <div class="right">
    </div>
  </div>
  <div class="foot">
    <Ctrl style="float: left;"/>
  </div>
</template>

<script>
import Menu from './Menu.vue';
import Ctrl from "./Ctrl.vue";

export default {
  name: "Index",
  data() {
    return {
      count: 0
    }
  },
  components: {
    Ctrl,
    Menu
  }
}
</script>

<style>
.left{
  width: 10%;
  height: 850px;
  background-color: azure;
  float: left;
}
.right{
  width: 90%;
  height: 850px;
  background-color: cornsilk;
  float: right;
}
.foot{
  width: 100%;
  height: 97px;
  background-color: aliceblue;
  float: bottom;
}
</style>
