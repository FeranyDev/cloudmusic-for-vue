<template>
  <div>
    <Suspense>
      <template #default>
        <SubColumn
            v-for="(tag, index) in tags"
            :key="index"
            style="padding-left: 20px"
            :title="tag"/>
        <!--    <SubColumn style="padding-left: 20px" :title="data" />-->
      </template>
      <template #fallback>loading...</template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const SubColumn = defineAsyncComponent(() => import('./SubColumn.vue'));

// import SubColumn from "./SubColumn.vue";
import axios from "axios";

export default {
  name: "Main",
  components: {SubColumn},
  setup() {
    return {
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
  created() {

  },
  mounted() {

  }
}

</script>

<style scoped>

[v-cloak] {
  display: none;
}

</style>
