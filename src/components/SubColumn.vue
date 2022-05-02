<template>
  <div>
    <h2 style="float: left; margin-top: 20px">{{ title }}</h2>
    <h5 style="float: right; margin-right: 50px; margin-top: 30px">查看更多</h5>

    <n-grid
        :cols="col"
        :collapsed="gridCollapsed"
        :collapsed-rows="gridCollapsedRows"
        item-responsive responsive="self"
    >
      <n-gi
          v-for="(data, index) in songListInformation" :key="index">
        <Suspense>
          <template #default>
            <Preview :song-list-information=data style="width: 160px"/>
          </template>
          <template #fallback>loading...</template>
        </Suspense>
      </n-gi>
    </n-grid>

  </div>
</template>

<script>

import { defineAsyncComponent } from 'vue';
const Preview = defineAsyncComponent(() => import('./Preview.vue'));
// import Preview from "./Preview.vue";
import {ref} from "vue";
import axios from "axios";

await new Promise((resolve) => setTimeout(resolve, 3000));
export default {
  name: "SubColumn",
  components: {Preview},
  props: ['title'],
  created() {

  },
  async setup() {
    return {
      data: '',
      songListInformation: [],
      gridCollapsed: ref(true),
      gridCollapsedRows: ref(1),
      gridItemCount: ref(68),
      showSuffix: ref(true),
      classification: 'Classification',
      col: ref(parseInt((document.documentElement.clientWidth / 250).toString())),
    }
  },
  mounted() {
    window.addEventListener(
        'resize',
        () =>
            this.col = parseInt((document.documentElement.clientWidth / 250).toString())
    )
    let that = this
    // console.log("https://api.feranydev.com/cloudmusic/top/playlist/highquality?cat=" + this.title)
    let api = "https://api.feranydev.com/cloudmusic/top/playlist/highquality?cat=" + this.title;
    axios.get(api).then((res) => {
      that.songListInformation = res.data.playlists
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
}
</style>
