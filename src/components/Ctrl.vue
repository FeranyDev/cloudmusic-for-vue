<template>
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
    <n-icon>
      <CaretForwardCircleOutline v-on:click="createAudio('https://music.163.com/song/media/outer/url?id=514947114.mp3')"/>
    </n-icon>
  </n-button>
  <n-button text style="font-size: 36px;float: left; margin-top: 35px;margin-left: 1%">
    <n-icon>
      <PlaySkipForwardCircleOutline/>
    </n-icon>
  </n-button>
  <n-space vertical style="width: 45%; padding-left: 1.5%; padding-top: 60px; position: relative; float: left">
    <n-slider v-model:value="progress" :step="1" :tooltip="true" :max="parseInt(duration)"
              :format-tooltip="secondsFormat"/>
    <p style="position: absolute; top: 22px">{{ this.secondsFormat(progress) }}</p>
    <p style="position: absolute; top: 22px; right: 0">{{ this.secondsFormat(duration) }}</p>
  </n-space>

  <div style="float:right; width: 20%">

    <n-space vertical style="width: 150px; float: right; margin-right: 40px; padding-top: 42px;">
      <n-slider v-model:value="volume" :step="10" :tooltip="true" @update:value="setAudioVolume" />
    </n-space>
    <n-button text style="font-size: 36px;float: right; margin-top: 35px;margin-left: 20px; margin-right: 20px">
      <n-icon>
        <ListCircle/>
      </n-icon>
    </n-button>

  </div>
</template>

<script>
import {ref} from 'vue'
import {Heart28Regular} from '@vicons/fluent'
import {
  PlaySkipBackCircleOutline,
  PlaySkipForwardCircleOutline,
  PauseCircleOutline,
  CaretForwardCircleOutline
} from '@vicons/ionicons5'
import {ListCircle} from '@vicons/ionicons5'

export default {
  props: [
      'audioPlay',
      'createAudio',
      'setAudioVolume',
      'audioPlayerDuration'
  ],
  name: "Ctrl",
  components: {
    Heart28Regular,
    PlaySkipBackCircleOutline,
    PlaySkipForwardCircleOutline,
    PauseCircleOutline,
    CaretForwardCircleOutline,
    ListCircle
  },
  setup(props) {
    return {
      name: "歌曲",
      player: "歌手",
      progress: ref(0),
      volume: ref(50),
      duration: ref(props.audioPlayerDuration),
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
      }
    }
  },
  methods:{
    @Prop({ type: Object }) value;
  }
}
</script>

<style scoped>

</style>
