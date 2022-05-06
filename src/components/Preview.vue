<template>
  <div class="root">
    <div class="preview">
      <img
          v-lazy="songListInformation.coverImgUrl"
          alt="封面"
          class="img"
      />
      <h4
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
      >
        {{ songListInformation.name }}
      </h4>
      <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
        {{ songListInformation.description }}
      </p>
    </div>
  </div>
</template>

<script>
await new Promise((resolve) => setTimeout(resolve, 3000))

export default {
  name: 'Preview',
  props: ['songListInformation'],
  setup() {
    return {
      title: 'title',
      data: 'data',
      url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
}

.preview {
  width: 150px;
  margin: 5px;
  background-color: antiquewhite;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
}

.img {
  width: 150px;
  border-radius: 5px;
}
</style>
