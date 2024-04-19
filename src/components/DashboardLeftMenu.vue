<template>
  <q-drawer v-model="showLeftMenu" :mini="leftMenuMini" side="left">
  </q-drawer>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import {getUserBehavior} from "@/utils/store";
import {emitter} from "@/utils/bus";

let leftMenuMini = ref(false);
let showLeftMenu = ref(true)

function leftMenuDataInit() {
  let userBehavior = getUserBehavior()
  leftMenuMini.value = userBehavior.leftMenuMini
}

function changeLeftMiniEvent(toStatus) {
  leftMenuMini.value = toStatus
}

onMounted(() => {
  leftMenuDataInit()
  emitter.on("changeLeftMiniEvent", changeLeftMiniEvent)
})

onUnmounted(() => {
  emitter.off("changeLeftMiniEvent", changeLeftMiniEvent)
})

</script>


<style scoped lang="scss">

</style>