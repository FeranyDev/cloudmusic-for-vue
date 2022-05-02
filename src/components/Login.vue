<template>
  <div style="width: 500px; margin: 0 auto; padding-top: 300px">
    <n-space vertical style="width: 300px; margin: 0 auto">
      <n-input v-model:value="value" type="text" placeholder="手机号"/>
      <n-input
          type="password"
          show-password-on="mousedown"
          placeholder="密码"
      />
      <n-button type="primary">
        登录
      </n-button>
    </n-space>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "Login",
  setup() {
    return {
      value: ref(null)
    }
  }
})
</script>

<style scoped>

</style>
