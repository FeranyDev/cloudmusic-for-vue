<template>
  <div class="root">
    <div class="preview">
      <img v-bind:src="url" alt="封面" class="img"/>
      <h4>{{ title }}</h4>
      <p>{{data}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  setup(){
    return{
      title: "title",
      data: "data",
      url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
}

.preview{
  width: 150px;
  margin: 5px;
  background-color: antiquewhite;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
}
.img{
  width: 150px;
}
</style>
