<template>
  <q-drawer v-model="showRightMenu" side="right" overlay :width="450">
    <q-scroll-area class="fit right-overlay-drawer">

      <div class="row justify-end q-mx-md q-mt-md">
        <q-icon class="cursor-pointer" size="1.5rem"
                name="close" @click="changeRightMenu(false)"/>
      </div>


      <h3 class="text-center" :class="`astercasc-theme-${getUserBehavior().themeColor}`">
        系统设置
      </h3>
      <p class="text-center half-opacity">
        Saas系统下当前用户的偏好设置
      </p>

      <q-separator inset class="q-ma-md" :dark="styleModel === 'dark'"/>

      <div class="q-mx-lg">
        <h6 style="margin: 1rem auto 0 auto" :class="`astercasc-theme-${getUserBehavior().themeColor}`">
          主题模式：
        </h6>
        <p class="half-opacity q-mt-xl">
          夜间模式下为了不影响显示，会禁用部分渲染
        </p>
        <q-radio v-model="styleModel" checked-icon="task_alt"
                 @click="changeStyleModel('light')"
                 unchecked-icon="panorama_fish_eye" val="light"
                 :class="`astercasc-theme-${getUserBehavior().themeColor}-radio`"
                 label="日光模式" :dark="styleModel === 'dark'"/>
        <q-radio v-model="styleModel" checked-icon="task_alt"
                 @click="changeStyleModel('dark')"
                 unchecked-icon="panorama_fish_eye" val="dark"
                 :class="`astercasc-theme-${getUserBehavior().themeColor}-radio`"
                 label="夜间模式" :dark="styleModel === 'dark'"/>


        <!--        <h6 style="margin-top: 1rem;">-->
        <!--          边栏背景颜色：-->
        <!--        </h6>-->
        <!--        <div class="row">-->
        <!--          <div class="column q-ma-sm items-center" style="width: 3.5rem" v-for="(bgName, index) in sidebarBgList"-->
        <!--               :key="index">-->
        <!--            <q-btn class="full-width"-->
        <!--                   @click="changeSidebarBg(bgName)"-->
        <!--                   :class="generateSidebarBgClass(bgName)"/>-->
        <!--            <q-radio checked-icon="task_alt" v-model="sidebarBg" :val="bgName" :dark="styleModel === 'dark'"/>-->
        <!--          </div>-->
        <!--        </div>-->


        <h6 style="margin: 1rem auto 0 auto" :class="`astercasc-theme-${getUserBehavior().themeColor}`">
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
        <h6 style="margin: 1rem auto 0 auto" :class="`astercasc-theme-${getUserBehavior().themeColor}`">
          边栏背景：
        </h6>
        <p class="half-opacity q-mt-xl">
          左侧边栏半透明背景图片选择
        </p>
        <q-btn v-for="(imgName, index) in sidebarImgList" :key="index"
               style="height: 6rem;width: 3.5rem" class="q-ma-sm"
               @click="changeSidebarImg(imgName)"
               :class="generateSidebarImgClass(imgName)"/>
        <h6 style="margin: 1rem auto 0 auto" :class="`astercasc-theme-${getUserBehavior().themeColor}`">
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

        <h6 style="margin: 1rem auto 0 auto" :class="`astercasc-theme-${getUserBehavior().themeColor}`">
          边栏唯一选中：
        </h6>
        <p class="half-opacity q-mt-xl">
          左侧边栏在点击切换时，是否收起其他选中的下拉
        </p>
        <q-toggle v-model="leftFocusOne" @click="changeLeftFocusOne(leftFocusOne)"/>

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
  retClass += `astercasc-theme-${getUserBehavior().themeColor} `
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

function changeThemeColor(toStatus) {
  emitter.emit('changeThemeColorEvent', toStatus)
  saveUserBehavior({themeColor: toStatus})
  themeModel.value = toStatus;
}

function changeLeftFocusOne(toStatus) {
  emitter.emit('changeLeftFocusOneEvent', toStatus)
  saveUserBehavior({leftFocusOne: toStatus})
  leftFocusOne.value = toStatus;
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