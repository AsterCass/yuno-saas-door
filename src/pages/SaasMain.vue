<template>
  <q-layout view="lHr LpR fff">

    <DashboardHeader/>
    <DashboardLeftMenu/>
    <DashboardRightMenu/>

    <q-page-container>
      <div class="q-my-xl q-mr-md">
        <router-view/>
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

let globalData = ref(null)

function screenEventHandler() {
  let isThisMiniScreen = isMiniScreenMethod()
  if (isThisMiniScreen !== globalData.value.isMiniScreen) {
    globalData.value.isMiniScreen = isThisMiniScreen
  }
}


onMounted(() => {
  //添加监控屏幕改变事件
  globalData.value = inject('globalData');
  screenEventHandler()
  window.addEventListener("resize", screenEventHandler);
})

onUnmounted(() => {
  //删除屏幕改变事件
  window.removeEventListener("resize", screenEventHandler);
})
</script>

<style scoped lang="scss">

</style>