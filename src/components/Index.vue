<template>
  <n-layout class="windowsHeight">
    <n-layout position="absolute" style="top: 0; bottom: 97px" has-sider>
      <n-layout-sider
          content-style="padding: 24px;"
          :native-scrollbar="false"
          bordered
      >
        <Sidebar :control="change"/>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <n-dropdown
            :options="options"
            @select="dropdown"
        >
          <n-button
              strong
              secondary
              round
              type="primary"
              style="position: fixed; right: 30px; background-color: #daf0e4"
              v-on:click="change('login')"
          >用户名
          </n-button>
        </n-dropdown>
        <n-back-top :right="50" :bottom="140"/>
        <component
            :is="comName"
            :list-id="id"
            :create-play="createAudio"
            :create-song-list="createSongList"
            :seconds-format="secondsFormat"
            :show-list-info="showListInfo"></component>
        <router-view></router-view>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 97px" bordered>
      <n-image
          width="80"
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          preview-disabled
          style="margin-left: 20px; margin-top: 10px; margin-right: 10px; float: left"
      />
      <div style="float:left; margin-top: 25px; margin-right: 30px">
        <a href="#" style="color: black; text-decoration: none">{{ name }}</a>
        <br>
        <a href="#" style="color: black; text-decoration: none">{{ player }}</a>
      </div>
      <n-button text style="font-size: 24px;float: left; margin-top: 35px">
        <n-icon color="">
          <Heart28Regular/>
        </n-icon>
      </n-button>
      <n-button text style="font-size: 36px;float: left; margin-top: 35px;margin-left: 5%">
        <n-icon v-on:click="previousSong">
          <PlaySkipBackCircleOutline/>
        </n-icon>
      </n-button>
      <n-button text style="font-size: 48px;float: left; margin-top: 25px;margin-left: 1%">
        <n-icon v-on:click="audioPlay">
          <CaretForwardCircleOutline v-if="notPlay"/>
          <PauseCircleOutline v-else/>
        </n-icon>
      </n-button>
      <n-button text style="font-size: 36px;float: left; margin-top: 35px;margin-left: 1%">
        <n-icon v-on:click="nextSong">
          <PlaySkipForwardCircleOutline v-on:click=""/>
        </n-icon>
      </n-button>
      <n-space vertical style="width: 45%; padding-left: 1.5%; padding-top: 60px; position: relative; float: left">
        <n-slider v-model:value="progress"
                  :step="1"
                  :tooltip="true"
                  :max="parseInt(duration)"
                  @update:value="setPlayTime"
                  :format-tooltip="secondsFormat"/>
        <p style="position: absolute; top: 22px">{{ this.secondsFormat(progress) }}</p>
        <p style="position: absolute; top: 22px; right: 0">{{ this.secondsFormat(duration) }}</p>
      </n-space>
      <div style="float:right; width: 20%">
        <n-space vertical style="width: 150px; float: right; margin-right: 40px; padding-top: 42px;">
          <n-slider v-model:value="volume" :step="10" :tooltip="true" @update:value="setPlayVolume"/>
        </n-space>
        <n-button text style="font-size: 36px;float: right; margin-top: 35px;margin-left: 20px; margin-right: 20px">
          <n-icon>
            <ListCircle/>
          </n-icon>
        </n-button>
      </div>
      <audio src='{{url}}' ref="audioPlayer" @timeupdate="onPlaying"/>
    </n-layout-footer>
  </n-layout>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Login from './Login.vue'
import Main from './Main.vue'
import PlayList from './PlayList.vue'
import {defineComponent, h, ref} from 'vue'
import {NIcon} from 'naive-ui'
import {
  CaretForwardCircleOutline,
  ListCircle,
  LogOutOutline as LogoutIcon,
  PauseCircleOutline,
  Pencil as EditIcon,
  PersonCircleOutline as UserIcon,
  PlaySkipBackCircleOutline,
  PlaySkipForwardCircleOutline
} from '@vicons/ionicons5'
import 'vue3-audio-player/dist/style.css'
import {Heart28Regular} from '@vicons/fluent'
import axios from "axios";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

export default defineComponent({
  name: 'Index',
  data(props) {
    let showListInfo = (id) => {
      this.id = id
      change('playList')
    }
    let change = (componentName) => {
      console.log(componentName)
      this.comName = componentName
    }
    return {
      first: true,
      songList: [],
      songNo: 0,
      notPlay: true,
      name: "歌曲",
      player: "歌手",
      progress: ref(0),
      volume: ref(50),
      duration: ref(0),
      count: 0,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight + 'px',
      url: '',
      comName: 'Login',
      id: 514947114,
      audioPlayerDuration: ref(0),
      rightWidth: this.windowWidth - 190 + 'px',
      options: [
        {
          label: '用户资料',
          key: 'profile',
          icon: renderIcon(UserIcon),
        },
        {
          label: '编辑用户资料',
          key: 'editProfile',
          icon: renderIcon(EditIcon),
        },
        {
          label: '退出登录',
          key: 'logout',
          icon: renderIcon(LogoutIcon),
        },
      ],
      showListInfo,
      change,
      secondsFormat(sec) {
        let hour = Math.floor(sec / 3600);
        let minute = Math.floor((sec - hour * 3600) / 60);
        let second = sec - hour * 3600 - minute * 60;
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        if (second < 10) {
          second = "0" + second;
        }
        if (hour.toString() === "00") {
          return minute + ":" + second;
        }
        return hour + ":" + minute + ":" + second;
      },
      dropdown(data) {
        console.log(data)
        // change(data)
      },
    }
  },
  methods: {
    createSongList(songs) {
      this.songList = songs
      this.songNo = 0
      this.createAudio(songs[0])
    },
    nextSong() {
      if (this.songList.length === 0) return
      this.songNo++
      if (this.songNo >= this.songList.length) this.songNo = 0
      this.createAudio(this.songList[this.songNo])
    },
    previousSong() {
      if (this.songList.length === 0) return
      this.songNo--
      if (this.songNo < 0) this.songNo = this.songList.length - 1
      this.createAudio(this.songList[this.songNo])
    },
    setPlayTime(value) {
      this.$refs.audioPlayer.currentTime = value
    },
    setPlayVolume(value) {
      this.$refs.audioPlayer.volume = (value / 100)
    },
    async getSongInfo(id) {
      let that = this
      let api = "https://api.feranydev.com/cloudmusic/song/detail?ids=" + id + "&realIP=36.251.161.154"
      const res = await axios.get(api).catch((err) => {
        console.log(err)
      })
      let name = res.data.songs[0].name
      let player = res.data.songs[0].ar[0].name
      console.log(name + player)
      that.name = name
      that.player = player
    },
    createAudio(id) {
      this.getSongInfo(id)
      const {audioPlayer} = this.$refs
      audioPlayer.src = 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      audioPlayer.load()
      let playPromise = audioPlayer.play()
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // 这里就已经开始播放了
          // 播放UI会出现（如果控件显示的话）
          // 此时可以安全的暂停音视频了
          // audioPlayer.pause();
        }).catch(error => {
          // 无法自动播放
          // 显示暂停的UI
        });
      }
      if (this.first) {
        this.setEventListener(audioPlayer)
        this.first = false
      }
    },
    setEventListener(audioPlayer){
      let that = this
      audioPlayer.addEventListener("durationchange", function () {
        that.duration = ref(parseInt(audioPlayer.duration.toString()))
      });
      audioPlayer.addEventListener("timeupdate", function () {
        that.progress = ref(parseInt(audioPlayer.currentTime.toString()))
        that.duration = ref(parseInt(audioPlayer.duration.toString()))
        that.notPlay = false
      });
      audioPlayer.addEventListener("pause", function () {
        that.notPlay = true
      });
      audioPlayer.addEventListener('ended', function (){
        audioPlayer.pause();
        that.notPlay = true
        console.log('下一曲')
        that.nextSong()
      });
    },
    audioPlay() {
      if (this.$refs.audioPlayer.src === 'http://localhost:3000/%7B%7Burl%7D%7D') return
      if (this.$refs.audioPlayer.paused) {
        this.$refs.audioPlayer.play()
      } else {
        this.$refs.audioPlayer.pause()
      }
    }
  },
  components: {
    PlayList,
    Main,
    Login,
    Sidebar,
    Heart28Regular,
    PlaySkipBackCircleOutline,
    PlaySkipForwardCircleOutline,
    PauseCircleOutline,
    CaretForwardCircleOutline,
    ListCircle
  },
  setup() {
  },
  mounted() {
    const _this = this
    window.onresize = function resize() {
      _this.windowWidth = document.documentElement.clientWidth
      _this.windowHeight = document.documentElement.clientHeight + 'px'
      _this.rightWidth = _this.windowWidth - 190 + 'px'
      // this.method()
    }
  },
  created() {
  },
})
</script>

<style>
.windowsHeight {
  height: v-bind(windowHeight);
}
</style>
