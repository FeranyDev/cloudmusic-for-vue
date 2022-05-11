<template>
  <Songs :show-list-info="showListInfo" :login-is="loginIs"/>
</template>

<script>
import Songs from "./Songs.vue";

export default {
  name: 'Main',
  components: {Songs},
  props: ['showListInfo', 'loginIs'],
}
</script>
