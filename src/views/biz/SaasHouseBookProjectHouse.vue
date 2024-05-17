<template>

  <div>

    <div class="row items-center q-ml-sm">
      <q-input v-model="houseKey" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入房源编号、房源信息查询"
               input-class="astercasc-input-inner-base"
               :input-style="{ width: '25rem'} "/>

      <AddressCascadeSelector @update-address="(code)=>{houseAddressCode = code} "/>


      <q-select standout dense label="租赁方式" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="rentalStyle" :options="rentalStyleOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />
      <q-select standout dense label="户型" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="houseModel" :options="houseModelOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />


      <div class="q-ma-md">
        <q-btn class="astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchOrder()"/>
      </div>

    </div>

    <div class="row q-mt-sm q-mb-md">
      <div class="q-ml-lg q-mr-md">
        <q-btn class="astercasc-simple-btn-margin-pri" label="+ 关联项目房源"
               @click="emitter.emit('showImportHouseProjectEvent')"/>
      </div>
      <div class="q-mx-md">
        <q-btn class="astercasc-simple-btn-margin-pri" label="批量解除关联" @click="unlinkMultiHouse()"/>
      </div>
    </div>


    <div class="q-ma-lg">
      <ComplexTable v-if="mountTable" ref="bookProjectBookHouseTable"
                    :custom-table-operation="customTableOperation"
                    :table-base-info="tableBaseInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"
                    @multi-select-change="(selected)=>multiSelect = selected"/>
    </div>


  </div>

  <SaasHouseBookImportHouseProject/>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {searchProjectHouseRet} from "@/mock/house-book-project";
import emitter from "@/utils/bus";
import SaasHouseBookImportHouseProject from "@/components/SaasHouseBookImportHouseProject.vue";
import {houseModelOpt, rentalStyleOpt} from "@/constant/enums";
import ComplexTable from "@/components/ComplexTable.vue";
import {bookHouseColumns} from "@/constant/tables";
import {useQuasar} from "quasar";
import {notifyTopPositive} from "@/utils/global-notify";
import AddressCascadeSelector from "@/components/AddressCascadeSelector.vue";

//notify
const notify = useQuasar().notify
//table
let tableBaseInfo = ref({
  tableColumns: bookHouseColumns,
  tableKey: "houseNo",
  renewDataEmitStr: 'saasHouseBookProjectBookHouseRenewTableEvent',
  selectType: 'none',
})
const customTableOperation = [
  {
    label: '解除关联',
    emitStr: 'saasHouseBookProjectHouseUnlinkEvent',
  },
]
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
//select
let multiSelect = ref([])
let showMultiSelect = ref(false)
let bookProjectBookHouseTable = ref(null)
//search
let houseKey = ref("")
let rentalStyle = ref(null)
let houseAddressCode = ref("")
let houseModel = ref(null)


function searchOrder() {
  console.log(houseKey.value, houseAddressCode.value, rentalStyle.value, houseModel.value)
}

function unlinkMultiHouse() {
  if (!showMultiSelect.value) {
    tableBaseInfo.value.selectType = 'multiple'
    showMultiSelect.value = true
  } else {
    if (multiSelect.value.length > 0) {
      let unlinkMultiHouseId = ""
      for (let obj of multiSelect.value) {
        unlinkMultiHouseId += (obj.houseNo + " ")
      }
      notifyTopPositive(`解除房源编号 ${unlinkMultiHouseId}关联成功`, 2000, notify)
    }
    tableBaseInfo.value.selectType = 'none'
    showMultiSelect.value = false
    //clear select
    const bookProjectBookHouseTableInst = bookProjectBookHouseTable.value;
    bookProjectBookHouseTableInst.clearSelected()
  }
}

function saasHouseBookProjectBookHouseRenewTableEvent(param) {
  let pageNo = param.pageNo
  let pageSize = param.pageSize

  let offset = (pageNo - 1) * pageSize
  let last = offset + pageSize > searchProjectHouseRet.length ? searchProjectHouseRet.length : offset + pageSize

  tableData.value = searchProjectHouseRet.slice(offset, last)
  tableDataSum.value = searchProjectHouseRet.length
}

function saasHouseBookProjectHouseUnlinkEvent(map) {
  notifyTopPositive(`解除“${map.houseNo}”关联成功`, 2000, notify)
}


onMounted(() => {
  emitter.on('saasHouseBookProjectBookHouseRenewTableEvent', saasHouseBookProjectBookHouseRenewTableEvent)
  emitter.on('saasHouseBookProjectHouseUnlinkEvent', saasHouseBookProjectHouseUnlinkEvent)

  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('saasHouseBookProjectBookHouseRenewTableEvent', saasHouseBookProjectBookHouseRenewTableEvent)
  emitter.off('saasHouseBookProjectHouseUnlinkEvent', saasHouseBookProjectHouseUnlinkEvent)

})

</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>