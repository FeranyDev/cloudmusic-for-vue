<template>
  <Suspense>
    <template #default>
      <n-message-provider>
        <Index/>
      </n-message-provider>
    </template>
    <template #fallback>loading...</template>
  </Suspense>
</template>

<script>
import {defineAsyncComponent} from 'vue'

const Index = defineAsyncComponent(() => import( "./components/Index.vue"))

export default {
  name: 'App',
  components: {
    Index,
  },
}
</script>
