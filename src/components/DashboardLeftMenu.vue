<template>
  <q-drawer class="row justify-center items-center" :mini-width="100" :breakpoint="1"
            v-model="showLeftMenu" :mini="leftMenuMini" side="left">

    <div class="left-switch-drawer" :class="`mix-bg-${sidebarBg} left-switch-drawer-bg-${sidebarBgImg}`">
      <q-scroll-area class="fit" style="z-index: 3">

        <div class="row items-center q-mt-sm">
          <div class="col row justify-center">
            <q-avatar size="2.5rem">
              <q-img :src="require('@/assets/img/logo.png')"/>
            </q-avatar>
          </div>
          <h3 class="col-9 no-margin" v-show="!leftMenuMini">
            Yuno Saas
          </h3>
        </div>

        <q-separator inset class="q-ma-sm half-opacity"/>

        <div class="row items-center q-mt-sm">
          <q-btn class="full-width" flat no-caps
                 style="border-radius: 1rem; padding: .5rem 0;">
            <template v-slot:default>
              <div class="col row justify-center">
                <q-avatar size="2.5rem">
                  <q-img :src="require('@/assets/img/test-avatar.jpg')"/>
                </q-avatar>
              </div>
              <h5 class="col-9 no-margin" v-show="!leftMenuMini" style="text-align: start">
                AsterCasc
              </h5>
            </template>
          </q-btn>
        </div>

        <q-separator inset class="q-ma-sm half-opacity"/>

        <div class="row items-center q-mt-sm">

          <div class="full-width" v-for="(item, index) in loadUserPageRight" :key="index">
            <q-btn class=" full-width no-padding" flat no-caps style="border-radius:1rem;"
                   :class="currentPage === `${item.pageCode}`
                   ? `astercasc-theme-bg-focus` : '' "
                   size="1.2rem" @click="routeToPage(item)">
              <template v-slot:default>
                <div class="col row justify-center">
                  <q-avatar size="1.5rem">
                    <q-icon :name="item.pageIcon"/>
                  </q-avatar>
                </div>
                <h6 v-show="!leftMenuMini" style="text-align: start;"
                    class="no-margin" :class="item.haveChild ? 'col-7': 'col-9'">
                  {{ item.pageTitle }}
                </h6>
                <q-icon v-show="!leftMenuMini && item.haveChild"
                        class="col-2" size="15px"
                        :name="item.webIsOpenChild ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-left'"/>
              </template>
            </q-btn>

            <transition name="left-switch-drawer-btn-dropdown">
              <div v-show="item.webIsOpenChild"
                   :class="`astercasc-theme-bg-op`"
                   class="left-switch-drawer-btn-first-level">
                <div class="full-width" v-for="(childItem, index) in item.child" :key="index">
                  <q-btn class=" full-width no-padding" flat no-caps
                         style="border-radius: 1rem" size="1.2rem"
                         :class="currentPage === `${childItem.pageCode}`
                                ? `astercasc-theme-bg-focus` : '' "
                         @click="routeToPage(item, childItem)">
                    <template v-slot:default>
                      <div class="col row justify-center">
                        <q-avatar size="1.3rem">
                          <q-icon :name="childItem.pageIcon"/>
                        </q-avatar>
                      </div>
                      <h6 v-show="!leftMenuMini" style="text-align: start"
                          class="no-margin" :class="childItem.haveChild ? 'col-7': 'col-9'">
                        {{ childItem.pageTitle }}
                      </h6>
                      <q-icon v-show="!leftMenuMini && childItem.haveChild" class="col-2" size="15px"
                              :name="childItem.webIsOpenChild ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-left'"/>
                    </template>
                  </q-btn>

                  <transition name="left-switch-drawer-btn-dropdown">
                    <div v-show="childItem.webIsOpenChild"
                         :class="`astercasc-theme-bg-enhance`"
                         class="left-switch-drawer-btn-second-level">
                      <div class="full-width" v-for="(dChildItem, index) in childItem.child" :key="index">

                        <q-btn class=" full-width no-padding" flat no-caps
                               :class="currentPage === `${dChildItem.pageCode}`
                               ? `astercasc-theme-bg-focus` : '' "
                               style="border-radius: 1rem;" size="1.2rem"
                               @click="routeToPage(item, childItem, dChildItem)">
                          <template v-slot:default>
                            <div class="col row justify-center">
                              <q-avatar size="1.1rem">
                                <q-icon :name="dChildItem.pageIcon"/>
                              </q-avatar>
                            </div>
                            <h6 v-show="!leftMenuMini" style="text-align: start"
                                class="no-margin" :class="dChildItem.haveChild ? 'col-7': 'col-9'">
                              {{ dChildItem.pageTitle }}
                            </h6>
                            <q-icon v-show="!leftMenuMini && dChildItem.haveChild" class="col-2" size="15px"
                                    :name="dChildItem.webIsOpenChild ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-left'"/>
                          </template>
                        </q-btn>


                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </transition>

          </div>


        </div>



      </q-scroll-area>
    </div>

  </q-drawer>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {getUserBehavior} from "@/utils/store";
import {emitter} from "@/utils/bus";
import {useRoute, useRouter} from "vue-router";
import {toSpecifyPage} from "@/router";
import {leftBarRouter} from "@/router/user-router";

//router
const thisRouter = useRouter()


let leftMenuMini = ref(false);
let showLeftMenu = ref(true)
let styleModel = ref('light')
let sidebarBg = ref('black')
let sidebarBgImg = ref('img1')
let leftFocusOne = ref(false)

let currentPage = ref('')


let loadUserPageRight = ref([])

function closeOtherExpand(item, childItem) {
  if (leftFocusOne.value && loadUserPageRight.value && loadUserPageRight.value.length > 0) {
    loadUserPageRight.value.forEach((gItem) => {
      if (item && gItem.pageCode !== item.pageCode) {
        gItem.webIsOpenChild = false
      }
      if (gItem.child && gItem.child.length > 0) {
        gItem.child.forEach((gChildItem) => {
          if (childItem && gChildItem.pageCode !== childItem.pageCode) {
            gChildItem.webIsOpenChild = false
          }
        })
      }
    })
  }
}

function routeToPage(item, childItem, dChildItem) {
  let name = ''
  if (item) {
    if (item.haveChild && !childItem) {
      item.webIsOpenChild = !item.webIsOpenChild
      closeOtherExpand(item, childItem)
      return
    }
    name = item.pageCode
  }
  if (childItem) {
    if (childItem.haveChild && !dChildItem) {
      childItem.webIsOpenChild = !childItem.webIsOpenChild
      closeOtherExpand(item, childItem)
      return
    }
    name = childItem.pageCode
  }
  if (dChildItem) {
    name = dChildItem.pageCode
  }

  currentPage.value = name
  closeOtherExpand(item, childItem)
  toSpecifyPage(thisRouter, currentPage.value)
}

function routeToAnyPage(item) {
  if (loadUserPageRight.value && loadUserPageRight.value.length > 0) {
    for (let top of loadUserPageRight.value) {
      if (top.pageCode === item) {
        currentPage.value = item
        break;
      }
      for (let sec of top.child) {
        if (sec.pageCode === item) {
          currentPage.value = item
          top.webIsOpenChild = true
          break;
        }
        for (let thi of sec.child) {
          if (thi.pageCode === item) {
            currentPage.value = item
            top.webIsOpenChild = true
            sec.webIsOpenChild = true
            break;
          }
        }
      }
    }
  }
}

function leftMenuDataInit() {
  //data
  loadUserPageRight.value = leftBarRouter
  routeToAnyPage(useRoute().name)
  //style
  let userBehavior = getUserBehavior()
  leftMenuMini.value = userBehavior.leftMenuMini
  styleModel.value = userBehavior.styleModel
  sidebarBg.value = userBehavior.sidebarBg
  sidebarBgImg.value = userBehavior.sidebarImg
  leftFocusOne.value = userBehavior.leftFocusOne
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

function changeLeftFocusOneEvent(toStatus) {
  leftFocusOne.value = toStatus
}


onMounted(() => {
  leftMenuDataInit()
  emitter.on("changeLeftMiniEvent", changeLeftMiniEvent)
  emitter.on("changeSidebarBgEvent", changeSidebarBgEvent)
  emitter.on("changeSidebarImgEvent", changeSidebarImgEvent)
  emitter.on("changeLeftFocusOneEvent", changeLeftFocusOneEvent)
})

onUnmounted(() => {
  emitter.off("changeLeftMiniEvent", changeLeftMiniEvent)
  emitter.off("changeSidebarBgEvent", changeSidebarBgEvent)
  emitter.off("changeSidebarImgEvent", changeSidebarImgEvent)
  emitter.on("changeLeftFocusOneEvent", changeLeftFocusOneEvent)
})

</script>


<style scoped lang="scss">
@import "@/styles/main-style";

.left-switch-drawer-btn-first-level {
  overflow: hidden;
  border-radius: 1rem;
  margin: 0 2.5%;
}

.left-switch-drawer-btn-second-level {
  overflow: hidden;
  border-radius: 1rem;
  margin: 0 5%;
}

.left-switch-drawer-btn-dropdown-enter-active {
  max-height: 40rem;
  transition: opacity .3s cubic-bezier(0.1, 0.9, 0.2, 0.9), max-height 0.3s cubic-bezier(0.9, 0.1, 0.9, 0.2);
}

.left-switch-drawer-btn-dropdown-leave-active {
  max-height: 40rem;
  transition: opacity 0.3s cubic-bezier(0.1, 0.9, 0.2, 0.9), max-height 0.3s cubic-bezier(0.1, 0.9, 0.2, 0.9);
}

.left-switch-drawer-btn-dropdown-enter-from,
.left-switch-drawer-btn-dropdown-leave-to {
  opacity: 0;
  max-height: 0
}

</style>