<template>
  <div>
    <q-dialog :model-value="showNewBookUser" @hide="closeNewBookUser"
              transition-show="fade" transition-hide="fade">
      <q-card class="astercasc-dialog-frame-standard">


        <h5 class="astercasc-theme-base" style="text-align: start">
          新增活动租客
        </h5>

        <q-separator inset class="q-ma-sm half-opacity" :dark="getUserBehavior().styleModel === 'dark'"/>

        <div class="q-ma-lg">
          <div class="row items-center">
            <div class="astercasc-litter-asterisk q-mr-md">
              选房顺序
            </div>
            <q-input v-model="newBookUserData.bookUserOrder" color="grey" hide-bottom-space borderless
                     placeholder="请输入选房顺序" mask="#####" dense class="q-my-xs"
                     input-class="astercasc-input-inner-dense"
                     :input-style="{ width: '12rem'} "/>
          </div>
          <div class="row items-center">
            <div class="astercasc-litter-asterisk q-mr-md">
              姓名
            </div>
            <q-input v-model="newBookUserData.bookUserName" color="grey" hide-bottom-space borderless
                     placeholder="请输入姓名" dense class="q-my-xs"
                     input-class="astercasc-input-inner-dense"
                     :input-style="{ width: '12rem'} "/>
          </div>
          <div class="row items-center">
            <div class="astercasc-litter-asterisk q-mr-md">
              手机号
            </div>
            <q-input v-model="newBookUserData.bookUserPhone" color="grey" hide-bottom-space borderless
                     placeholder="请输入手机号" mask="###########" dense class="q-my-xs"
                     input-class="astercasc-input-inner-dense"
                     :input-style="{ width: '12rem'} "/>
          </div>
          <div class="row items-center">
            <div class="astercasc-litter-asterisk q-mr-md">
              身份证
            </div>
            <q-input v-model="newBookUserData.bookUserIdCard" color="grey" hide-bottom-space borderless
                     placeholder="请输入身份证" mask="#################X" dense class="q-my-xs"
                     input-class="astercasc-input-inner-dense"
                     :input-style="{ width: '12rem'} "/>
          </div>


          <div class="row justify-evenly q-mt-xl">
            <q-btn outline class="astercasc-outline-btn-margin-pri-mid" label="取消" @click="closeNewBookUser"/>
            <q-btn class="astercasc-simple-btn-margin-pri-mid" label="完成" @click="submitNewBookUser"/>
          </div>

        </div>


      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {getUserBehavior} from "@/utils/store";
import {notifyTopPositive} from "@/utils/global-notify";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify
//input
let showNewBookUser = ref(false);
let newBookUserData = ref({
  bookUserOrder: "",
  bookUserName: "",
  bookUserPhone: "",
  bookUserIdCard: "",
})

function submitNewBookUser() {
  newBookUserData.value = {}
  notifyTopPositive("新增成功", 2000, notify)
  showNewBookUser.value = false
}

function closeNewBookUser() {
  showNewBookUser.value = false
}

function showNewBookUserEvent() {
  showNewBookUser.value = true
}

onMounted(() => {
  emitter.on('showNewBookUserEvent', showNewBookUserEvent)
})

onUnmounted(() => {
  emitter.off('showNewBookUserEvent', showNewBookUserEvent)
})

</script>

<style lang="scss">
@import "@/styles/main-component-style";


</style>

<style scoped lang="scss">
@import "@/styles/main-component-style";


</style>