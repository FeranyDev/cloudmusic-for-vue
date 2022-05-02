<template>
  <div>
    <h2 style="float: left; margin-top: 20px">{{ title }}</h2>
    <h5 style="float: right; margin-right: 50px; margin-top: 30px">查看更多</h5>

    <n-grid
      :cols="col"
      :collapsed="gridCollapsed"
      :collapsed-rows="gridCollapsedRows"
      item-responsive
      responsive="self"
    >
      <n-gi v-for="(data, index) in songListInformation" :key="index">
        <Preview :song-list-information="data" style="width: 160px" />
      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import Preview from './Preview.vue'
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'SubColumn',
  components: { Preview },
  props: ['title'],
  async setup(props) {
    let api =
      'https://api.feranydev.com/cloudmusic/top/playlist/highquality?cat=' +
      props.title
    const res = await axios.get(api).catch((err) => {
      console.log(err)
    })

    return {
      data: '',
      songListInformation: res.data.playlists,
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
