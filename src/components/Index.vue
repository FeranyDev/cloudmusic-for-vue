<template>
  <n-layout class="windowsHeight">
    <n-layout has-sider position="absolute" style="top: 0; bottom: 97px">
      <n-layout-sider
          :native-scrollbar="false"
          bordered
          content-style="padding: 24px;"
      >
        <Sidebar
            :control="change"
            :show-list-info="showListInfo"
            :uid="uid"/>
      </n-layout-sider>
      <n-layout :native-scrollbar="false" content-style="padding: 24px;">
        <n-dropdown
            :options="options"
            @select="dropdown"
        >
          <n-button
              round
              secondary
              strong
              style="position: fixed; right: 30px; background-color: #daf0e4"
              type="primary"
              v-on:click="loginTest"
          >{{ username }}
          </n-button>
        </n-dropdown>
        <n-back-top :bottom="140" :right="50"/>

        <n-message-provider>
        <component
            :is="comName"
            :change="change"
            :create-play="createAudio"
            :create-song-list="createSongList"
            :islogin="islogin"
            :list-id="id"
            :loginIs="loginIs"
            :lyric="lyric"
            :play="notPlay"
            :seconds-format="secondsFormat"
            :show-list-info="showListInfo"
            :text="lyricText"
            :time="progress"></component>
        <router-view></router-view>
        </n-message-provider>
      </n-layout>
    </n-layout>
    <n-layout-footer bordered position="absolute" style="height: 97px">
      <n-image
          preview-disabled
          style="margin-left: 20px; margin-top: 10px; margin-right: 10px; float: left"
          v-bind:src="iconUrl"
          width="80"
      />
      <div style="float:left; margin-top: 25px; margin-right: 30px">
        <a href="#" style="color: black; text-decoration: none">{{ name }}</a>
        <br>
        <a href="#" style="color: black; text-decoration: none">{{ player }}</a>
      </div>
      <n-button style="font-size: 24px;float: left; margin-top: 35px" text>
        <n-icon color="" v-on:click="change('lyricv')">
<!--          <Heart28Regular/>-->
          词
        </n-icon>
      </n-button>
      <n-button style="font-size: 36px;float: left; margin-top: 35px;margin-left: 5%" text>
        <n-icon v-on:click="previousSong">
          <PlaySkipBackCircleOutline/>
        </n-icon>
      </n-button>
      <n-button style="font-size: 48px;float: left; margin-top: 25px;margin-left: 1%" text>
        <n-icon v-on:click="audioPlay">
          <CaretForwardCircleOutline v-if="notPlay"/>
          <PauseCircleOutline v-else/>
        </n-icon>
      </n-button>
      <n-button style="font-size: 36px;float: left; margin-top: 35px;margin-left: 1%" text>
        <n-icon v-on:click="nextSong">
          <PlaySkipForwardCircleOutline/>
        </n-icon>
      </n-button>
      <n-space style="width: 45%; padding-left: 1.5%; padding-top: 60px; position: relative; float: left" vertical>
        <n-slider v-model:value="progress"
                  :format-tooltip="secondsFormat"
                  :max="parseInt(duration)"
                  :step="1"
                  :tooltip="true"
                  @update:value="setPlayTime"/>
        <p style="position: absolute; top: 22px">{{ this.secondsFormat(progress) }}</p>
        <p style="position: absolute; top: 22px; right: 0">{{ this.secondsFormat(duration) }}</p>
      </n-space>
      <div style="float:right; width: 20%">
        <n-space style="width: 150px; float: right; margin-right: 40px; padding-top: 42px;" vertical>
          <n-slider v-model:value="volume" :step="10" :tooltip="true" @update:value="setPlayVolume"/>
        </n-space>
        <n-button style="font-size: 36px;float: right; margin-top: 35px;margin-left: 20px; margin-right: 20px" text>
          <n-icon v-on:click="islogin">
            <ListCircle/>
          </n-icon>
        </n-button>
      </div>
      <audio ref="audioPlayer" src='{{url}}'/>
    </n-layout-footer>
  </n-layout>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Login from './Login.vue'
import Main from './Main.vue'
import PlayList from './PlayList.vue'
import Search from './Search.vue'
import Lyricv from './Lyricv.vue'
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
import axios from "axios"
import Lyric from 'lyric-parser'

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

export default defineComponent({
  name: 'Index',
  created() {
    this.islogin()
  },
  data() {
    let showListInfo = (id) => {
      this.id = ref(id)
      change('playList')
    }
    let change = (componentName) => {
      console.log(componentName)
      if (typeof componentName === typeof 0) {

      }
      this.comName = componentName
    }
    return {
      uid: 0,
      loginIs: false,
      username: '登录',
      iconUrl: ref('https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'),
      jsonLyric: null,
      lyric: null,
      lyricText: [],
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
      url: 'https://music.163.com/song/media/outer/url?id=33894312.mp3',
      comName: 'Main',
      id: ref(514947114),
      audioPlayerDuration: ref(0),
      rightWidth: this.windowWidth - 190 + 'px',
      options: [],
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
    }
  },
  methods: {
    dropdown(data) {
      switch (data) {
        case 'logout': {
          axios.get('https://api.feranydev.com/cloudmusic/logout', {
            withCredentials: true,
          }).then((res) => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.uid = 0
              this.loginIs = false
              this.username = '登录'
              this.options = []
            }
          }).catch((err) => {
            console.log(err)
          })
          break
        }
      }
    },
    loginTest() {
      console.log('是否登录' + this.loginIs)
      if (!this.loginIs) {
        this.change('login')
      }
    },
    islogin() {
      axios.get('https://api.feranydev.com/cloudmusic/login/status', {
        withCredentials: true,
      }).then((res) => {
        try {
          console.log(res)
          let data = res.data.data
          console.log(data)
          console.log(data.account)
          console.log(data.profile.nickname)
          this.loginIs = true
          this.username = data.profile.nickname
          this.uid = data.account.id
          this.options = [
            {
              label: '退出登录',
              key: 'logout',
              icon: renderIcon(LogoutIcon),
            },
          ]
        }catch (e) {
          console.log(e)
        }

      }).catch((err) => {
        console.log(err)
      })
      console.log(this.$cookies.keys());
    },
    setLrc(id) {
      let that = this
      console.log(id)
      let api = 'https://api.feranydev.com/cloudmusic/lyric?id=' + id
      axios.get(api).then((res) => {
        let regexTrim = new RegExp(/.\d\d\d]/, "g");
        let lyricStr = res.data.lrc.lyric
        let tmp = lyricStr.replace(regexTrim, '.00]')
        if (that.jsonLyric !== null) that.jsonLyric.stop()
        that.jsonLyric = new Lyric(tmp, function (obj) {
          that.lyricText = obj.txt
        })
        console.log(that.jsonLyric)
        if (that.jsonLyric !== null) that.jsonLyric.play()
      }).catch((err) => {
        console.log(err)
      })
    },
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
      let api = "https://api.feranydev.com/cloudmusic/song/detail?ids=" + id
      const res = await axios.get(api, {
        withCredentials: true,
      }).catch((err) => {
        console.log(err)
      })
      let name = res.data.songs[0].name
      let player = res.data.songs[0].ar[0].name
      let url = res.data.songs[0].al.picUrl
      console.log(name + player)
      that.name = name
      that.player = player
      that.iconUrl = url
    },
    createAudio(id) {
      this.getSongInfo(id)
      this.setLrc(id)
      console.log(id)
      const {audioPlayer} = this.$refs
      audioPlayer.src = 'https://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      audioPlayer.load()
      let playPromise = audioPlayer.play()
      if (playPromise !== undefined) {
        playPromise.then(_ => {
        }).catch(error => {
          console.log(error)
        });
      }
      if (this.first) {
        this.setEventListener(audioPlayer)
        this.first = false
      }
    },
    setEventListener(audioPlayer) {
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
        if (that.jsonLyric !== null) that.jsonLyric.togglePlay()
      });
      audioPlayer.addEventListener("play", function () {
        that.notPlay = false
        if (that.jsonLyric !== null) that.jsonLyric.play()
      });
      audioPlayer.addEventListener('ended', function () {
        audioPlayer.pause();
        that.notPlay = true
        // that.jsonLyric = null
        that.jsonLyric.stop()
        console.log('结束')
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
    Lyricv,
    Search,
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
  mounted() {
    const _this = this
    window.onresize = function resize() {
      _this.windowWidth = document.documentElement.clientWidth
      _this.windowHeight = document.documentElement.clientHeight + 'px'
      _this.rightWidth = _this.windowWidth - 190 + 'px'
      // this.method()
    }
  },
  watch: {
    progress: async function (time, old) {
      this.jsonLyric.seek(time * 1000)
    }
  }
})
</script>

<style>
.windowsHeight {
  height: v-bind(windowHeight);
}
</style>
