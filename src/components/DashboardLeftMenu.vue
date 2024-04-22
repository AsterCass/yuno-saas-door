<template>
  <q-drawer class="row justify-center items-center"
            v-model="showLeftMenu" :mini="leftMenuMini" side="left">

    <div class="left-switch-drawer">
      <q-scroll-area class="fit">
        <p v-for="n in 20" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
          dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
          commodi perferendis voluptate?
        </p>
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
@import "@/styles/main-style";

</style>