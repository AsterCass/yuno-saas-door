<template>
  <div>

    <div class="row items-center q-ml-sm">
      <q-input v-model="orderSearchNo" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入订单编号"
               input-class="astercasc-input-inner-base"
               :input-style="inject('globalData').isMiniScreen ? {} : {width: '20rem'} "/>
      <q-input v-model="orderSearchKey" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入关键信息查询（活动、房源、选房人等）"
               input-class="astercasc-input-inner-base"
               :input-style="inject('globalData').isMiniScreen ? {} : {width: '25rem'} "/>

      <q-select standout dense label="订单状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="orderStatus" :options="orderStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />

      <div class="q-ma-md">
        <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchOrder()"/>
      </div>

    </div>


    <div class="q-ma-lg">
      <ComplexTable v-if="mountTable" :table-base-info="tableBaseInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"/>
    </div>


  </div>
</template>

<script setup>
import {inject, onMounted, onUnmounted, ref} from "vue";
import {HouseOrderStatusEnum, orderStatusOpt} from "@/constant/enums";
import ComplexTable from "@/components/ComplexTable.vue";
import {bookHouseOrderColumns} from "@/constant/tables";
import emitter from "@/utils/bus";
import {projectHouseOrderList} from "@/api/book-project-house";
import {extend, useQuasar} from "quasar";
import {notifyTopWarning} from "@/utils/global-notify";

//notify
const notify = useQuasar().notify
const tableBaseInfo = ref({
  tableColumns: bookHouseOrderColumns,
  tableKey: "projectHouseOrderId",
  renewDataEmitStr: 'saasHouseBookOrderRenewTableEvent',
  selectType: 'none',
  miniCardTitle: 'houseAddress',
})
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
//search
let orderSearchNo = ref("")
let orderSearchKey = ref("")
let orderStatus = ref(null)
let pageParam = ref({})


function searchOrder() {
  saasHouseBookOrderRenewTableEvent()
}

function saasHouseBookOrderRenewTableEvent(param) {
  if (param) {
    pageParam.value = param
  }
  projectHouseOrderList(extend(true, {
    houseOrderId: orderSearchNo.value,
    houseOrderKeyword: orderSearchKey.value,
    houseOrderStatus: null == orderStatus.value ? null : orderStatus.value.value,
  }, pageParam.value)).then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      let content = thisData.content
      for (let inData of content) {
        inData.orderStatusName = HouseOrderStatusEnum.getDesc(inData.orderStatus)
      }
      tableData.value = content
      tableDataSum.value = thisData.totalElements
    }
  }).catch(() => {
    notifyTopWarning("订单数据获取失败，请重试", 2000, notify)
  });
}


onMounted(() => {
  emitter.on('saasHouseBookOrderRenewTableEvent', saasHouseBookOrderRenewTableEvent)
  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('saasHouseBookOrderRenewTableEvent', saasHouseBookOrderRenewTableEvent)
})


</script>
<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>