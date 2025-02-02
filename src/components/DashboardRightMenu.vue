<template>
  <q-drawer v-model="showRightMenu" side="right" overlay :width="450">
    <q-scroll-area class="fit right-overlay-drawer">

      <div class="row justify-end q-mx-md q-mt-md">
        <q-icon class="cursor-pointer" size="1.5rem"
                name="close" @click="changeRightMenu(false)"/>
      </div>


      <h3 class="text-center astercasc-theme-base">
        系统设置
      </h3>
      <p class="text-center half-opacity">
        Saas系统下当前用户的偏好设置
      </p>

      <q-separator inset class="q-ma-md" :dark="styleModel === 'dark'"/>

      <div class="q-mx-lg">
        <h6 style="margin: 1rem auto 0 auto" class="astercasc-theme-base">
          主题模式：
        </h6>
        <p class="half-opacity q-mt-xl">
          夜间模式下为了不影响显示，会禁用部分渲染
        </p>
        <q-radio v-model="styleModel" checked-icon="task_alt"
                 @click="changeStyleModel('light')"
                 unchecked-icon="panorama_fish_eye" val="light"
                 class="astercasc-theme-radio"
                 label="日光模式" :dark="styleModel === 'dark'"/>
        <q-radio v-model="styleModel" checked-icon="task_alt"
                 @click="changeStyleModel('dark')"
                 unchecked-icon="panorama_fish_eye" val="dark"
                 class="astercasc-theme-radio"
                 label="夜间模式" :dark="styleModel === 'dark'"/>

        <h6 style="margin: 1rem auto 0 auto" class="astercasc-theme-base">
          边栏背景颜色：
        </h6>
        <p class="half-opacity q-mt-xl">
          左侧边栏半透明背景颜色选择
        </p>
        <q-btn v-for="(bgName, index) in sidebarBgList" :key="index"
               style="width: 3.5rem" class="q-ma-sm"
               @click="changeSidebarBg(bgName)"
               :class="generateSidebarBgClass(bgName)">
          <q-icon :name="bgName === sidebarBg ? 'check' : '' "/>
        </q-btn>
        <h6 style="margin: 1rem auto 0 auto" class="astercasc-theme-base">
          边栏背景：
        </h6>
        <p class="half-opacity q-mt-xl">
          左侧边栏半透明背景图片选择
        </p>
        <q-btn v-for="(imgName, index) in sidebarImgList" :key="index"
               style="height: 6rem;width: 3.5rem" class="q-ma-sm"
               @click="changeSidebarImg(imgName)"
               :class="generateSidebarImgClass(imgName)"/>
        <h6 style="margin: 1rem auto 0 auto" class="astercasc-theme-base">
          主题颜色：
        </h6>
        <p class="half-opacity q-mt-xl">
          用户偏好主题色，夜间模式半渲染
        </p>
        <q-btn v-for="(themeColor, index) in themeStyleList" :key="index"
               style="width: 3.5rem" class="q-ma-sm"
               @click="changeThemeColor(themeColor)"
               :class="generateThemeColorClass(themeColor)">
          <q-icon :name="themeColor === themeModel ? 'check' : '' "/>
        </q-btn>

        <h6 style="margin: 1rem auto 0 auto" class="astercasc-theme-base">
          边栏唯一选中：
        </h6>
        <p class="half-opacity q-mt-xl">
          左侧边栏在点击切换时，是否收起其他选中的下拉
        </p>
        <q-toggle v-model="leftFocusOne" class="astercasc-theme-toggle"
                  @click="changeLeftFocusOne(leftFocusOne)"/>

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
const themeStyleList = ['black', 'green', 'blue', 'orange']

let showRightMenu = ref(false);
let styleModel = ref('light')
let sidebarBg = ref('black')
let sidebarImg = ref("img1")
let themeModel = ref('black')
let leftFocusOne = ref(false)


function rightMenuDataInit() {
  let userBehavior = getUserBehavior()
  showRightMenu.value = userBehavior.rightMenuShow
  sidebarBg.value = userBehavior.sidebarBg
  sidebarImg.value = userBehavior.sidebarImg
  styleModel.value = userBehavior.styleModel
  themeModel.value = userBehavior.themeColor
  leftFocusOne.value = userBehavior.leftFocusOne

  updateWebsiteStyleModel(styleModel.value)
  updateWebsiteThemeModel(themeModel.value)
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

function updateWebsiteThemeModel(themeModel) {
  document.documentElement.classList.remove("astercasc-theme-black")
  document.documentElement.classList.remove("astercasc-theme-green")
  document.documentElement.classList.remove("astercasc-theme-blue")
  document.documentElement.classList.remove("astercasc-theme-orange")
  if (themeModel === 'black') {
    document.documentElement.classList.add("astercasc-theme-black")
  }
  if (themeModel === 'green') {
    document.documentElement.classList.add("astercasc-theme-green")
  }
  if (themeModel === 'blue') {
    document.documentElement.classList.add("astercasc-theme-blue")
  }
  if (themeModel === 'orange') {
    document.documentElement.classList.add("astercasc-theme-orange")
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
  retClass += "astercasc-theme-base "
  return retClass;
}

function generateThemeColorClass(colorName) {
  let retClass = ""
  if (colorName === themeModel.value) {
    retClass += "border-selected "
  }
  retClass += `astercasc-theme-${colorName}-doc `
  return retClass;
}

function changeRightMenuEvent(toStatus) {
  showRightMenu.value = toStatus
}

function changeStyleModel(model) {
  updateWebsiteStyleModel(model)
  saveUserBehavior({styleModel: model})
  styleModel.value = model
  //suggestion config auto enable
  changeSidebarBg("black")
  changeThemeColor("black")

  emitter.emit('changeStyleModelEvent', model)
}

function changeRightMenu(toStatus) {
  saveUserBehavior({rightMenuShow: toStatus})
  showRightMenu.value = toStatus

  emitter.emit('changeRightMenuEvent', toStatus)
}

function changeSidebarBg(toStatus) {
  saveUserBehavior({sidebarBg: toStatus})
  sidebarBg.value = toStatus;

  emitter.emit('changeSidebarBgEvent', toStatus)
}

function changeSidebarImg(toStatus) {
  saveUserBehavior({sidebarImg: toStatus})
  sidebarImg.value = toStatus;

  emitter.emit('changeSidebarImgEvent', toStatus)
}

function changeThemeColor(toStatus) {
  updateWebsiteThemeModel(toStatus)
  saveUserBehavior({themeColor: toStatus})
  themeModel.value = toStatus;

  emitter.emit('changeThemeColorEvent', toStatus)
}

function changeLeftFocusOne(toStatus) {
  saveUserBehavior({leftFocusOne: toStatus})
  leftFocusOne.value = toStatus;

  emitter.emit('changeLeftFocusOneEvent', toStatus)
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

<style lang="scss">
@import "@/styles/theme-style";
</style>