<template>
  <q-drawer v-model="showRightMenu" side="right" overlay :width="450">
    <q-scroll-area class="fit right-overlay-drawer">

      <div class="row justify-end q-mx-md q-mt-md">
        <q-icon class="cursor-pointer" size="1.5rem"
                name="close" @click="changeRightMenu(false)"/>
      </div>


      <h5 class="text-center">
        用户设置
      </h5>
      <p class="text-center half-opacity">
        Saas系统下当前用户的偏好设置
      </p>

      <q-separator inset class="q-ma-md" :dark="styleModel === 'dark'"/>

      <div class="q-mx-lg">
        <h6 style="margin-top: 1rem;">
          主题模式：
        </h6>
        <q-radio v-model="styleModel" checked-icon="task_alt"
                 @click="changeStyleModel('light')"
                 unchecked-icon="panorama_fish_eye" val="light"
                 label="日光模式" :dark="styleModel === 'dark'"/>
        <q-radio v-model="styleModel" checked-icon="task_alt"
                 @click="changeStyleModel('dark')"
                 unchecked-icon="panorama_fish_eye" val="dark"
                 label="夜间模式" :dark="styleModel === 'dark'"/>

        <h6 style="margin-top: 1rem;">
          边栏背景颜色：
        </h6>
        <q-btn v-for="(bgName, index) in sidebarBgList" :key="index"
               style="width: 3.5rem" class="q-ma-sm"
               @click="changeSidebarBg(bgName)"
               :class="generateSidebarBgClass(bgName)"/>
        <h6 style="margin-top: 1rem;">
          边栏背景：
        </h6>
        <q-btn v-for="(imgName, index) in sidebarImgList" :key="index"
               style="height: 6rem;width: 3.5rem" class="q-ma-sm"
               @click="changeSidebarImg(imgName)"
               :class="generateSidebarImgClass(imgName)"/>
        <h6 style="margin-top: 1rem;">
          边栏选中色：
        </h6>
        <q-btn v-for="(selectedColor, index) in sidebarSelectedColorList" :key="index"
               style="width: 3.5rem" class="q-ma-sm"
               @click="changeSidebarSelectedColor(selectedColor)"
               :class="generateSidebarSelectedColorClass(selectedColor)"/>
      </div>

    </q-scroll-area>

  </q-drawer>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import {emitter} from "@/utils/bus";
import {getUserBehavior, saveUserBehavior} from "@/utils/store";

const sidebarBgList = ['black', 'white', 'yellow', 'purple', 'green']
const sidebarImgList = ['', 'img1', 'img2', 'img3', 'img4']
const sidebarSelectedColorList = ['black', 'white', 'orange', 'red', 'green']

let showRightMenu = ref(false);
let styleModel = ref('light')
let sidebarBg = ref('black')
let sidebarImg = ref("img1")
let sidebarSelectedColor = ref('black')


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

function generateSidebarBgClass(imgName) {
  let retClass = ""
  if (imgName === sidebarBg.value) {
    retClass += "border-selected "
  }
  retClass += `mix-bg-${imgName} `
  return retClass;
}

function generateSidebarImgClass(imgName) {
  let retClass = ""
  if (imgName === sidebarImg.value) {
    retClass += "border-selected "
  }
  retClass += `left-switch-drawer-bg-${imgName} `
  return retClass;
}

function generateSidebarSelectedColorClass(colorName) {
  let retClass = ""
  if (colorName === sidebarSelectedColor.value) {
    retClass += "border-selected "
  }
  retClass += `left-switch-drawer-selected-color-${colorName} `
  return retClass;
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

function changeSidebarBg(toStatus) {
  emitter.emit('changeSidebarBgEvent', toStatus)
  saveUserBehavior({sidebarBg: toStatus})
  sidebarBg.value = toStatus;
}

function changeSidebarImg(toStatus) {
  emitter.emit('changeSidebarImgEvent', toStatus)
  saveUserBehavior({sidebarImg: toStatus})
  sidebarImg.value = toStatus;
}

function changeSidebarSelectedColor(toStatus) {
  emitter.emit('changeSidebarSelectedColorEvent', toStatus)
  saveUserBehavior({sidebarSelectedColor: toStatus})
  sidebarSelectedColor.value = toStatus;
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