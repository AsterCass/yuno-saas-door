<template>
  <div>
    <q-dialog :model-value="showImportBookUser" @hide="closeImportBookUser"
              transition-show="fade" transition-hide="fade">
      <q-card class="astercasc-dialog-frame-standard">

        <h5 class="astercasc-theme-base" style="text-align: start">
          导入活动租客
        </h5>

        <q-separator inset class="q-ma-sm half-opacity" :dark="getUserBehavior().styleModel === 'dark'"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <q-btn outline class="astercasc-outline-btn-margin-pri-mid" label="下载导入模板"/>

          <div class="q-ma-md"/>

          <q-file class="q-ma-md astercasc-input-inner-file" v-model="importUserData" borderless
                  accept=".xls,.xlsx" max-file-size="512000" label-slot clearable
                  @rejected="notifyTopWarning('文件不满足条件，请重新上传', 3000, notify)"
                  style=" width: 30rem; height: 18rem;">
            <template v-slot:label>
              <div class="row" style="margin-top: 5rem;">
                <div>
                  将文件拖到此处，或点击上传，仅支持xls、xlsx格式
                </div>
                <ul>
                  <li>
                    文件大小不得超过5MB
                  </li>
                  <li>
                    文件中数据不能超过3000行
                  </li>
                </ul>
              </div>
            </template>
            <template v-slot:default>
              <div style="height: 18rem; width: 30rem;"/>
            </template>
          </q-file>

          <div class="row justify-center q-mt-md">
            <q-btn class="astercasc-simple-btn-margin-pri-mid" label="提交" @click="closeImportBookUser"/>
          </div>


        </div>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";
import {notifyTopWarning} from "@/utils/global-notify";
import {getUserBehavior} from "@/utils/store";

const notify = useQuasar().notify

let showImportBookUser = ref(false);
let importUserData = ref(null)

function closeImportBookUser() {
  showImportBookUser.value = false
}

function showSaasImportUserEvent() {
  showImportBookUser.value = true
}

onMounted(() => {
  emitter.on('showSaasImportUserEvent', showSaasImportUserEvent)
})

onUnmounted(() => {
  emitter.off('showSaasImportUserEvent', showSaasImportUserEvent)
})

</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>