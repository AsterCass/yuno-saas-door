<template>

  <div>

    <div class="row items-center q-ml-sm">
      <q-input v-model="bookUserSearchKey" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入选房顺序号、姓名、手机号、身份证查询"
               input-class="astercasc-input-inner-base"
               :input-style="inject('globalData').isMiniScreen ? {} : {width: '25rem'} "/>

      <q-select standout dense label="短信发送状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="bookMailStatus" :options="bookMailStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />

      <q-select standout dense label="组队状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="bookTeamStatus" :options="bookTeamStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />


      <div class="q-ma-md">
        <q-btn class="astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchOrder()"/>
      </div>

    </div>

    <div class="row q-mt-sm q-mb-md">
      <div class="q-ml-lg q-mr-md">
        <q-btn class="astercasc-simple-btn-margin-pri" label="+ 新增活动租客"
               @click="emitter.emit('showNewBookUserEvent', props.projectId)"/>
      </div>
      <div class="q-mx-md">
        <q-btn class="astercasc-simple-btn-margin-pri" label="+ 导入活动租客"
               @click="emitter.emit('showImportBookUserEvent', props.projectId)"/>
      </div>
      <div class="q-mx-md">
        <q-btn class="astercasc-simple-btn-margin-pri" label="批量发送短信" @click="sendMultiMsgToUser()"/>
      </div>
    </div>


    <div class="q-ma-lg">
      <ComplexTable v-if="mountTable" ref="bookProjectBookUserTable"
                    :custom-table-operation="customTableOperation"
                    :table-base-info="tableBaseInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"
                    @multi-select-change="(selected)=>multiSelect = selected"/>
    </div>


  </div>


  <SaasHouseBookNewBookUser/>
  <SaasHouseBookImportBookUser/>

  <DialogJudgment :dialog-judgment-data="dialogJudgmentDeleteData"
                  :callback-method="deleteProjectUser"
                  emit-str="showDialogJudgmentDeleteEvent"/>
  <DialogJudgment :dialog-judgment-data="dialogJudgmentSendData"
                  :callback-method="sendMsgToUser"
                  emit-str="showDialogJudgmentResendEvent"/>
  <DialogJudgment :dialog-judgment-data="dialogJudgmentMultiSendData"
                  :callback-method="sendMsgToMultiUser"
                  emit-str="showDialogJudgmentMultiResendEvent"/>

</template>

<script setup>
import {defineProps, inject, onMounted, onUnmounted, ref} from "vue";
import SaasHouseBookNewBookUser from "@/components/biz/SaasHouseBookNewBookUser.vue";
import emitter from "@/utils/bus";
import SaasHouseBookImportBookUser from "@/components/biz/SaasHouseBookImportBookUser.vue";
import {BookMailStatusEnum, bookMailStatusOpt, BookTeamStatusEnum, bookTeamStatusOpt} from "@/constant/enums";
import {bookUserColumns} from "@/constant/tables";
import ComplexTable from "@/components/ComplexTable.vue";
import {extend, useQuasar} from "quasar";
import DialogJudgment from "@/components/DialogJudgment.vue";
import {notifyTopPositive, notifyTopWarning} from "@/utils/global-notify";
import {bookProjectUserDelete, bookProjectUserList, bookProjectUserSendMail} from "@/api/book-project-user";

//notify
const notify = useQuasar().notify
const props = defineProps({
  projectId: {
    type: String,
    required: false,
    default: ""
  }
})
//table
let tableBaseInfo = ref({
  tableColumns: bookUserColumns,
  tableKey: "bookOrder",
  renewDataEmitStr: 'saasHouseBookProjectBookUserRenewTableEvent',
  selectType: 'none',
  miniCardTitle: 'bookUserName',
})
const customTableOperation = [
  {
    label: '删除',
    emitStr: 'saasHouseBookProjectDeleteEvent',
  },
  {
    label: '发送短信',
    emitStr: 'saasHouseBookProjectBookUserResendEvent',
    showCondition: 'isFirst'
  },
  {
    label: '重发短信',
    emitStr: 'saasHouseBookProjectBookUserResendEvent',
    showCondition: 'isResend'
  },
]
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
//select
let multiSelect = ref([])
let showMultiSelect = ref(false)
let bookProjectBookUserTable = ref(null)
//search
let bookUserSearchKey = ref("")
let bookMailStatus = ref(null)
let bookTeamStatus = ref(null)
let pageParam = ref({})
//judgement dialog
let dialogJudgmentDeleteData = ref({})
let dialogJudgmentSendData = ref({})
let dialogJudgmentMultiSendData = ref({})


function searchOrder() {
  saasHouseBookProjectBookUserRenewTableEvent(pageParam.value)
}

function sendMultiMsgToUser() {
  if (!showMultiSelect.value) {
    tableBaseInfo.value.selectType = 'multiple'
    showMultiSelect.value = true
  } else {
    if (multiSelect.value.length > 0) {

      let multiSendUserNames = ""
      let multiSendUserIds = ""
      for (let obj of multiSelect.value) {
        multiSendUserNames += (obj.bookUserName + " ")
        multiSendUserIds += (obj.projectUserId + ",")
      }

      dialogJudgmentMultiSendData.value.title = "发送选房短信"
      dialogJudgmentMultiSendData.value.content = `确定要发送选房通知短信给用户 ${multiSendUserNames}`
      dialogJudgmentMultiSendData.value.trueLabel = `确定`
      dialogJudgmentMultiSendData.value.falseLabel = `取消`
      dialogJudgmentMultiSendData.value.projectUserIds = multiSendUserIds

      emitter.emit("showDialogJudgmentMultiResendEvent")
    }
    tableBaseInfo.value.selectType = 'none'
    showMultiSelect.value = false
    //clear select
    const bookProjectBookUserTableInstance = bookProjectBookUserTable.value;
    bookProjectBookUserTableInstance.clearSelected()
  }
}


function sendMailMethod(projectUserIds) {
  bookProjectUserSendMail(props.projectId, {projectUserIds: projectUserIds}).then(data => {
    if (data && data.status === 200) {
      notifyTopPositive("发送成功", 2000, notify)
      saasHouseBookProjectBookUserRenewTableEvent(pageParam.value)
    }
  }).catch(() => {
    notifyTopWarning("短信发送失败，请重试", 2000, notify)
  });
}

function sendMsgToMultiUser(isDo) {
  if (isDo) {
    sendMailMethod(dialogJudgmentMultiSendData.value.projectUserIds)
  }
  emitter.emit("showDialogJudgmentMultiResendEvent", false)
}

function sendMsgToUser(isDo) {
  if (isDo) {
    sendMailMethod(dialogJudgmentSendData.value.projectUserId)
  }
  emitter.emit("showDialogJudgmentResendEvent", false)
}

function deleteProjectUser(isDo) {
  if (isDo) {
    bookProjectUserDelete(props.projectId, dialogJudgmentDeleteData.value.projectUserId).then(data => {
      if (data && 200 === data.status) {
        notifyTopPositive("刪除成功", 2000, notify)
        saasHouseBookProjectBookUserRenewTableEvent(pageParam.value)
      }
    }).catch(() => {
      notifyTopWarning("删除失败，请重试", 2000, notify)
    });
  }
  emitter.emit("showDialogJudgmentDeleteEvent", false)
}

function saasHouseBookProjectBookUserRenewTableEvent(param) {
  if(param) {
    pageParam.value = param
  }
  bookProjectUserList(props.projectId, extend(true, {
    projectUserKeyword: bookUserSearchKey.value,
    bookMailStatus: null == bookMailStatus.value ? null : bookMailStatus.value.value,
    bookTeamStatus: null == bookTeamStatus.value ? null : bookTeamStatus.value.value,
  }, pageParam.value)).then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      let content = thisData.content
      for (let inData of content) {
        inData.bookMailStatusName = BookMailStatusEnum.getDesc(inData.sendMailCount)
        inData.bookTeamStatusName = BookTeamStatusEnum.getDesc(inData.bookUserTeamStatus)
        if (!inData.bookUserRealStartTime) {
          inData.bookUserRealStartTime = "未生成"
        }
        if (inData.sendMailCount > 0) {
          inData.isResend = true
        } else {
          inData.isFirst = true
        }
      }
      tableData.value = content
      tableDataSum.value = thisData.totalElements
    }
  }).catch(() => {
    notifyTopWarning("数据获取，请重试", 2000, notify)
  });
}

function saasHouseBookProjectDeleteEvent(map) {
  dialogJudgmentDeleteData.value.title = "删除选房用户"
  dialogJudgmentDeleteData.value.content = `确认是否删除选房用户“${map.bookUserName}”`
  dialogJudgmentDeleteData.value.trueLabel = `删除`
  dialogJudgmentDeleteData.value.falseLabel = `取消`
  dialogJudgmentDeleteData.value.projectUserId = `${map.projectUserId}`

  emitter.emit("showDialogJudgmentDeleteEvent")
}

function saasHouseBookProjectBookUserResendEvent(map) {
  dialogJudgmentSendData.value.title = "发送选房短信"
  dialogJudgmentSendData.value.content = `确定要为用户“${map.bookUserName}”发送选房通知短信吗`
  dialogJudgmentSendData.value.trueLabel = `发送`
  dialogJudgmentSendData.value.falseLabel = `取消`
  dialogJudgmentSendData.value.projectUserId = map.projectUserId

  emitter.emit("showDialogJudgmentResendEvent")
}


onMounted(() => {
  emitter.on('saasHouseBookProjectBookUserRenewTableEvent', saasHouseBookProjectBookUserRenewTableEvent)
  emitter.on('saasHouseBookProjectDeleteEvent', saasHouseBookProjectDeleteEvent)
  emitter.on('saasHouseBookProjectBookUserResendEvent', saasHouseBookProjectBookUserResendEvent)

  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('saasHouseBookProjectBookUserRenewTableEvent', saasHouseBookProjectBookUserRenewTableEvent)
  emitter.off('saasHouseBookProjectDeleteEvent', saasHouseBookProjectDeleteEvent)
  emitter.off('saasHouseBookProjectBookUserResendEvent', saasHouseBookProjectBookUserResendEvent)

})



</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>