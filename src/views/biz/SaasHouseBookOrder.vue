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
import {onMounted, onUnmounted, ref} from "vue";
import {orderStatusOpt} from "@/constant/enums";
import ComplexTable from "@/components/ComplexTable.vue";
import {bookHouseOrderColumns} from "@/constant/tables";
import emitter from "@/utils/bus";
import {searchOrderRet} from "@/mock/house-book-project";

const tableBaseInfo = ref({
  tableColumns: bookHouseOrderColumns,
  tableKey: "orderNo",
  renewDataEmitStr: 'saasHouseBookOrderRenewTableEvent',
  selectType: 'none',
})
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)

let orderSearchNo = ref("")
let orderSearchKey = ref("")
let orderStatus = ref(null)


function searchOrder() {
  console.log(orderSearchKey.value, orderStatus.value, orderSearchNo.value)
}

function saasHouseBookOrderRenewTableEvent(param) {
  let pageNo = param.pageNo
  let pageSize = param.pageSize

  let offset = (pageNo - 1) * pageSize
  let last = offset + pageSize > searchOrderRet.length ? searchOrderRet.length : offset + pageSize

  tableData.value = searchOrderRet.slice(offset, last)
  tableDataSum.value = searchOrderRet.length
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