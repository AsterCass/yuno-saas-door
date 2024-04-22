<template>
  <q-drawer class="row justify-center items-center" :mini-width="100"
            v-model="showLeftMenu" :mini="leftMenuMini" side="left">

    <div class="left-switch-drawer" :class="`mix-bg-${sidebarBg} left-switch-drawer-bg-${sidebarBgImg}`">
      <q-scroll-area class="fit" style="z-index: 3">
        <p v-for="n in 20" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
          dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
          commodi perferendis voluptate?
        </p>
      </q-scroll-area>
    </div>

  </q-drawer>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import {getUserBehavior} from "@/utils/store";
import {emitter} from "@/utils/bus";

let leftMenuMini = ref(false);
let showLeftMenu = ref(true)
let sidebarBg = ref('black')
let sidebarBgImg = ref('img1')

function leftMenuDataInit() {
  let userBehavior = getUserBehavior()
  leftMenuMini.value = userBehavior.leftMenuMini
  sidebarBg.value = userBehavior.sidebarBg
  sidebarBgImg.value = userBehavior.sidebarImg
}

function changeLeftMiniEvent(toStatus) {
  leftMenuMini.value = toStatus
}

function changeSidebarBgEvent(toStatus) {
  sidebarBg.value = toStatus
}

function changeSidebarImgEvent(toStatus) {
  sidebarBgImg.value = toStatus
}


onMounted(() => {
  leftMenuDataInit()
  emitter.on("changeLeftMiniEvent", changeLeftMiniEvent)
  emitter.on("changeSidebarBgEvent", changeSidebarBgEvent)
  emitter.on("changeSidebarImgEvent", changeSidebarImgEvent)
})

onUnmounted(() => {
  emitter.off("changeLeftMiniEvent", changeLeftMiniEvent)
  emitter.off("changeSidebarBgEvent", changeSidebarBgEvent)
  emitter.off("changeSidebarImgEvent", changeSidebarImgEvent)

})

</script>


<style scoped lang="scss">
@import "@/styles/main-style";

</style>