<template>
  <n-gradient-text size="48" type="error" style="float: bottom" v-cloak>{{ text }}</n-gradient-text>
</template>

<script>
import {ref} from "vue";


export default {
  name: 'Lyricv',
  props: [
    'lyric',
    'time',
    'id',
    'text'
  ],
  components: {
  },

  data() {
    return {
    }
  },
}
</script>
<style>
[v-cloak] {
  display: none !important;
}

</style>
