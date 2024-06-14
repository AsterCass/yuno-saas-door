<template>
  <q-layout view="lHr LpR fff">

    <DashboardHeader/>
    <DashboardLeftMenu/>
    <DashboardRightMenu/>

    <q-page-container>

      <div class="q-my-xl q-mr-md">

        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
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

.fade-enter-from {
  opacity: 0;
  transform: scale(.95);
}

.fade-enter-active {
  transition: all .5s ease;
}

.fade-leave-active {
  transition: all .5s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(.95);
}


</style>