<template>
  <div>

    <div class="row items-center q-ml-sm">
      <q-input v-model="orderSearchNo" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入订单编号"
               input-class="astercasc-input-inner-base"
               :input-style="{ width: '20rem'} "/>
      <q-input v-model="orderSearchKey" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入关键信息查询（活动、房源、选房人等）"
               input-class="astercasc-input-inner-base"
               :input-style="{ width: '25rem'} "/>

      <q-select standout dense label="订单状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="orderStatus" :options="orderStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />

      <AddressCascadeSelector @update-address="(code)=>orderAddressCode = code"/>

      <div class="q-ma-md">
        <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchOrder()"/>
      </div>

    </div>

    <div class="row q-mt-md q-ml-lg ">
      <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="导入用户"
             @click="emitter.emit('showSaasImportUserEvent')"/>
      <div class="q-mx-md"/>
      <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="新增用户"
             @click="emitter.emit('showSaasNewUserEvent')"/>
      <div class="q-mx-md"/>
      <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="批量删除"
             @click="multiDeleteUserMembers()"/>

    </div>


    <div class="q-ma-lg">
      <ComplexTable ref="accountMemberTable"
                    v-if="mountTable" :custom-slot="customColumnBuilder"
                    :custom-table-operation="customTableOperation"
                    :table-base-info="tableBaseInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"
                    @multi-select-change="(selected)=>multiSelect = selected"/>
    </div>


  </div>

  <SaasImportUser/>
  <SaasNewUser/>
  <DialogJudgment :dialog-judgment-data="dialogJudgmentData"
                  :callback-method="deleteUserDialog"
                  emit-str="showDialogJudgmentEvent"/>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import SaasImportUser from "@/components/SaasImportUser.vue";
import SaasNewUser from "@/components/SaasNewUser.vue";
import emitter from "@/utils/bus";
import ComplexTable from "@/components/ComplexTable.vue";
import {bookHouseOrderColumns} from "@/constant/tables";
import {ComplexTableColumnEnum, orderStatusOpt} from "@/constant/enums";
import {searchOrderRet} from "@/mock/account";
import DialogJudgment from "@/components/DialogJudgment.vue";
import {useQuasar} from "quasar";
import {notifyTopPositive} from "@/utils/global-notify";
import AddressCascadeSelector from "@/components/AddressCascadeSelector.vue";

//notify
const notify = useQuasar().notify
//table
const tableBaseInfo = ref({
  tableColumns: bookHouseOrderColumns,
  tableKey: "orderNo",
  renewDataEmitStr: 'saasAccountMembersRenewEvent',
  selectType: 'none',
})
const customColumnBuilder = [
  {
    name: "houseNo",
    slotName: "body-cell-houseNo",
    type: ComplexTableColumnEnum.POINTED,
    emitStr: 'saasAccountMembersToRoleEvent',
  },
]
const customTableOperation = [
  {
    label: '启用',
    emitStr: 'saasAccountMembersUpEvent',
    showCondition: 'inDownStyle'
  },
  {
    label: '禁用',
    emitStr: 'saasAccountMembersDownEvent',
    showCondition: 'inUpStyle'
  },
  {
    label: '删除',
    emitStr: 'saasAccountMembersDeleteEvent',
  },
]
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
//select
let multiSelect = ref([])
let showMultiSelect = ref(false)
let accountMemberTable = ref(null)
//search
let orderSearchNo = ref("")
let orderSearchKey = ref("")
let orderStatus = ref(null)
let orderAddressCode = ref("")
//judgement dialog
let dialogJudgmentData = ref({})

function searchOrder() {
  console.log(orderSearchKey.value, orderStatus.value, orderSearchNo.value, orderAddressCode.value)
}

function multiDeleteUserMembers() {
  if (!showMultiSelect.value) {
    tableBaseInfo.value.selectType = 'multiple'
    showMultiSelect.value = true
  } else {
    if (multiSelect.value.length > 0) {
      //todo
    }
    tableBaseInfo.value.selectType = 'none'
    showMultiSelect.value = false
    //clear select
    const accountMemberTableInst = accountMemberTable.value;
    accountMemberTableInst.clearSelected()
  }
}

function saasAccountMembersRenewEvent(param) {
  let pageNo = param.pageNo
  let pageSize = param.pageSize

  let offset = (pageNo - 1) * pageSize
  let last = offset + pageSize > searchOrderRet.length ? searchOrderRet.length : offset + pageSize

  tableData.value = searchOrderRet.slice(offset, last)
  tableDataSum.value = searchOrderRet.length
}

function deleteUserDialog(isDo) {
  if (isDo) {
    notifyTopPositive("删除成功", 2000, notify)
  }
  emitter.emit("showDialogJudgmentEvent", false)
}

function saasAccountMembersToRoleEvent(map) {
  console.log(map)
}

function saasAccountMembersUpEvent(map) {
  console.log(map)
}

function saasAccountMembersDownEvent(map) {
  console.log(map)
}

function saasAccountMembersDeleteEvent(map) {
  dialogJudgmentData.value.title = "删除用户"
  dialogJudgmentData.value.content = `确认是否删除用户 ${map.orderNo}`
  dialogJudgmentData.value.trueLabel = `删除`
  dialogJudgmentData.value.falseLabel = `取消`

  emitter.emit("showDialogJudgmentEvent")
}


onMounted(() => {
  emitter.on('saasAccountMembersRenewEvent', saasAccountMembersRenewEvent)
  emitter.on('saasAccountMembersToRoleEvent', saasAccountMembersToRoleEvent)

  emitter.on('saasAccountMembersUpEvent', saasAccountMembersUpEvent)
  emitter.on('saasAccountMembersDownEvent', saasAccountMembersDownEvent)
  emitter.on('saasAccountMembersDeleteEvent', saasAccountMembersDeleteEvent)

  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('saasAccountMembersRenewEvent', saasAccountMembersRenewEvent)
  emitter.off('saasAccountMembersToRoleEvent', saasAccountMembersToRoleEvent)

  emitter.off('saasAccountMembersUpEvent', saasAccountMembersUpEvent)
  emitter.off('saasAccountMembersDownEvent', saasAccountMembersDownEvent)
  emitter.off('saasAccountMembersDeleteEvent', saasAccountMembersDeleteEvent)


})




</script>
<style scoped lang="scss">
@import "@/styles/theme-style";

</style>

<style lang="scss">
@import "@/styles/theme-style";


</style>