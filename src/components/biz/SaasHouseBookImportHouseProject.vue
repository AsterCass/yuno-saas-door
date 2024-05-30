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
                   :input-style="inject('globalData').isMiniScreen ? {} : {width: '20rem'} "/>
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
import {defineProps, inject, onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {getUserBehavior} from "@/utils/store";
import ComplexTable from "@/components/ComplexTable.vue";
import {importHouseProjectColumns} from "@/constant/tables";
import {extend, useQuasar} from "quasar";
import DialogJudgment from "@/components/DialogJudgment.vue";
import {notifyTopPositive, notifyTopWarning} from "@/utils/global-notify";
import {projectHouseImportList, toImport, unImportAll} from "@/api/book-project-house";
import {toReplacePage} from "@/router";
import {useRouter} from "vue-router";


const props = defineProps({
  projectId: {
    type: String,
    required: true,
    default: ""
  },
  houseSum: {
    type: Number,
    required: true,
    default: 0,
  },
  houseProjectId: {
    type: String,
    required: false,
    default: ""
  }
})
//notify
const notify = useQuasar().notify
const thisRouter = useRouter()
//table
let tableBaseInfo = ref({
  tableColumns: importHouseProjectColumns,
  tableKey: "houseProjectId",
  renewDataEmitStr: 'saasHouseBookImportHouseRenewTableEvent',
  selectType: 'none',
  miniCardTitle: 'houseProjectName',
})
const customTableOperation = [
  {
    label: '确认关联',
    emitStr: 'saasHouseBookImportHouseLinkEvent',
    showCondition: 'isUnlink'
  },
  {
    label: '取消关联',
    emitStr: 'saasHouseBookImportHouseUnlinkEvent',
    showCondition: 'isLink'
  },
]
//search
let showImportHouseProject = ref(false);
let houseProjectSearchKey = ref("")
let pageParam = ref({})
//data
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
//judgement dialog
let dialogJudgmentData = ref({})

function searchHouseProject() {
  saasHouseBookImportHouseRenewTableEvent()
}

function linkHouseProjectDialog(isDo) {
  if (isDo) {
    toImport(props.projectId, dialogJudgmentData.value.thisHouseProjectId).then(data => {
      if (data && 200 === data.status) {
        notifyTopPositive("关联成功", 2000, notify)
        emitter.emit('saasHouseBookProjectBookHouseRenewTableEvent')
        toReplacePage(thisRouter, {id: props.projectId, houseSum: '1'})
      }
    }).catch(() => {
      notifyTopWarning("关联失败，请重试", 2000, notify)
    });
  } else {
    emitter.emit("showDialogJudgmentEvent", false)
  }
}


function closeImportHouseProjectEvent() {
  showImportHouseProject.value = false
}

function showImportHouseProjectEvent() {
  showImportHouseProject.value = true
}

function saasHouseBookImportHouseRenewTableEvent(param) {
  if (param) {
    pageParam.value = param
  }
  showImportHouseProject.value = true
  projectHouseImportList(extend(true, {
    importKeyword: null == houseProjectSearchKey.value ? null : houseProjectSearchKey.value,
    projectId: props.projectId
  }, pageParam.value)).then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      let content = thisData.content
      for (let inData of content) {
        if (props.houseSum > 0) {
          inData.isLink = inData.houseProjectId === props.houseProjectId
        } else {
          inData.isUnlink = true
        }
      }
      tableData.value = content
      tableDataSum.value = thisData.totalElements
    }
  }).catch(() => {
    notifyTopWarning("项目数据获取失败，请重试", 2000, notify)
  });
}

function saasHouseBookImportHouseLinkEvent(obj) {
  dialogJudgmentData.value.title = "关联房源项目"
  dialogJudgmentData.value.content = `确定要关联${obj.houseProjectName}吗？
  确认后项目中${obj.houseProjectNum}套房源将用于选房活动`
  dialogJudgmentData.value.trueLabel = `关联`
  dialogJudgmentData.value.falseLabel = `取消`
  dialogJudgmentData.value.thisHouseProjectId = obj.houseProjectId

  emitter.emit("showDialogJudgmentEvent")
}

function saasHouseBookImportHouseUnlinkEvent() {
  unImportAll(props.projectId, props.houseProjectId).then(data => {
    if (data && 200 === data.status) {
      notifyTopPositive("取消关联成功", 2000, notify)
      emitter.emit('saasHouseBookProjectBookHouseRenewTableEvent')
      toReplacePage(thisRouter, {id: props.projectId, houseSum: '0'})
    }
  }).catch(() => {
    notifyTopWarning("取消关联失败，请重试", 2000, notify)
  });
}

onMounted(() => {
  emitter.on('showImportHouseProjectEvent', showImportHouseProjectEvent)
  emitter.on('saasHouseBookImportHouseRenewTableEvent', saasHouseBookImportHouseRenewTableEvent)
  emitter.on('saasHouseBookImportHouseLinkEvent', saasHouseBookImportHouseLinkEvent)
  emitter.on('saasHouseBookImportHouseUnlinkEvent', saasHouseBookImportHouseUnlinkEvent)

  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('showImportHouseProjectEvent', showImportHouseProjectEvent)
  emitter.off('saasHouseBookImportHouseRenewTableEvent', saasHouseBookImportHouseRenewTableEvent)
  emitter.off('saasHouseBookImportHouseLinkEvent', saasHouseBookImportHouseLinkEvent)
  emitter.off('saasHouseBookImportHouseUnlinkEvent', saasHouseBookImportHouseUnlinkEvent)
})

</script>

<style lang="scss">
@import "@/styles/main-component-style";


</style>

<style scoped lang="scss">
@import "@/styles/main-component-style";


</style>