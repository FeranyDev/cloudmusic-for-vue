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
            :show-list-info="showListInfo"></component>
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
        <n-icon>
          <PlaySkipBackCircleOutline/>
        </n-icon>
      </n-button>
      <n-button text style="font-size: 48px;float: left; margin-top: 25px;margin-left: 1%">
        <n-icon v-on:click="audioPlay">
          <CaretForwardCircleOutline v-if="notPlay" />
          <PauseCircleOutline v-else/>
        </n-icon>
      </n-button>
      <n-button text style="font-size: 36px;float: left; margin-top: 35px;margin-left: 1%">
        <n-icon>
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
    setPlayTime(value) {
      this.$refs.audioPlayer.currentTime = value
    },
    setPlayVolume(value) {
      this.$refs.audioPlayer.volume = (value / 100)
    },
    async createAudio(id) {
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
      const {audioPlayer} = this.$refs
      audioPlayer.src = 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      await audioPlayer.play()
      audioPlayer.addEventListener("durationchange", function () {
        let time = parseInt(audioPlayer.duration.toString())
        that.duration = ref(time)
        that.notPlay = false
      });
      audioPlayer.addEventListener("timeupdate", function () {
        let time = parseInt(audioPlayer.currentTime.toString())
        that.progress = ref(time)
        that.duration = ref(parseInt(audioPlayer.duration.toString()))
        that.notPlay = false
      });
      audioPlayer.addEventListener("pause", function () {
        that.notPlay = true
      });
    },
    audioPlay() {
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
    Ctrl,
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
