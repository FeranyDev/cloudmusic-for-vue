<template>
  <div class="root">
    <!--    {{data}}-->
    <div class="header">
      <img v-bind:src="url" alt="" style="float: left; width: 240px;">
      <div style="float: left; margin-left: 40px; margin-top: 40px; width: 60%">
        <n-ellipsis style="float:left; font-size: 80px; height: 100px; line-height: 100px" tooltip="false">
          {{ data.name }}
          <!--          {{value}}-->
        </n-ellipsis>
        <n-ellipsis style="float: left; height: 60px; line-height: 30px; text-indent: 2em"
                    tooltip="false"
                    :line-clamp="2"
        > {{ data.description }}
        </n-ellipsis>
      </div>
    </div>
    <div class="control">
      <n-button text style="font-size: 70px;float: left; margin-top: 25px; margin-left: 1%">
        <n-icon v-on:click="setSongList">
          <CaretForwardCircleOutline/>
        </n-icon>
      </n-button>

      <n-button text style="font-size: 45px;float: left; margin-top: 40px; margin-left: 30px">
        <n-icon color="">
          <Heart28Regular/>
        </n-icon>
      </n-button>
    </div>
    <div class="table">
      <n-data-table
          :columns="columns"
          :data="songs"
          :pagination="pagination"
          :bordered="false"
      />
    </div>
  </div>
</template>

<script>
import {NButton} from "naive-ui";
import {CaretForwardCircleOutline} from "@vicons/ionicons5";
import {Heart28Regular} from '@vicons/fluent'
import {h} from "vue";
import axios from "axios";


export default {
  name: "PlayList",
  components: {
    CaretForwardCircleOutline,
    Heart28Regular,
  },
  created() {

  },
  props: [
    "listId",
    'createPlay',
    'createSongList',
    'secondsFormat'
  ],
  async setup(props) {
    let api = "https://api.feranydev.com/cloudmusic/playlist/detail?id=" + props.listId + "&realIP=36.251.161.154"
    let data = []
    let playlist = ''
    await axios.get(api).then((res) => {
      playlist = res.data.playlist
      let tmp = playlist.tracks
      for (let i = 0; i < tmp.length; i++) {
        let time =  props.secondsFormat(parseInt((tmp[i].dt / 1000).toString()))
        data[i] = {
          index: i,
          name: tmp[i].name, //歌名
          id: tmp[i].id,   //id
          ar: tmp[i].ar[0].name,   //作者
          dt: time,   //时长
          al: tmp[i].al,   //专辑
          picUrl: tmp[i].al.picUrl//图片
        }
      }
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
    return {
      data: playlist,
      url: playlist.coverImgUrl,
      // songs: res.data.playlist.tracks,
      songs: data,
      pagination: false,
      Cutsubstr: Cutsubstr,
      columns: createColumns({
        play(row) {
          props.createPlay(row.id)
        }
      }),
    }
  },
  methods: {
    setSongList: function () {
      let data = this.songs
      console.log(data)
      let songs = []
      for (let i = 0; i < data.length; i++) {
        songs[i] = data[i].id
      }
      console.log(songs)
      this.createSongList(songs)
    }
  },
  deactivated(){
    console.log("死了")
  }
};

function Cutsubstr(str, len) {
  if (!str || !len) {
    return '';
  }
  let build = "";
  for (let i = 0; i < str.length && len > 0; i++) {
    build += str.substr(i, 1);
    len -= str.charCodeAt(i) > 127 ? 2 : 1;
  }
  if (build.length < str.length)
    build += "...";
  return build;
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
};

// const data = [
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
//   {no: 12, title: "Champagne Supernova", length: "7:27"},
// ];
</script>

<style scoped>
* {
  line-height: 0;
}

.header {
  width: 100%;
  height: 280px;
  flex: border-box;
  margin-top: 40px
}

.control {
  width: 100%;
  height: 120px;
}

</style>
