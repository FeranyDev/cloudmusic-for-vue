<template>
  <div class="root">
    <div class="header">
      <img v-bind:src="url" alt="" style="width: 240px; float: left; margin-top: 40px">
      <div style="float: left; margin-left: 40px; margin-top: 60px">
        <p style="font-size: 80px;">歌单名称</p>
        <p style="float: left"> 简介</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "PlayList",
  setup() {
    return {
      url: "https://dailymix-images.scdn.co/v2/img/ab67616d0000b27351cca9834691e3db727c76a5/1/zh/large"
    }
  }
}
</script>

<style scoped>
*{
  line-height: 0;
}
.header{
  width: 100%;
}

</style>
