<template>
  <div v-if="all">
    <SubColumn v-if="loginIs"
               :resource="resource"
               :show-list-info="showListInfo"
               :title='private'
               style="padding-left: 20px"
    />
    <SubColumn
        v-for="(tag, index) in tags"
        :key="index"
        :list-all="listAll"
        :show-list-info="showListInfo"
        :title="tag"
        style="padding-left: 20px"
    />
  </div>
  <div v-else>
    <SubColumnAll
        :back="back"
        :show-list-info="showListInfo"
        :title="title"/>
  </div>
</template>

<script>
import SubColumn from './SubColumn.vue'
import axios from "axios";
import SubColumnAll from "./SubColumnAll.vue";
import {ref} from "vue";

export default {
  name: 'Songs',
  components: {
    SubColumnAll,
    SubColumn,
  },
  methods: {
    listAll(value) {
      this.all = false
      this.title = value
    },
    back() {
      this.all = true
      // this.title = ''
    },
    getRecommend(){
      let playlists = []
      console.log('开始')
      let api = "https://api.feranydev.com/cloudmusic/recommend/resource"
      axios.get(api, {
        withCredentials: true,
      }).then((res) => {
        let data = res.data
        console.log(res)
        if (data.code === 200) {
          let tmp = data.recommend
          for (let i = 0; i < tmp.length; i++) {
            playlists[i] = {
              id: tmp[i].id,
              coverImgUrl: tmp[i].picUrl,
              description: tmp[i].description,
              name: tmp[i].name
            }
          }
          console.log(playlists)
          this.resource = playlists
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  props: ['showListInfo', 'loginIs'],
  setup() {
    return {
      title: '',
      all: ref(true),
      private: '私人推荐',
      resource: ref([]),
      data: '1',
      tags: [
        '华语',
        '欧美',
        '小语种',
        '韩语',
        '怀旧',
        '学习',
        '夜晚',
        '运动',
        '流行',
        '摇滚',
        '轻音乐',
      ],
    }
  },
  mounted() {
    this.getRecommend()
  },
  watch: {
    loginIs: function () {
      this.getRecommend()
    }
  }
}
</script>
