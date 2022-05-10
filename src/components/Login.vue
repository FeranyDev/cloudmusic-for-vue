<template>
  <div id="login" class="login">
    <a class="log-close"><i class="icons close"></i></a>
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>
      <div class="log-logo">Welcome!</div>
      <div class="log-text"></div>
    </div>
    <div class="log-email">
      <input v-model="account" :class="'log-input' + (account===''?' log-input-empty':'')"
             placeholder="Email Or Phone" type="text">
      <input v-model="password" :class="'log-input' + (password===''?' log-input-empty':'')"
             placeholder="Password" type="password">
      <a class="log-btn" style="cursor: pointer;" @click="login">Login</a>
    </div>
    <Loading v-if="isLoging" marginTop="-30%"></Loading>
  </div>
</template>

<script>
import Loading from './Loading.vue'
import md5 from "js-md5"
import axios from "axios";
import {useMessage} from "naive-ui";

export default {
  name: 'Login',
  data() {
    const message = useMessage()
    return {
      isLoging: false,
      account: '',
      password: '',
      warning(value) {
        message.warning(value);
      },
    }
  },
  props: [
    'change'
  ],
  components: {
    Loading
  },
  methods: {
    login() {
      if (this.account !== '' && this.password !== '') {
        this.toLogin();
      }
    },
    async toLogin() {
      let that = this
      let password_md5 = md5(this.password)
      console.log(password_md5);
      this.isLoging = true;
      let api = 'https://api.feranydev.com/cloudmusic/login/cellphone'
      axios.defaults.withCredentials = true
      await axios.post(api, {
        phone: this.account,
        md5_password: password_md5,
        realIP: '36.251.161.154'
      }, {
        withCredentials: true,
      }).then((res) => {
        console.log(res.data.code);
        if (res.data.msg === '密码错误' || res.data.code === 400) {
          that.isLoging = false
          console.log('登录失败')
          that.warning("登录失败")
        }
        else {
          that.isLoging = false;
          that.change('Main')
          console.log('登录成功')
        }
      }).catch((err) => {
        that.isLoging = false
        console.log('网络错误')
        that.warning("网络错误")
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -350px;
  width: 500px;
  min-height: 555px;
  z-index: 10;
  right: 140px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 16px -5px #070707;
  box-shadow: 0px 3px 16px -5px #070707
}

.log-close {
  display: block;
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 1;
}

.log-close:hover .icons {
  transform: rotate(180deg);
}

.log-close .icons {
  opacity: 1;
  transition: all .3s
}

.log-cloud {
  background-image: url(../images/login-cloud.png);
  width: 63px;
  height: 40px;
  position: absolute;
  z-index: 1
}

.login .cloud1 {
  top: 21px;
  left: -30px;
  transform: scale(.6);
  animation: cloud1 20s linear infinite;
}

.login .cloud2 {
  top: 87px;
  right: 20px;
  animation: cloud2 19s linear infinite;
}

.login .cloud3 {
  top: 160px;
  left: 5px;
  transform: scale(.8);
  animation: cloud3 21s linear infinite;
}

.login .cloud4 {
  top: 150px;
  left: -40px;
  transform: scale(.4);
  animation: cloud4 19s linear infinite;
}

.log-bg {
  background: url(../images/login-bg.jpg);
  width: 100%;
  height: 312px;
  overflow: hidden;
}

.log-logo {
  height: 80px;
  margin: 120px auto 25px;
  text-align: center;
  color: #1fcab3;
  font-weight: bold;
  font-size: 40px;
}

.log-text {
  color: #57d4c3;
  font-size: 13px;
  text-align: center;
  margin: 0 auto;
}

.log-logo, .log-text {
  z-index: 2
}

.icons {
  background: url(../images/icons.png) no-repeat;
  display: inline-block;
}

.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}

.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}

.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 13px;
  -webkit-border-radius: 5px;
  background-color: #3B5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}

.log-btn.tw {
  background-color: #13B4E9
}

.log-btn.email {
  background-color: #50E3CE
}

.log-btn:hover, .log-btn:focus {
  color: #fff;
  opacity: .8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
}

.log-email .log-btn {
  background-color: #50E3CE;
  text-align: center;
}

.log-input-empty {
  border: 1px solid #f37474 !important;
}

.isloading {
  background: #d6d6d6
}

.log-btn .icons {
  margin-left: 30px;
  vertical-align: middle;
}

.log-btn .text {
  left: 95px;
  line-height: 50px;
  text-align: left;
  position: absolute;
}

.log-input {
  width: 370px;
  overflow: hidden;
  padding: 0 15px;
  font-size: 13px;
  border: 1px solid #EBEBEB;
  margin: 0 auto 15px;
  height: 48px;
  line-height: 48px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}

.log-input.warn {
  border: 1px solid #f88787
}

@-webkit-keyframes cloud1 {
  0% {
    left: 200px
  }
  100% {
    left: -130px;
  }
}

@keyframes cloud1 {
  0% {
    left: 200px
  }
  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}

@keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}

@keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}

@-webkit-keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}

@keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}

</style>
