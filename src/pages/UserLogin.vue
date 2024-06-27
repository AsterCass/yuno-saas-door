<template>
  <q-layout view="lHr LpR fff" class="astercasc-background">
    <q-img class="fixed" width="100%" height="100%" position="50% 58%" style="z-index: -1"
           fit="cover" :src="require('@/assets/img/login.jpg')"
           :placeholder-src="require('@/assets/img/login-dim.jpg')">
    </q-img>
    <div class="column fixed full-height full-width">
      <div class="col-1 column justify-center">
      </div>
      <div class="col-10 column justify-center">
        <div class="row justify-center">
          <div v-if="showLogin" class="animated animate__fadeInUp
          animated_duration_15  astercasc-login-card column justify-between">

            <div>
              <div class="row justify-center">
                <div class="astercasc-login-title row justify-center items-center">
                  YunoSaas系统登录
                </div>
              </div>


              <div class="row justify-center items-center">
                <q-input v-model="tenantId" class="col-9 q-ma-xs"
                         color="grey" hide-bottom-space borderless
                         placeholder="请输入租户账号"
                         :input-style="{fontSize: '.85rem', color:'#333', height: '2.8rem', borderRadius: '.8rem',
                         border: '2.5px solid #888', backgroundColor:'#eee',
                          margin: '0.5rem',padding: '0 1rem'} "/>

                <q-input v-model="userPhone" class="col-9 q-ma-xs"
                         color="grey" hide-bottom-space borderless
                         placeholder="请输入用户手机号"
                         :input-style="{fontSize: '.85rem', color:'#333', height: '2.8rem', borderRadius: '.8rem',
                         border: '2.5px solid #888', backgroundColor:'#eee',
                          margin: '0.5rem',padding: '0 1rem'} "/>

                <q-input v-model="userPasswd" class="col-9 q-ma-xs"
                         color="grey" hide-bottom-space borderless
                         placeholder="请输入用户密码" type="password"
                         :input-style="{fontSize: '.85rem', color:'#333', height: '2.8rem', borderRadius: '.8rem',
                         border: '2.5px solid #888', backgroundColor:'#eee',
                          margin: '0.5rem',padding: '0 1rem'} "/>

                <div class="col-9 q-ma-sm">
                  <q-checkbox v-model="rememberLogin" checked-icon="task_alt" color="grey-10" class="text-grey-10"
                              unchecked-icon="panorama_fish_eye" label="记住密码"/>
                </div>


              </div>
            </div>


            <div>
              <div class="row justify-center">
                <q-btn class="astercasc-login-btn q-mb-lg" label="登录" @click="docLogin"/>
              </div>
              <div class="row justify-end astercasc-login-tips q-mr-md q-mb-md">
                本系统暂不支持注册
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="col-1">
        <copyright-footer half-tsp-bg/>
      </div>
    </div>
  </q-layout>
</template>


<script setup>
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import {onMounted, ref} from "vue";
import {userLogin} from "@/api/user-base";
import {notifyTopPositive} from "@/utils/global-notify";
import {getUserBehavior, saveUserBehavior} from "@/utils/store";
import {backToHome} from "@/router";
import {useRouter} from "vue-router";

const thisRouter = useRouter()

let showLogin = ref(false)
let tenantId = ref("")
let userPhone = ref("")
let userPasswd = ref("")
let rememberLogin = ref(false)

function docLogin() {
  let currentBody = {
    tenantId: tenantId.value,
    phone: userPhone.value,
    password: userPasswd.value,
  }
  //login
  userLogin(currentBody).then(data => {
        if (data && 200 === data.status) {
          notifyTopPositive("登录成功", 2000)
          if (rememberLogin.value) {
            saveUserBehavior({
              tenantId: tenantId.value,
              userPhone: userPhone.value,
              userPasswd: userPasswd.value,
              rememberLogin: rememberLogin.value,
            })
          } else {
            saveUserBehavior({tenantId: '', userPhone: '', userPasswd: '', rememberLogin: false})
          }
          backToHome(thisRouter)
        }
      }
  )
}

onMounted(() => {
  showLogin.value = true
  let savedUserBehavior = getUserBehavior()
  if (savedUserBehavior) {
    tenantId.value = savedUserBehavior.tenantId
    userPhone.value = savedUserBehavior.userPhone
    userPasswd.value = savedUserBehavior.userPasswd
    rememberLogin.value = savedUserBehavior.rememberLogin
  }
})


</script>


<style lang="scss">
@import "@/styles/theme-style";

.astercasc-background {
  height: 100%;
  margin: 0;
  overflow: hidden;
  overflow-anchor: none;
  touch-action: auto;
}

.animated_duration_15 {
  --animate-duration: 1.5s;
}

.astercasc-login-card {
  height: 30rem;
  width: 28rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: saturate(200%) blur(30px);
}


.astercasc-login-title {
  font-size: 1rem;
  height: 6rem;
  width: 20rem;
  padding: 1rem;
  text-align: center;
  transform: translateY(-25%);
  background-image: linear-gradient(180deg, rgba(32, 66, 70, .98), rgba(61, 90, 88, .98));
  color: $yuno_dark_text_color;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(64, 64, 64, .4);
  border-radius: 1rem;
}


.astercasc-login-btn {
  margin: 0;
  font-size: 1rem;
  text-align: center;
  color: $yuno_dark_text_color !important;
  min-height: 3rem !important;
  min-width: 10rem;
  background-image: linear-gradient(180deg, rgba(32, 66, 70, .98), rgba(61, 90, 88, .98)) !important;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(64, 64, 64, .4) !important;
  border-radius: .8rem !important;
}

.astercasc-login-tips {
  font-size: .75rem;
  color: $yuno_light_text-color;
}

</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>