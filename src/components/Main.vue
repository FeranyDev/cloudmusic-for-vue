<template>
  <!--  <Suspense>-->
  <!--    <template #default>-->
  <Songs :show-list-info="showListInfo"/>
  <!--      <PlayList/>-->
  <!--    </template>-->
  <!--    <template #fallback>loading...</template>-->
  <!--  </Suspense>-->
</template>

<script>
import {defineAsyncComponent} from 'vue'
import Songs from "./Songs.vue";

// const PlayList = defineAsyncComponent(() => import( "./PlayList.vue"))
// const Songs = defineAsyncComponent(() => import('./Songs.vue'))

export default {
  name: 'Main',
  components: {Songs},
  props:['showListInfo'],
}
</script>
