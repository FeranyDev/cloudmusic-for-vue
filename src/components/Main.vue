<template>
  <Songs :show-list-info="showListInfo"/>
</template>

<script>
import Songs from "./Songs.vue";

export default {
  name: 'Main',
  components: {Songs},
  props:['showListInfo'],
}
</script>
