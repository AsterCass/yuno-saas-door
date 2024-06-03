<template>
  <q-layout view="lHr LpR fff">

    <DashboardHeader/>
    <DashboardLeftMenu/>
    <DashboardRightMenu/>

    <q-page-container>

      <div class="q-my-xl q-mr-md">

        <router-view v-slot="{ Component, route }">
          <transition enter-active-class="animate__animated animate__slideInRight delay-half-sec during-half-sec"
                      leave-active-class="animate__animated animate__slideOutLeft during-half-sec">
            <div :key="route.name">
              <component :is="Component"></component>
            </div>
          </transition>
        </router-view>

      </div>

    </q-page-container>

    <!--    <q-footer/>-->
    <!--    <CopyrightFooter/>-->
  </q-layout>

  <!--  <CopyrightFooter/>-->

</template>

<script setup>
import DashboardHeader from "@/components/DashboardHeader.vue";
import DashboardLeftMenu from "@/components/DashboardLeftMenu.vue";
import DashboardRightMenu from "@/components/DashboardRightMenu.vue";
import {inject, onMounted, onUnmounted, ref} from "vue";
import {isMiniScreenMethod} from "@/utils/display";
import emitter from "@/utils/bus";
import {useRouter} from "vue-router";
import {toSpecifyPage} from "@/router";

let globalData = ref(null)
const thisRouter = useRouter()

function screenEventHandler() {
  let isThisMiniScreen = isMiniScreenMethod()
  if (isThisMiniScreen !== globalData.value.isMiniScreen) {
    globalData.value.isMiniScreen = isThisMiniScreen
  }
}

function yunoWebLoginEvent(isLogin) {
  if (!isLogin) {
    toSpecifyPage(thisRouter, "notLogin")
  }
}


onMounted(() => {
  //添加监控屏幕改变事件
  globalData.value = inject('globalData');
  screenEventHandler()
  window.addEventListener("resize", screenEventHandler);
  //其他事件
  emitter.on('yunoWebLoginEvent', yunoWebLoginEvent)
})

onUnmounted(() => {
  //删除屏幕改变事件
  window.removeEventListener("resize", screenEventHandler);
//其他事件
  emitter.off('yunoWebLoginEvent', yunoWebLoginEvent)
})
</script>


<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";

.delay-half-sec {
  animation-delay: 600ms;
}

.during-half-sec {
  animation-duration: 500ms;
}


</style>