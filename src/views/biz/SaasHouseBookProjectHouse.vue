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

  <SaasHouseBookImportHouseProject :project-id="projectId"
                                   :house-sum="Number(houseSum)"
                                   :house-project-id="houseProjectId"/>

</template>

<script setup>
import {defineProps, onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import SaasHouseBookImportHouseProject from "@/components/biz/SaasHouseBookImportHouseProject.vue";
import {houseModelOpt, OrientationEnum, rentalStyleOpt} from "@/constant/enums";
import ComplexTable from "@/components/ComplexTable.vue";
import {bookHouseColumns} from "@/constant/tables";
import {extend, useQuasar} from "quasar";
import {notifyTopPositive, notifyTopWarning} from "@/utils/global-notify";
import AddressCascadeSelector from "@/components/AddressCascadeSelector.vue";
import {projectHouseList, unImport} from "@/api/book-project-house";
import {useRouter} from "vue-router";
import {toReplacePage} from "@/router";

//notify
const notify = useQuasar().notify
const thisRouter = useRouter()
const props = defineProps({
  projectId: {
    type: String,
    required: false,
    default: ""
  },
  houseSum: {
    type: String,
    required: true,
    default: '0',
  },
})
//table
let tableBaseInfo = ref({
  tableColumns: bookHouseColumns,
  tableKey: "projectHouseId",
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
let pageParam = ref({})
//data
let houseProjectId = ref("")
let updateForUrlParam = ref(false)



function searchOrder() {
  saasHouseBookProjectBookHouseRenewTableEvent(pageParam.value)
}

function unlinkMultiHouse() {
  if (!showMultiSelect.value) {
    tableBaseInfo.value.selectType = 'multiple'
    showMultiSelect.value = true
  } else {
    if (multiSelect.value.length > 0) {
      let unlinkMultiHouseId = ""
      let unlinkMultiHouseIdParam = ""
      for (let obj of multiSelect.value) {
        unlinkMultiHouseId += (obj.projectHouseId + " ")
        unlinkMultiHouseIdParam += (obj.projectHouseId + ",")
      }
      unImport(props.projectId, {projectHouseIds: unlinkMultiHouseIdParam}).then(data => {
        if (data && 200 === data.status) {
          notifyTopPositive(`解除房源编号 ${unlinkMultiHouseId}关联成功`, 2000, notify)
          initParam()
          saasHouseBookProjectBookHouseRenewTableEvent()
          updateForUrlParam.value = true
        }
      }).catch(() => {
        notifyTopWarning("取消关联失败，请重试", 2000, notify)
      });
    }
    tableBaseInfo.value.selectType = 'none'
    showMultiSelect.value = false
    //clear select
    const bookProjectBookHouseTableInst = bookProjectBookHouseTable.value;
    bookProjectBookHouseTableInst.clearSelected()
  }
}

function saasHouseBookProjectBookHouseRenewTableEvent(param) {
  if (param) {
    pageParam.value = param
  }
  projectHouseList(extend(true, {
    houseKeyword: houseKey.value,
    rentType: null == rentalStyle.value ? null : rentalStyle.value.value,
    divisionCode: null == houseAddressCode.value ? null : houseAddressCode.value,
    bedroomSum: null == houseModel.value ? null : houseModel.value.value,
    projectId: props.projectId
  }, pageParam.value)).then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      let content = thisData.content
      for (let inData of content) {
        inData.houseModel = inData.bedroomSum + "室" + inData.livingRoomSum + "厅" + inData.washroomSum + "卫"
        inData.orientation = OrientationEnum.getDesc(inData.orientation)
        inData.houseFloor = inData.floorNo + "/" + inData.floorSum
        inData.rentalCharge = inData.monthPay + "/月"
        if (inData.rentStyle === 1) {
          inData.rentStyle = '整租'
          inData.houseAddress = inData.community + inData.buildNo + "幢" + inData.unitNo + "单元" + inData.houseNo
          inData.area = inData.area + "㎡"
        } else {
          inData.rentStyle = '合租'
          inData.houseAddress = inData.community + inData.buildNo + "幢"
              + inData.unitNo + "单元" + inData.houseNo + '-' + inData.roomNo
          inData.area = inData.roomArea + "㎡"
        }
        //pass to child component
        houseProjectId.value = inData.houseProjectId
      }
      tableData.value = content
      tableDataSum.value = thisData.totalElements
      if (updateForUrlParam.value) {
        toReplacePage(thisRouter, {id: props.projectId, houseSum: tableDataSum.value})
        updateForUrlParam.value = false
      }
    }
  }).catch(() => {
    notifyTopWarning("房源数据获取失败，请重试", 2000, notify)
  });
}

function initParam() {
  houseKey.value = ''
  rentalStyle.value = null
  houseAddressCode.value = ""
  houseModel.value = null
}

function saasHouseBookProjectHouseUnlinkEvent(map) {
  unImport(props.projectId, {projectHouseIds: map.projectHouseId}).then(data => {
    if (data && 200 === data.status) {
      notifyTopPositive(`解除“${map.projectHouseId}”关联成功`, 2000, notify)
      initParam()
      saasHouseBookProjectBookHouseRenewTableEvent()
      updateForUrlParam.value = true
    }
  }).catch(() => {
    notifyTopWarning("取消关联失败，请重试", 2000, notify)
  });

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