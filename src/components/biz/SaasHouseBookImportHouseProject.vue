<template>
  <div>
    <q-dialog :model-value="showImportHouseProject" @hide="closeImportHouseProjectEvent"
              transition-show="fade" transition-hide="fade">
      <q-card class=" astercasc-dialog-frame-big">

        <h5 class="astercasc-theme-base" style="text-align: start">
          关联项目房源
        </h5>

        <q-separator inset class="q-ma-sm half-opacity" :dark="getUserBehavior().styleModel === 'dark'"/>

        <div class="row items-center">
          <q-input v-model="houseProjectSearchKey" color="grey q-ma-md" hide-bottom-space borderless
                   placeholder="请输入项目编号、项目名称查询"
                   input-class="astercasc-input-inner-base"
                   :input-style="{ width: '20rem'} "/>
          <div class="q-ma-md">
            <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchHouseProject()"/>
          </div>
        </div>

        <div class="q-ma-lg">
          <ComplexTable v-if="mountTable"
                        :custom-table-operation="customTableOperation"
                        :table-base-info="tableBaseInfo"
                        :table-data="tableData"
                        :table-data-sum="tableDataSum"
          />
        </div>


      </q-card>
    </q-dialog>
  </div>

  <DialogJudgment :dialog-judgment-data="dialogJudgmentData"
                  :callback-method="linkHouseProjectDialog"
                  emit-str="showDialogJudgmentEvent"/>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {getUserBehavior} from "@/utils/store";
import ComplexTable from "@/components/ComplexTable.vue";
import {importHouseProjectColumns} from "@/constant/tables";
import {searchImportHouseProjectRet} from "@/mock/house-book-project";
import {useQuasar} from "quasar";
import DialogJudgment from "@/components/DialogJudgment.vue";
import {notifyTopPositive} from "@/utils/global-notify";

let showImportHouseProject = ref(false);
let houseProjectSearchKey = ref("")

//notify
const notify = useQuasar().notify
//table
let tableBaseInfo = ref({
  tableColumns: importHouseProjectColumns,
  tableKey: "houseProjectNo",
  renewDataEmitStr: 'saasHouseBookImportHouseRenewTableEvent',
  selectType: 'none',
})
const customTableOperation = [
  {
    label: '确认关联',
    emitStr: 'saasHouseBookImportHouseLinkEvent',
  },
]
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
//judgement dialog
let dialogJudgmentData = ref({})

function searchHouseProject() {
  console.log(houseProjectSearchKey.value)
}

function linkHouseProjectDialog(isDo) {
  if (isDo) {
    notifyTopPositive("关联成功", 2000, notify)
    closeImportHouseProjectEvent()
  }
  emitter.emit("showDialogJudgmentEvent", false)
}

function closeImportHouseProjectEvent() {
  showImportHouseProject.value = false
}

function showImportHouseProjectEvent() {
  showImportHouseProject.value = true
}

function saasHouseBookImportHouseRenewTableEvent(param) {
  let pageNo = param.pageNo
  let pageSize = param.pageSize

  let offset = (pageNo - 1) * pageSize
  let last = offset + pageSize > searchImportHouseProjectRet.length ?
      searchImportHouseProjectRet.length : offset + pageSize

  tableData.value = searchImportHouseProjectRet.slice(offset, last)
  tableDataSum.value = searchImportHouseProjectRet.length
}

function saasHouseBookImportHouseLinkEvent(obj) {
  dialogJudgmentData.value.title = "关联烦房源项目"
  dialogJudgmentData.value.content = `确定要关联${obj.houseProjectName}吗？
  确认后项目中${obj.houseProjectNum}套房源将用于选房活动`
  dialogJudgmentData.value.trueLabel = `关联`
  dialogJudgmentData.value.falseLabel = `取消`

  emitter.emit("showDialogJudgmentEvent")
}

onMounted(() => {
  emitter.on('showImportHouseProjectEvent', showImportHouseProjectEvent)
  emitter.on('saasHouseBookImportHouseRenewTableEvent', saasHouseBookImportHouseRenewTableEvent)
  emitter.on('saasHouseBookImportHouseLinkEvent', saasHouseBookImportHouseLinkEvent)

  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('showImportHouseProjectEvent', showImportHouseProjectEvent)
  emitter.off('saasHouseBookImportHouseRenewTableEvent', saasHouseBookImportHouseRenewTableEvent)
  emitter.off('saasHouseBookImportHouseLinkEvent', saasHouseBookImportHouseLinkEvent)
})

</script>

<style lang="scss">
@import "@/styles/main-component-style";


</style>

<style scoped lang="scss">
@import "@/styles/main-component-style";


</style>