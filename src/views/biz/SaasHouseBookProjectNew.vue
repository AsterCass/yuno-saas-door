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
            <BadgeTips text="组队截止后，将不允许进行关系认定，会按照现有选房人员进行选房排序"/>
          </div>

          <div class="row items-center">
            <DatetimeSelector :value="newProjectData.projectTeamDeadlineTime" placeholder="请输入组队截止时间"
                              @time-change="(time)=>newProjectData.projectTeamDeadlineTime = time"/>
          </div>
        </div>

        <div class="text-center" style="width: 3rem">
        </div>

        <div>
          <div class="q-ml-sm astercasc-litter-title-asterisk">
            签约截止时间
            <BadgeTips text="确认选房后，如在签约截止时间前仍未完成签约，则被选中房源将释放"/>
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
          <DatetimeSelector :value="newProjectData.projectTeamStartTime" placeholder="请输入组队选房周期开始时间"
                            @time-change="(time)=>newProjectData.projectTeamStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DatetimeSelector :value="newProjectData.projectTeamEndTime" placeholder="请输入组队选房周期截止时间"
                            @time-change="(time)=>newProjectData.projectTeamEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm" style="font-size: 1.05rem">
          不可组队选房时段
          <BadgeTips text="设置时段后，则不会在该时段内安排选房人员"/>
        </div>
        <div class="row items-center">
          <TimeSelector :value="newProjectData.projectNoTeamStartTime" placeholder="请输入不可组队选房时段开始时间"
                            @time-change="(time)=>newProjectData.projectNoTeamStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <TimeSelector :value="newProjectData.projectNoTeamEndTime" placeholder="请输入不可组队选房时段截至时间"
                            @time-change="(time)=>newProjectData.projectNoTeamEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          组队选房间隔
          <BadgeTips text="设置后将按该间隔安排组队选房人员"/>
        </div>
        <div class="row items-center">
          <q-input v-model="newProjectData.projectTeamInterval" color="grey" hide-bottom-space borderless
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
        <div class="q-ml-sm" style="font-size: 1.05rem">
          不可个人选房时段
          <BadgeTips text="设置时段后，则不会在该时段内安排选房人员"/>
        </div>
        <div class="row items-center">
          <TimeSelector :value="newProjectData.projectNoPersonalStartTime"
                            placeholder="请输入不可个人选房时段开始时间"
                            @time-change="(time)=>newProjectData.projectNoPersonalStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <TimeSelector :value="newProjectData.projectNoPersonalEndTime"
                            placeholder="请输入不可个人选房时段截至时间"
                            @time-change="(time)=>newProjectData.projectNoPersonalEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          个人选房间隔
          <BadgeTips text="设置后将按该间隔安排选房人员"/>
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
          <BadgeTips text="设置后，租客可预约该日期进行验房"/>
        </div>
        <div class="row items-center">
          <DateSelector :value="newProjectData.projectHouseCheckStartTime" placeholder="请输入可验房日期开始时间"
                            @time-change="(time)=>newProjectData.projectHouseCheckStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <DateSelector :value="newProjectData.projectHouseCheckEndTime" placeholder="请输入可验房日期截止时间"
                            @time-change="(time)=>newProjectData.projectHouseCheckEndTime = time"/>
        </div>
      </div>

      <div class="q-my-md">
        <div class="q-ml-sm astercasc-litter-title-asterisk">
          可验房时段/人数
          <BadgeTips text="设置后，租客可预约该时段进行验房，同时可以设置每个时段的可验房人数"/>
        </div>
        <div class="row items-center">
          <div>
            上午场
          </div>
          <TimeSelector :value="newProjectData.projectHouseCheckAmCheckStartTime" placeholder="开始时间"
                            componentWidth="10rem"
                            @time-change="(time)=>newProjectData.projectHouseCheckAmCheckStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <TimeSelector :value="newProjectData.projectHouseCheckAmCheckEndTime" placeholder="结束时间"
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
          <TimeSelector :value="newProjectData.projectHouseCheckPmCheckStartTime" placeholder="开始时间"
                            componentWidth="10rem"
                            @time-change="(time)=>newProjectData.projectHouseCheckPmCheckStartTime = time"/>
          <div class="text-center" style="width: 3rem">
            至
          </div>
          <TimeSelector :value="newProjectData.projectHouseCheckPmCheckEndTime" placeholder="结束时间"
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
        <q-btn class="astercasc-simple-btn-margin-pri" label="完成" @click="projectNewSubmit();"/>
      </div>

    </div>

  </div>

</template>

<script setup>

import DatetimeSelector from "@/components/DatetimeSelector.vue";
import {defineProps, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {toBack, toSpecifyPage} from "@/router";
import {notifyTopPositive, notifyTopWarning} from "@/utils/global-notify";
import {extend, useQuasar} from "quasar";
import DateSelector from "@/components/DateSelector.vue";
import TimeSelector from "@/components/TimeSelector.vue";
import {bookProjectDetail, bookProjectNew} from "@/api/book-project";
import BadgeTips from "@/components/BadgeTips.vue";

//notify
const notify = useQuasar().notify

const props = defineProps({
  projectId: {
    type: String,
    required: false,
    default: ""
  }
})

//router
const thisRouter = useRouter()

let newProjectData = ref({
  projectName: "",
  projectStartTime: "",
  projectEndTime: "",
  projectTeamDeadlineTime: "",
  projectSignDeadlineTime: "",

  projectTeamStartTime: "",
  projectTeamEndTime: "",
  projectNoTeamStartTime: "",
  projectNoTeamEndTime: "",
  projectTeamInterval: 4,

  projectPersonalStartTime: "",
  projectPersonalEndTime: "",
  projectNoPersonalStartTime: "",
  projectNoPersonalEndTime: "",
  projectPersonalInterval: 2,

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

  //todo check

  bookProjectNew(props.projectId, newProjectData.value).then(data => {
    if (data && 200 === data.status) {
      notifyTopPositive("操作成功", 2000, notify)
      toSpecifyPage(thisRouter, 'saasHouseBookProject')
    }
  }).catch(() => {
    notifyTopWarning("新增失败，请重试", 2000, notify)
  });

}


onMounted(() => {
  if (props.projectId) {
    bookProjectDetail(props.projectId).then(data => {
      if (data && 200 === data.status) {
        extend(true, data.data, data.data.bookProjectData)
        extend(true, newProjectData.value, data.data)
      }
    }).catch(() => {
      notifyTopWarning("获取项目失败，请重试", 2000, notify)
    });
  }
})


</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>