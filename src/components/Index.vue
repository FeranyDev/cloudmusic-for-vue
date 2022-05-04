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
        <component :is="comName" :list-id="id" :show-list-info="showListInfo"></component>
        <!--        <AudioPlayer :option="{-->
        <!--        src: 'https://www.joy666.cn/media/sky.mp3',-->
        <!--        title: 'your-audio-title',-->
        <!--        coverImage: 'https://www.joy666.cn/media/sky.png',-->
        <!--   }" />-->
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 97px" bordered>
      <Ctrl style="float: left"
            :audio-play="audioPlay"
            :create-audio="createAudio"
            :audio-player-duration="audioPlayerDuration"
            :value="audioPlayerDuration"
            :set-audio-volume="setPlayVolume"/>
      <audio src='{{url}}' ref="audioPlayer" @timeupdate="onPlaying"/>
    </n-layout-footer>
  </n-layout>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Ctrl from './Ctrl.vue'
import Login from './Login.vue'
import Main from './Main.vue'
import PlayList from './PlayList.vue'
import {h, defineComponent, ref} from 'vue'
import {NIcon} from 'naive-ui'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5'
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'
// import playList from "./PlayList";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

export default defineComponent({
  name: 'Index',
  data() {
    let showListInfo = (id) => {
      this.id = id
      change('playList')
    }
    let change = (componentName) => {
      console.log(componentName)
      this.comName = componentName
    }
    return {
      url: '',
      comName: 'Login',
      id: 514947114,
      audioPlayerDuration: ref(0),
      showListInfo,
      change,
      progress: 0,
      count: 0,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight + 'px',
      rightWidth: this.windowWidth - 190 + 'px',
      dropdown(data) {
        console.log(data)
        // change(data)
      },
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
    }
  },
  setup() {

  },
  components: {
    PlayList,
    Main,
    Login,
    Ctrl,
    Sidebar,
    AudioPlayer,
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
  methods: {
    getPlayTime(){

    },
    setPlayVolume(value) {
      this.$refs.audioPlayer.volume = (value / 100)
    },
    createAudio(url) {
      const {audioPlayer} = this.$refs;
      audioPlayer.src = url
      audioPlayer.play()
      audioPlayer.addEventListener("durationchange", function() {
        let time = audioPlayer.duration
        console.log(time)
        this.audioPlayerDuration = ref(time)
      });
    },
    audioPlay() {
      if (this.$refs.audioPlayer.paused)
        this.$refs.audioPlayer.play();
      else
        this.$refs.audioPlayer.pause();
    }
  },
})
</script>

<style>
.windowsHeight {
  height: v-bind(windowHeight);
}
</style>
