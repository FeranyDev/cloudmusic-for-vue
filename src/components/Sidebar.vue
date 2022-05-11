<template>
  <n-menu
      v-model:value="activeKey"
      :indent="12"
      :options="menuOptions"
      :root-indent="36"
      @update:value="control"
  />
  <hr>
  <n-menu
      v-model:value="activeKey"
      :indent="12"
      :options="collection"
      :root-indent="36"
      @update:value="showListInfo"
  />
</template>

<script>
import {defineComponent, h, ref} from 'vue'
import {NEllipsis, NIcon} from 'naive-ui'
import {
  BookOutline as BookIcon, ListOutline, SearchOutline
} from '@vicons/ionicons5'
import axios from "axios";

function renderIcon(icon) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

function menu(key, item) {
  console.log(key)
  this.control(key)
}


const menuOptions = [
  {
    label: '主页',
    key: 'main',
    icon: renderIcon(BookIcon)
  },
  {
    label: '搜索',
    key: 'search',
    icon: renderIcon(SearchOutline)
  }
]


export default defineComponent({
  name: "sidebar",
  props: [
    "control",
    'uid',
    'showListInfo'
  ],
  setup() {
    return {
      menu: menu,
      activeKey: ref(null),
      menuOptions,
      collection: ref([])
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      let collection = []
      let api = 'https://api.feranydev.com/cloudmusic/user/playlist?uid=' + this.uid
      axios.get(api, {
        withCredentials: true,
      }).then((res) => {
        let data = res.data
        if (data.code === 200) {
          let tmp = data.playlist
          for (let i = 0; i < tmp.length; i++) {
            collection[i] = {
              // label: tmp[i].name,
              label: () => h(NEllipsis, null, {default: () => tmp[i].name}),
              key: tmp[i].id,
              icon: renderIcon(ListOutline)
            }
          }
        }
        console.log(collection);
        this.collection = collection
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    uid: function () {
      this.update()
    }
  }
})
</script>
