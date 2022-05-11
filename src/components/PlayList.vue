<template>
  <div class="root">
    <div class="header">
      <img alt="" style="float: left; width: 240px;" v-bind:src="url">
      <div style="float: left; margin-left: 40px; margin-top: 40px; width: 60%">
        <n-ellipsis style="float:left; font-size: 80px; height: 100px; line-height: 100px" tooltip="false">
          {{ data.name }}
        </n-ellipsis>
        <n-ellipsis :line-clamp="2"
                    style="float: left; height: 60px; line-height: 30px; text-indent: 2em"
                    tooltip="false"
        > {{ data.description }}
        </n-ellipsis>
      </div>
    </div>
    <div class="control">
      <n-button style="font-size: 70px;float: left; margin-top: 25px; margin-left: 1%" text>
        <n-icon v-on:click="setSongList">
          <CaretForwardCircleOutline/>
        </n-icon>
      </n-button>

      <n-button style="font-size: 45px;float: left; margin-top: 40px; margin-left: 30px" text>
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
      />
    </div>
  </div>
</template>

<script>
import {NButton} from "naive-ui";
import {CaretForwardCircleOutline} from "@vicons/ionicons5";
import {Heart28Regular} from '@vicons/fluent'
import {h, ref} from "vue";
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
    let playlist = []
    await axios.get(api, {
      withCredentials: true,
    }).then((res) => {
      playlist = res.data.playlist
      let tmp = playlist.tracks
      for (let i = 0; i < tmp.length; i++) {
        let time = props.secondsFormat(parseInt((tmp[i].dt / 1000).toString()))
        data[i] = {
          index: i + 1,
          name: tmp[i].name,        //歌名
          id: tmp[i].id,            //id
          ar: tmp[i].ar[0].name,    //作者
          dt: time,                 //时长
          al: tmp[i].al,            //专辑
          picUrl: tmp[i].al.picUrl  //图片
        }
      }
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
    return {
      data: ref(playlist),
      url: ref(playlist.coverImgUrl),
      songs: ref(data),
      pagination: false,
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
  deactivated() {
    console.log("死了")
  },
  watch: {
    listId: async function (news, old) {
      let api = "https://api.feranydev.com/cloudmusic/playlist/detail?id=" + this.listId + "&realIP=36.251.161.154"
      let data = []
      let playlist = []
      await axios.get(api, {
        withCredentials: true,
      }).then((res) => {
        playlist = res.data.playlist
        console.log(playlist)
        let tmp = playlist.tracks
        for (let i = 0; i < tmp.length; i++) {
          let time = this.secondsFormat(parseInt((tmp[i].dt / 1000).toString()))
          data[i] = {
            index: i + 1,
            name: tmp[i].name,        //歌名
            id: tmp[i].id,            //id
            ar: tmp[i].ar[0].name,    //作者
            dt: time,                 //时长
            al: tmp[i].al,            //专辑
            picUrl: tmp[i].al.picUrl  //图片
          }
        }
        console.log(data)
        this.data = playlist
        this.url = playlist.coverImgUrl
        this.songs = data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
};

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
