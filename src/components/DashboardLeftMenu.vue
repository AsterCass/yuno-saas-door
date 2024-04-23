<template>
  <q-drawer class="row justify-center items-center" :mini-width="100"
            v-model="showLeftMenu" :mini="leftMenuMini" side="left">

    <div class="left-switch-drawer" :class="`mix-bg-${sidebarBg} left-switch-drawer-bg-${sidebarBgImg}`">
      <q-scroll-area class="fit" style="z-index: 3">

        <div class="row items-center q-mt-sm">
          <div class="col row justify-center">
            <q-avatar size="2.5rem">
              <q-img :src="require('@/assets/img/logo.png')"/>
            </q-avatar>
          </div>
          <h5 class="col-9 no-margin" v-show="!leftMenuMini">
            Yuno Saas
          </h5>
        </div>

        <q-separator inset class="q-ma-sm half-opacity"/>

        <div class="row items-center q-mt-sm">
          <q-btn class="full-width no-padding left-switch-drawer-btn-element" flat no-caps
                 style="border-radius: 1rem">
            <template v-slot:default>
              <div class="col row justify-center">
                <q-avatar size="2.5rem">
                  <q-img :src="require('@/assets/img/test-avatar.jpg')"/>
                </q-avatar>
              </div>
              <h6 class="col-9 no-margin" v-show="!leftMenuMini" style="text-align: start">
                AsterCasc
              </h6>
            </template>
          </q-btn>
        </div>

        <q-separator inset class="q-ma-sm half-opacity"/>

        <div class="row items-center q-mt-sm">


          <q-btn v-for="(item, index) in loadUserPageRight" :key="index"
                 class=" full-width no-padding left-switch-drawer-btn-element" flat no-caps
                 style="border-radius: 1rem" size="1.2rem" @click="toggleChildShowStatus(item)">
            <template v-slot:default>
              <div class="col row justify-center">
                <q-avatar size="1.5rem">
                  <q-icon :name="item.pageIcon"/>
                </q-avatar>
              </div>
              <h6 v-show="!leftMenuMini" style="text-align: start"
                  class="no-margin" :class="item.haveChild ? 'col-7': 'col-9'">
                {{ item.pageTitle }}
              </h6>
              <q-icon v-show="!leftMenuMini && item.haveChild"
                      class="col-2" size="15px"
                      :name="item.webIsOpenChild ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-left'"/>
            </template>
          </q-btn>


        </div>


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
let styleModel = ref('light')
let sidebarBg = ref('black')
let sidebarBgImg = ref('img1')
let loadUserPageRight = ref([
  {
    pageCode: "chart_line",
    pageTitle: "Chart Line",
    pageIcon: "fa-solid fa-chart-line",
    haveChild: true,
    webIsOpenChild: false,
    child: []
  },
  {
    pageCode: "shopping_cart",
    pageTitle: "Shopping Cart",
    pageIcon: "shopping_cart",
    haveChild: true,
    webIsOpenChild: false,
    child: []
  },
  {
    pageCode: "navigation",
    pageTitle: "Navigation",
    pageIcon: "navigation",
    haveChild: true,
    webIsOpenChild: false,
    child: []
  },
  {
    pageCode: "my_location",
    pageTitle: "My Location",
    pageIcon: "my_location",
    haveChild: false,
    webIsOpenChild: false,
    child: []
  },
  {
    pageCode: "edit_location",
    pageTitle: "Edit Location",
    pageIcon: "edit_location",
    haveChild: true,
    webIsOpenChild: false,
    child: []
  },
])

function toggleChildShowStatus(item) {
  item.webIsOpenChild = !item.webIsOpenChild
}

function leftMenuDataInit() {
  let userBehavior = getUserBehavior()
  leftMenuMini.value = userBehavior.leftMenuMini
  styleModel.value = userBehavior.styleModel
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