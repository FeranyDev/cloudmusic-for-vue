<template>
  <div>
    <h2 style="float: left; margin-top: 20px">{{ title }}</h2>
    <h5 v-if="title !== '私人推荐'" style="float: right; margin-right: 50px; margin-top: 30px; cursor: pointer;" v-on:click="listAll(title)">查看更多</h5>
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
import Preview from './Preview.vue'
import {ref} from 'vue'
import axios from 'axios'

function showInfo(data) {
  console.log(data)
}

export default {
  name: 'SubColumn',
  components: {Preview},
  props: ['title', 'showListInfo', 'resource', 'listAll'],
  async setup(props) {
    let playlists = []
    if (props.resource !== undefined) {
      console.log(props.resource)
      playlists = props.resource
    }else {
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
    }
    return {
      showInfo: showInfo,
      data: '',
      songListInformation: playlists,
      gridCollapsed: ref(true),
      gridCollapsedRows: ref(1),
      gridItemCount: ref(68),
      showSuffix: ref(true),
      classification: 'Classification',
      col: ref(
          parseInt((document.documentElement.clientWidth / 250).toString())
      ),
    }
  },
  methods: {
  },
  mounted() {
    window.addEventListener(
        'resize',
        () =>
            (this.col = parseInt(
                (document.documentElement.clientWidth / 250).toString()
            ))
    )
  },
}
</script>

<style scoped>
* {
  margin: 0;
}
</style>
