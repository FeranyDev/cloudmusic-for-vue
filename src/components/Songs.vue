<template>
  <SubColumn
      v-for="(tag, index) in tags"
      :key="index"
      style="padding-left: 20px"
      :title="tag"
      :show-list-info="showListInfo"
  />
</template>

<script>
import SubColumn from './SubColumn.vue'

export default {
  name: 'Songs',
  components: {
    SubColumn,
  },
  props: ['showListInfo'],
  setup() {
    return {
      data: '1',
      tags: [
        // '华语',
        // '欧美',
        // '小语种',
        // '韩语',
        // '怀旧',
        '学习',
        // '夜晚',
        // '运动',
        // '流行',
        // '摇滚',
        // '轻音乐',
      ],
    }
  },
}
</script>
