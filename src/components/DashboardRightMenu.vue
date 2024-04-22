<template>
  <q-drawer v-model="showRightMenu" side="right" overlay>


    <q-scroll-area class="fit right-overlay-drawer">

      <div class="row justify-end q-ma-sm">
        <q-btn round icon="close" flat @click="changeRightMenu(false)"/>
      </div>

      <q-radio v-model="styleModel" checked-icon="task_alt" @click="changeStyleModel('light')"
               unchecked-icon="panorama_fish_eye" val="light" label="日光模式"/>
      <q-radio v-model="styleModel" checked-icon="task_alt" @click="changeStyleModel('dark')"
               unchecked-icon="panorama_fish_eye" val="dark" label="夜间模式"/>

      <p v-for="n in 20" :key="n">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
        dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
        commodi perferendis voluptate?
      </p>

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

function changeRightMenu(toStatus) {
  emitter.emit('changeRightMenuEvent', toStatus)
  saveUserBehavior({rightMenuShow: toStatus})
  showRightMenu.value = toStatus
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
@import "@/styles/main-style";

</style>