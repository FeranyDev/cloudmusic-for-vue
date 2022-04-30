<template>
  <div>
    <div class="left">
      <Sidebar/>
    </div>
    <div class="right">
      <n-space vertical size="large" >
        <n-layout
            style="background-color: cornsilk"
            has-sider
            :native-scrollbar=false
            class="layout">
          <n-layout-sider
              style="background-color: cornsilk"
              width="1700"
              content-style="padding: 24px;">
            <Login v-if="false"/>
            <Main v-if="false"/>
            <PlayList/>
          </n-layout-sider>
        </n-layout>
      </n-space>
    </div>
  </div>
  <div class="foot" >
    <Ctrl style="float: left;"/>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Ctrl from "./Ctrl.vue";
import Login from "./Login.vue";
import Main from "./Main.vue";
import PlayList from "./PlayList.vue";

export default {
  name: "Index",
  data() {
    return {
      count: 0,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight - 96 + 'px',
      rightWidth: this.windowWidth - 190 + 'px',
    }
  },
  components: {
    PlayList,
    Main,
    Login,
    Ctrl,
    Sidebar
  },
  mounted() {
    const _this = this;
    window.onresize = function resize() {
      _this.windowWidth = document.documentElement.clientWidth
      _this.windowHeight = document.documentElement.clientHeight - 96 + 'px'
      _this.rightWidth = _this.windowWidth - 190 + 'px'
    }
  },
  created() {

  },
  methods:{

  }
}
</script>

<style>
.left{
  min-width: 190px;
  height: v-bind(windowHeight);
  background-color: azure;
  float: left;
}
.right{
  width: v-bind(rightWidth);
  height: v-bind(windowHeight);
  background-color: cornsilk;
  float: right;
}
.foot{
  width: 100%;
  height: 97px;
  background-color: aliceblue;
  float: bottom;
  position:fixed;
  bottom:0;
}
.layout{
  /*height: 833px;*/
  height: v-bind(windowHeight);
}
</style>
