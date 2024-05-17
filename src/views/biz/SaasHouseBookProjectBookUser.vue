<template>

  <div>

    <div class="row items-center q-ml-sm">
      <q-input v-model="bookSearchKey" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入选房顺序号、姓名、手机号、身份证查询"
               input-class="astercasc-input-inner-base"
               :input-style="{ width: '25rem'} "/>

      <q-select standout dense label="短信发送状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="bookMailStatus" :options="bookMailStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />

      <q-select standout dense label="组队状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="bookGroupStatus" :options="bookGroupStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />


      <div class="q-ma-md">
        <q-btn class="astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchOrder()"/>
      </div>

    </div>

    <div class="row q-mt-sm q-mb-md">
      <div class="q-ml-lg q-mr-md">
        <q-btn class="astercasc-simple-btn-margin-pri" label="+ 新增活动租客"
               @click="emitter.emit('showNewBookUserEvent')"/>
      </div>
      <div class="q-mx-md">
        <q-btn class="astercasc-simple-btn-margin-pri" label="+ 导入活动租客"
               @click="emitter.emit('showImportBookUserEvent')"/>
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
import {onMounted, onUnmounted, ref} from "vue";
import SaasHouseBookNewBookUser from "@/components/SaasHouseBookNewBookUser.vue";
import emitter from "@/utils/bus";
import SaasHouseBookImportBookUser from "@/components/SaasHouseBookImportBookUser.vue";
import {bookGroupStatusOpt, bookMailStatusOpt} from "@/constant/enums";
import {bookUserColumns} from "@/constant/tables";
import ComplexTable from "@/components/ComplexTable.vue";
import {searchBookUserRet} from "@/mock/house-book-project";
import {useQuasar} from "quasar";
import DialogJudgment from "@/components/DialogJudgment.vue";
import {notifyTopPositive} from "@/utils/global-notify";

//notify
const notify = useQuasar().notify
//table
let tableBaseInfo = ref({
  tableColumns: bookUserColumns,
  tableKey: "bookOrder",
  renewDataEmitStr: 'saasHouseBookProjectBookUserRenewTableEvent',
  selectType: 'none',
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
let bookSearchKey = ref("")
let bookMailStatus = ref(null)
let bookGroupStatus = ref(null)
//judgement dialog
let dialogJudgmentDeleteData = ref({})
let dialogJudgmentSendData = ref({})
let dialogJudgmentMultiSendData = ref({})


function searchOrder() {
  console.log(bookSearchKey.value, bookMailStatus.value, bookGroupStatus.value)
}

function sendMultiMsgToUser() {
  if (!showMultiSelect.value) {
    tableBaseInfo.value.selectType = 'multiple'
    showMultiSelect.value = true
  } else {
    if (multiSelect.value.length > 0) {
      console.log(multiSelect.value)

      let multiSendUserId = ""
      for (let obj of multiSelect.value) {
        multiSendUserId += (obj.bookUserName + " ")
      }

      dialogJudgmentMultiSendData.value.title = "发送选房短信"
      dialogJudgmentMultiSendData.value.content = `确定要发送选房通知短信给用户 ${multiSendUserId}`
      dialogJudgmentMultiSendData.value.trueLabel = `确定`
      dialogJudgmentMultiSendData.value.falseLabel = `取消`

      emitter.emit("showDialogJudgmentMultiResendEvent")
    }
    tableBaseInfo.value.selectType = 'none'
    showMultiSelect.value = false
    //clear select
    const bookProjectBookUserTableInstance = bookProjectBookUserTable.value;
    bookProjectBookUserTableInstance.clearSelected()
  }
}

function sendMsgToMultiUser(isDo) {
  if (isDo) {
    notifyTopPositive("发送成功", 2000, notify)
  }
  emitter.emit("showDialogJudgmentMultiResendEvent", false)
}

function sendMsgToUser(isDo) {
  if (isDo) {
    notifyTopPositive("发送成功", 2000, notify)
  }
  emitter.emit("showDialogJudgmentResendEvent", false)
}

function deleteProjectUser(isDo) {
  if (isDo) {
    notifyTopPositive("删除成功", 2000, notify)
  }
  emitter.emit("showDialogJudgmentDeleteEvent", false)
}

function saasHouseBookProjectBookUserRenewTableEvent(param) {
  let pageNo = param.pageNo
  let pageSize = param.pageSize

  let offset = (pageNo - 1) * pageSize
  let last = offset + pageSize > searchBookUserRet.length ? searchBookUserRet.length : offset + pageSize

  tableData.value = searchBookUserRet.slice(offset, last)
  tableDataSum.value = searchBookUserRet.length
}

function saasHouseBookProjectDeleteEvent(map) {
  dialogJudgmentDeleteData.value.title = "删除选房用户"
  dialogJudgmentDeleteData.value.content = `确认是否删除选房用户“${map.bookUserName}”`
  dialogJudgmentDeleteData.value.trueLabel = `删除`
  dialogJudgmentDeleteData.value.falseLabel = `取消`

  emitter.emit("showDialogJudgmentDeleteEvent")
}

function saasHouseBookProjectBookUserResendEvent(map) {
  dialogJudgmentSendData.value.title = "发送选房短信"
  dialogJudgmentSendData.value.content = `确定要为用户“${map.bookUserName}”发送选房通知短信吗`
  dialogJudgmentSendData.value.trueLabel = `发送`
  dialogJudgmentSendData.value.falseLabel = `取消`

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