<template>
  <q-drawer v-model="showRightMenu" side="right">

    <q-scroll-area class="fit" style="background-color: #26A69A">
      <q-radio v-model="styleModel" checked-icon="task_alt" @click="changeStyleModel('light')"
               unchecked-icon="panorama_fish_eye" val="light" label="日光模式"/>
      <q-radio v-model="styleModel" checked-icon="task_alt" @click="changeStyleModel('dark')"
               unchecked-icon="panorama_fish_eye" val="dark" label="夜间模式"/>
    </q-scroll-area>

  </q-drawer>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import {emitter} from "@/utils/bus";
import {getUserBehavior, saveUserBehavior} from "@/utils/store";

let showRightMenu = ref(false);
let styleModel = ref('light')

function rightMenuDataInit() {
  let userBehavior = getUserBehavior()
  showRightMenu.value = userBehavior.rightMenuShow
  styleModel.value = userBehavior.styleModel

  updateWebsiteStyleModel(styleModel.value)
}

function updateWebsiteStyleModel(styleModel) {
  if (styleModel === 'light') {
    document.documentElement.classList.remove("yuno-dark-model")
    document.documentElement.classList.add("yuno-light-model")
  } else {
    document.documentElement.classList.remove("yuno-light-model")
    document.documentElement.classList.add("yuno-dark-model")
  }
}

function changeRightMenuEvent(toStatus) {
  showRightMenu.value = toStatus
}

function changeStyleModel(model) {
  updateWebsiteStyleModel(model)
  saveUserBehavior({styleModel: model})
}


onMounted(() => {
  rightMenuDataInit()
  emitter.on("changeRightMenuEvent", changeRightMenuEvent)
})

onUnmounted(() => {
  emitter.off("changeRightMenuEvent", changeRightMenuEvent)
})

</script>


<style scoped lang="scss">

</style>