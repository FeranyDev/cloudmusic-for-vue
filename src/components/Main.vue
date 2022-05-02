<template>
  <Suspense>
    <template #default>
      <Songs />
    </template>
    <template #fallback>loading...</template>
  </Suspense>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const Songs = defineAsyncComponent(() => import('./Songs.vue'))

export default {
  name: 'Main',
  components: { Songs },
}
</script>
