<template>

  <div class="row justify-center">
    <div class="col-6">
      <div class="astercasc-simple-quoted-title q-my-lg">
        基本信息
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          活动名称
        </div>
        <q-input v-model="newProjectData.projectName" color="grey" hide-bottom-space borderless
                 placeholder="请输入活动名称"
                 input-class="astercasc-input-inner-base"
                 :input-style="{width: '20rem'} "/>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          活动周期
        </div>
        <div class="row items-center">
          <DatetimeSelector :value="newProjectData.projectStartTime"
                            placeholder="请输入活动周期开始时间"
                            @time-change="(time)=>newProjectData.projectStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectEndTime"
                            placeholder="请输入活动周期开始时间"
                            @time-change="(time)=>newProjectData.projectEndTime = time"/>
        </div>
      </div>

      <div class="row q-my-md">

        <div>
          <div class="q-ml-sm astercasc-litter-title-asterisk">
            组队截止时间
          </div>
          <div class="row items-center">
            <DatetimeSelector :value="newProjectData.projectGroupDeadlineTime" placeholder="请输入组队截止时间"
                              @time-change="(time)=>newProjectData.projectGroupDeadlineTime = time"/>
          </div>
        </div>

        <div class="text-center" style="width: 3rem">
        </div>

        <div>
          <div class="q-ml-sm astercasc-litter-title-asterisk">
            签约截止时间
          </div>
          <div class="row items-center">
            <DatetimeSelector :value="newProjectData.projectSignDeadlineTime" placeholder="请输入签约截止时间"
                              @time-change="(time)=>newProjectData.projectSignDeadlineTime = time"/>
          </div>
        </div>


      </div>

      <div class="astercasc-simple-quoted-title q-my-lg">
        组队选房设置
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          组队选房周期
        </div>
        <div class="row items-center">
          <DatetimeSelector :value="newProjectData.projectGroupStartTime" placeholder="请输入组队选房周期开始时间"
                            @time-change="(time)=>newProjectData.projectGroupStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectGroupEndTime" placeholder="请输入组队选房周期截止时间"
                            @time-change="(time)=>newProjectData.projectGroupEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          不可组队选房时段
        </div>
        <div class="row items-center">
          <DatetimeSelector :value="newProjectData.projectNoGroupStartTime" placeholder="请输入不可组队选房时段开始时间"
                            @time-change="(time)=>newProjectData.projectNoGroupStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectNoGroupEndTime" placeholder="请输入不可组队选房时段截至时间"
                            @time-change="(time)=>newProjectData.projectNoGroupEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          组队选房间隔
        </div>
        <div class="row items-center">
          <q-input v-model="newProjectData.projectGroupInterval" color="grey" hide-bottom-space borderless
                   placeholder="请输入组队选房间隔" mask="###"
                   input-class="astercasc-input-inner-base"
                   :input-style="{ width: '12rem'} "/>
          <div style="font-size: 1rem">
            分钟
          </div>
        </div>

      </div>

      <div class="astercasc-simple-quoted-title q-my-lg">
        个人选房设置
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          个人选房周期
        </div>
        <div class="row items-center">
          <DatetimeSelector :value="newProjectData.projectPersonalStartTime" placeholder="请输入个人选房周期开始时间"
                            @time-change="(time)=>newProjectData.projectPersonalStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectPersonalEndTime" placeholder="请输入个人选房周期截止时间"
                            @time-change="(time)=>newProjectData.projectPersonalEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          不可个人选房时段
        </div>
        <div class="row items-center">
          <DatetimeSelector :value="newProjectData.projectNoPersonalStartTime"
                            placeholder="请输入不可个人选房时段开始时间"
                            @time-change="(time)=>newProjectData.projectNoPersonalStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectNoPersonalEndTime"
                            placeholder="请输入不可个人选房时段截至时间"
                            @time-change="(time)=>newProjectData.projectNoPersonalEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          个人选房间隔
        </div>
        <div class="row items-center">
          <q-input v-model="newProjectData.projectPersonalInterval" color="grey" hide-bottom-space borderless
                   placeholder="请输入个人选房间隔" mask="###"
                   input-class="astercasc-input-inner-base"
                   :input-style="{ width: '12rem'} "/>
          <div style="font-size: 1rem">
            分钟
          </div>
        </div>

      </div>

      <div class="astercasc-simple-quoted-title q-my-lg">
        验房设置
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          可验房日期
        </div>
        <div class="row items-center">
          <DatetimeSelector :value="newProjectData.projectHouseCheckStartTime" placeholder="请输入可验房日期开始时间"
                            @time-change="(time)=>newProjectData.projectHouseCheckStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectHouseCheckEndTime" placeholder="请输入可验房日期截止时间"
                            @time-change="(time)=>newProjectData.projectHouseCheckEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          可验房时段/人数
        </div>
        <div class="row items-center">
          <div>
            上午场
          </div>
          <DatetimeSelector :value="newProjectData.projectHouseCheckAmCheckStartTime" placeholder="开始时间"
                            componentWidth="10rem"
                            @time-change="(time)=>newProjectData.projectHouseCheckAmCheckStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectHouseCheckAmCheckEndTime" placeholder="结束时间"
                            componentWidth="10rem"
                            @time-change="(time)=>newProjectData.projectHouseCheckAmCheckEndTime = time"/>
          <q-input class="q-ml-md" v-model="newProjectData.projectHouseCheckAmCheckCap" color="grey" hide-bottom-space
                   borderless
                   placeholder="可验房人数" mask="###"
                   input-class="astercasc-input-inner-base"
                   :input-style="{width: '8rem'} "/>
          <div style="font-size: 1rem">
            人
          </div>

        </div>
        <div class="row items-center">
          <div>
            下午场
          </div>
          <DatetimeSelector :value="newProjectData.projectHouseCheckPmCheckStartTime" placeholder="开始时间"
                            componentWidth="10rem"
                            @time-change="(time)=>newProjectData.projectHouseCheckPmCheckStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectHouseCheckPmCheckEndTime" placeholder="结束时间"
                            componentWidth="10rem"
                            @time-change="(time)=>newProjectData.projectHouseCheckPmCheckEndTime = time"/>
          <q-input class="q-ml-md" v-model="newProjectData.projectHouseCheckPmCheckCap" color="grey" hide-bottom-space
                   borderless
                   placeholder="可验房人数" mask="###"
                   input-class="astercasc-input-inner-base"
                   :input-style="{ width: '8rem'} "/>
          <div style="font-size: 1rem">
            人
          </div>
        </div>
      </div>


      <div class="row justify-evenly">
        <q-btn outline class="astercasc-outline-btn-margin-pri" label="取消" @click="toBack(thisRouter);"/>
        <q-btn class="astercasc-simple-btn-margin-pri" label="完成" @click="projectNewSubmit();toBack(thisRouter);"/>
      </div>

    </div>

  </div>

</template>

<script setup>

import DatetimeSelector from "@/components/DatetimeSelector.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {toBack} from "@/router";
import {notifyTopPositive} from "@/utils/global-notify";
import {useQuasar} from "quasar";

//notify
const notify = useQuasar().notify
//router
const thisRouter = useRouter()

let newProjectData = ref({
  projectName: "",
  projectStartTime: "",
  projectEndTime: "",
  projectGroupDeadlineTime: "",
  projectSignDeadlineTime: "",

  projectGroupStartTime: "",
  projectGroupEndTime: "",
  projectNoGroupStartTime: "",
  projectNoGroupEndTime: "",
  projectGroupInterval: null,

  projectPersonalStartTime: "",
  projectPersonalEndTime: "",
  projectNoPersonalStartTime: "",
  projectNoPersonalEndTime: "",
  projectPersonalInterval: null,

  projectHouseCheckStartTime: "",
  projectHouseCheckEndTime: "",

  projectHouseCheckAmCheckStartTime: "",
  projectHouseCheckAmCheckEndTime: "",
  projectHouseCheckAmCheckCap: null,

  projectHouseCheckPmCheckStartTime: "",
  projectHouseCheckPmCheckEndTime: "",
  projectHouseCheckPmCheckCap: null,
})


function projectNewSubmit() {
  console.log(newProjectData.value)
  notifyTopPositive("新增成功", 2000, notify)
}


</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>