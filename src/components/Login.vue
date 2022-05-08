<template>
  <div class="login" id="login">
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
      <input type="text" placeholder="Email Or Phone"
             :class="'log-input' + (account===''?' log-input-empty':'')" v-model="account">
      <input type="password" placeholder="Password"
             :class="'log-input' + (password===''?' log-input-empty':'')" v-model="password">
      <a class="log-btn" style="cursor: pointer;" @click="login">Login</a>
    </div>
    <Loading v-if="isLoging" marginTop="-30%"></Loading>
  </div>
</template>

<script>
import Loading from './Loading.vue'
import md5 from "js-md5"
import axios from "axios";


export default {
  name: 'Login',
  data() {
    return {
      isLoging: false,
      account: '',
      password: ''
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
    //登录请求
    async toLogin() {
      let password_md5 = md5(this.password)
      console.log(password_md5);
      let loginParam = {
        phone: this.account,
        md5_password: password_md5
      }
      this.isLoging = true;

      let api = 'https://api.feranydev.com/cloudmusic/login/cellphone'
      // let api = 'https://api.feranydev.com/cloudmusic/search'
      axios.defaults.withCredentials = true
      await axios.post(api, {
        phone: this.account,
        md5_password: password_md5,
        realIP: '36.251.161.154'
        // keywords: '%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA'
      },{
        withCredentials: true,
      }).then((res) => {
        console.log(res)
        console.log(res.data.cookie)
        // this.$cookies.set("token", res.data.cookie, "1d")
        // this.$cookies.set(
        //     "test",
        //     'MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/neapi/feedback;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/eapi/feedback;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/api/feedback;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/api/feedback;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/weapi/feedback;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/weapi/feedback;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/weapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Mon, 23 May 2022 02:41:31 GMT; Path=/;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/api/clientlog;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/eapi/feedback;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/wapi/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Sun, 08 May 2022 02:41:31 GMT; Path=/;NMTID=00Onng80yEOlq8Xlk64pCBUNu_miNAAAAGAoYsi4g; Max-Age=315360000; Expires=Wed, 05 May 2032 02:41:31 GMT; Path=/;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/api/clientlog;;__csrf=b0e9a0e1a671124902150d4aef54180b; Max-Age=1296010; Expires=Mon, 23 May 2022 02:41:41 GMT; Path=/;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1486970707272; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/neapi/feedback;;MUSIC_U=c0a7edac03fb60f0d5169f87b40a3b89cf34cb06c52baf00e2f6bcf6ae64a9f6519e07624a9f0053bcadb48f122ccd159ed07cada3335d69c0f81b713f7c49be3f8cd139549a2c6ca89fe7c55eac81f3; Max-Age=1296000; Expires=Mon, 23 May 2022 02:41:31 GMT; Path=/;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/wapi/feedback;;MUSIC_A_T=1486970674844; Max-Age=2147483647; Expires=Fri, 26 May 2090 05:55:38 GMT; Path=/wapi/clientlog;',
        //     "1d",
        //       '/')
        this.isLoging = false;
        this.change('Main')
        console.log('登录成功')
      }).catch((err) => {
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
