<template>
  <n-layout class="windowsHeight">
    <n-layout position="absolute" style="top: 0; bottom: 97px" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
      >
        <Sidebar />
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <n-dropdown :options="options">
          <n-button
            strong
            secondary
            round
            type="primary"
            style="position: fixed; right: 30px; background-color: #daf0e4"
            >用户名
          </n-button>
        </n-dropdown>
        <n-back-top :right="50" :bottom="140" />
        <Login v-if="false" />
        <Main v-if="true" />
        <PlayList v-if="false" />
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 97px" bordered>
      <Ctrl style="float: left" />
    </n-layout-footer>
  </n-layout>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Ctrl from './Ctrl.vue'
import Login from './Login.vue'
import Main from './Main.vue'
import PlayList from './PlayList.vue'
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5'

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

export default defineComponent({
  name: 'Index',
  data() {
    return {
      count: 0,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight + 'px',
      rightWidth: this.windowWidth - 190 + 'px',
      options: [
        {
          label: '用户资料',
          key: 'profile',
          icon: renderIcon(UserIcon),
        },
        {
          label: '编辑用户资料',
          key: 'editProfile',
          icon: renderIcon(EditIcon),
        },
        {
          label: '退出登录',
          key: 'logout',
          icon: renderIcon(LogoutIcon),
        },
      ],
    }
  },
  components: {
    PlayList,
    Main,
    Login,
    Ctrl,
    Sidebar,
  },
  mounted() {
    const _this = this
    window.onresize = function resize() {
      _this.windowWidth = document.documentElement.clientWidth
      _this.windowHeight = document.documentElement.clientHeight + 'px'
      _this.rightWidth = _this.windowWidth - 190 + 'px'
    }
  },
  created() {},
  methods: {},
})
</script>

<style>
.windowsHeight {
  height: v-bind(windowHeight);
}
</style>
