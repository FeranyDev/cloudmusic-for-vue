<template>
  <n-layout style="height: border-box">
    <n-layout-header style="height: 64px;" bordered>
      <n-input type="text" placeholder="搜索" clearable round @update:value="searchSong" style="max-width: 400px; float: left"/>
    </n-layout-header>
  </n-layout>
  <div>
    <div v-if="home">

    </div>
    <div v-else>
      <div class="table">
        <n-data-table
            :columns="columns"
            :data="data"
            :pagination="pagination"
            :bordered="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {h} from "vue";
import {NButton} from "naive-ui";

export default {
  name: "Search",
  props: [
    'createPlay',
    'secondsFormat'
  ],
  data(props) {
    return {
      search: '',
      home: true,
      data: [],
      pagination: false,
      columns: createColumns({
        play(row) {
          props.createPlay(row.id)
        }
      }),
    }
  },
  methods: {
    async searchSong(value) {
      console.log(value)
      if (value  === '') return
      let api = 'https://api.feranydev.com/cloudmusic/cloudsearch?keywords=' + value
      let datas = []
      await axios.get(api, {
        withCredentials: true,
      }).then((res) => {
        console.log(res)
        console.log(res.data)
        let tmp = res.data.result.songs
        for (let i = 0; i < tmp.length; i++){
          let time =  this.secondsFormat(parseInt((tmp[i].dt / 1000).toString()))
          datas[i] = {
            index: i + 1,
            name: tmp[i].name, //歌名
            id: tmp[i].id,   //id
            ar: tmp[i].ar[0].name,   //作者
            dt: time,   //时长
            al: tmp[i].al,   //专辑
            picUrl: tmp[i].al.picUrl//图片
          }
        }
        console.log(datas)
        this.data = datas
        this.home = false
      }).catch((err) => {
        console.log(err)
      })
    }
  },
}

const createColumns = ({play}) => {
  return [
    {
      title: "#",
      key: "index"
    },
    {
      title: "Name",
      key: "name"
    },
    {
      title: "Time",
      key: "dt"
    },
    {
      title: "Player",
      key: "ar"
    },
    {
      title: "Action",
      key: "id",
      render(row) {
        return h(NButton, {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => play(row)
        }, {default: () => "Play"});
      }
    }
  ];
}
</script>

<style scoped>

</style>
