<template>
  <n-menu
      v-model:value="activeKey"
      :root-indent="36"
      :indent="12"
      :options="menuOptions"
      @update:value="control"
  />
</template>

<script>
import {defineComponent, h, ref} from 'vue'
import {NIcon} from 'naive-ui'
import {
  BookOutline as BookIcon
} from '@vicons/ionicons5'

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
    icon: renderIcon(BookIcon)
  },
  {
    label: '功能1',
    key: 'key3',
    icon: renderIcon(BookIcon)
  },
  {
    label: '功能2',
    key: 'key4',
    icon: renderIcon(BookIcon)
  }
]


export default defineComponent({
  name: "sidebar",
  props:[
      "control"
  ],
  setup() {
    return {
      menu: menu,
      activeKey: ref(null),
      menuOptions
    }
  }
})
</script>
