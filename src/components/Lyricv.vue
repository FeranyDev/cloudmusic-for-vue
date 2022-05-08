<template>
  <n-gradient-text v-cloak size="48" style="float: bottom" type="error">{{ text }}</n-gradient-text>
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
  components: {},

  data() {
    return {}
  },
}
</script>
<style>
[v-cloak] {
  display: none !important;
}

</style>
