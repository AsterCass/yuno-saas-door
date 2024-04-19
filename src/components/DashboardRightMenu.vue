<template>
  <q-drawer v-model="showRightMenu" side="right">

    <div>

    </div>
  </q-drawer>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import {emitter} from "@/utils/bus";
import {getUserBehavior} from "@/utils/store";

let showRightMenu = ref(false);

function rightMenuDataInit() {
  let userBehavior = getUserBehavior()
  showRightMenu.value = userBehavior.rightMenuShow
}

function changeRightMenuEvent(toStatus) {
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

</style>