<template>
  <div>
    <q-dialog :model-value="showDialogJudgment" @hide="closeImportBookUser"
              transition-show="fade" transition-hide="fade">
      <q-card class="astercasc-dialog-frame-standard">

        <h5 class="astercasc-theme-base" style="text-align: start">
          {{ dialogJudgmentData.title }}
        </h5>

        <q-separator inset class="q-ma-sm half-opacity" :dark="getUserBehavior().styleModel === 'dark'"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <div class="text-center">
            {{ dialogJudgmentData.content }}
          </div>

          <div class="row q-mt-lg q-mb-md justify-center">
            <div class="q-mx-md">
              <q-btn outline class="astercasc-outline-btn-margin-pri-mid" :label="dialogJudgmentData.falseLabel"
                     @click="callbackMethod(false)"/>
            </div>
            <div class="q-mx-md">
              <q-btn class="astercasc-simple-btn-margin-pri-mid" :label="dialogJudgmentData.trueLabel"
                     @click="callbackMethod(true)"/>
            </div>
          </div>


        </div>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {getUserBehavior} from "@/utils/store";


const props = defineProps({
  dialogJudgmentData: {
    type: Object,
    required: true,
    default: () => {
    },
  },
  callbackMethod: {
    type: Function,
    required: true,
  }
})

let showDialogJudgment = ref(false);

function closeImportBookUser() {
  showDialogJudgment.value = false
}

function showDialogJudgmentEvent(show = true) {
  showDialogJudgment.value = show;
}

onMounted(() => {
  emitter.on('showDialogJudgmentEvent', showDialogJudgmentEvent)
})

onUnmounted(() => {
  emitter.off('showDialogJudgmentEvent', showDialogJudgmentEvent)
})

</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>