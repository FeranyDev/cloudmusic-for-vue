<template>
  <div>

    <h2 style="float: left; margin-top: 20px; cursor: pointer;" v-on:click="back">{{ title }}</h2>
    <n-grid
        :collapsed="gridCollapsed"
        :collapsed-rows="gridCollapsedRows"
        :cols="col"
        item-responsive
        responsive="self"
    >
      <n-gi v-for="(data, index) in songListInformation" :key="index">
        <Preview :song-list-information="data" style="width: 160px" v-on:click="showListInfo(data.id)"/>
      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import Preview from "./Preview.vue";

export default {
  name: "SubColumnAll",
  props: ['title', 'showListInfo', 'back'],
  async setup(props) {
    let playlists = []
    let api =
        'https://api.feranydev.com/cloudmusic/top/playlist/highquality?cat=' +
        props.title + '&realIP=36.251.161.154'
    const res = await axios.get(api).catch((err) => {
      console.log(err)
    })
    let tmp = res.data.playlists
    for (let i = 0; i < tmp.length; i++) {
      playlists[i] = {
        id: tmp[i].id,
        coverImgUrl: tmp[i].coverImgUrl,
        description: tmp[i].description,
        name: tmp[i].name
      }
    }
    return{
      songListInformation: playlists,
      gridCollapsed: ref(true),
      gridCollapsedRows: ref(10),
      gridItemCount: ref(68),
      showSuffix: ref(true),
      classification: 'Classification',
      col: ref(
          parseInt((document.documentElement.clientWidth / 250).toString())
      ),
    }
  },
  components: {
    Preview
  },
}
</script>

<style scoped>

</style>
