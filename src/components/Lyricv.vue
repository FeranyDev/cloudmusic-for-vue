<template>
  <n-gradient-text v-cloak size="48" style="float: bottom" type="error">{{ text }}</n-gradient-text>
  <br>
  <!--  <img class="img01" src="/src/assets/cd.png" alt="CD" height="700">-->
  <img :class="{'cilcle' : !play}" alt="CD" src="/src/assets/cd.png" width="700" @click="music">
</template>

<script>

export default {
  name: 'Lyricv',
  props: [
    'lyric',
    'time',
    'id',
    'text',
    'play'
  ],
  components: {},
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>
<style>
[v-cloak] {
  display: none !important;
}

.img01 {
  display: block;
  animation: rotate 6s linear infinite;
  margin: 0 auto;
}


.cilcle {
  animation: myfirst 8s infinite linear;
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#music > img {
  width: 100%;
  height: 100%;
}


@keyframes rotate {
  0% {
    transform: rotateZ(0deg); /*从0度开始*/
  }
  100% {
    transform: rotateZ(360deg); /*360度结束*/
  }
}


</style>
