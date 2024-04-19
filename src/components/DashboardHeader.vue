<template>
  <q-header class="top-semi-trans-header">
    <q-toolbar class="row justify-between">
      <div class="col-9 row justify-start items-center">
        <q-btn v-show="leftMenuMini" class="header-btn" @click="changeLeftMini(!leftMenuMini)"
               flat dense icon="fa-solid fa-angle-right"/>
        <q-btn v-show="!leftMenuMini" class="header-btn" @click="changeLeftMini(!leftMenuMini)"
               flat dense icon="fa-solid fa-angle-left"/>
        <q-breadcrumbs>
          <template v-slot:separator>
            <q-icon
                size="1.5em"
                name="fa-solid fa-person-walking"
            />
            <!--fa-solid fa-arrow-right-->
          </template>

          <q-breadcrumbs-el class="breadcrumbs-el-link" label="Dashboard"/>
          <q-breadcrumbs-el class="breadcrumbs-el-link" label="Move1"/>
          <q-breadcrumbs-el class="breadcrumbs-el-link" label="Move2"/>
          <q-breadcrumbs-el class="breadcrumbs-el-link-last" label="CurrentPage"/>


        </q-breadcrumbs>

      </div>


      <div class="col-3 row justify-end">
        <q-btn class="header-btn" @click="changeRightMenu(!rightMenuShow)"
               flat dense icon="fa-solid fa-gear"/>
      </div>

    </q-toolbar>


  </q-header>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getUserBehavior, saveUserBehavior} from "@/utils/store";
import {emitter} from "@/utils/bus";

let leftMenuMini = ref(false);
let rightMenuShow = ref(false)

function menuInit() {
  const userBehavior = getUserBehavior()
  leftMenuMini.value = userBehavior.leftMenuMini
  rightMenuShow.value = userBehavior.rightMenuShow
}

function changeLeftMini(toStatus) {
  if (toStatus === leftMenuMini.value) {
    return
  }
  emitter.emit('changeLeftMiniEvent', toStatus)
  saveUserBehavior({leftMenuMini: toStatus})
  leftMenuMini.value = toStatus
}

function changeRightMenu(toStatus) {
  if (toStatus === rightMenuShow.value) {
    return
  }
  emitter.emit('changeRightMenuEvent', toStatus)
  saveUserBehavior({rightMenuShow: toStatus})
  rightMenuShow.value = toStatus
}

onMounted(() => {
  menuInit();
})

</script>


<style scoped lang="scss">
@import "@/styles/main-style";

</style>