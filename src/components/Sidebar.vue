<template>
  <n-menu
      v-model:value="activeKey"
      :root-indent="36"
      :indent="12"
      :options="menuOptions"
  />
</template>

<script>
import { defineComponent, h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: '且听风吟',
    key: 'key1',
    icon: renderIcon(BookIcon)
  },
  {
    label: '且听风吟',
    key: 'key2',
    icon: renderIcon(BookIcon)
  },
  {
    label: '且听风吟',
    key: 'key3',
    icon: renderIcon(BookIcon)
  },
  {
    label: '且听风吟',
    key: 'key4',
    icon: renderIcon(BookIcon)
  }
]

export default defineComponent({
  name: "sidebar",
  setup () {
    return {
      activeKey: ref(null),
      menuOptions
    }
  }
})
</script>
