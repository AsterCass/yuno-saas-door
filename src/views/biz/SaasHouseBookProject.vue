<template>
  <div>

    <div class="row items-center">
      <q-input v-model="projectSearchKey" color="grey q-ma-md" hide-bottom-space borderless
               placeholder="请输入活动编号、活动名称查询"
               input-class="astercasc-input-inner-base"
               :input-style="inject('globalData').isMiniScreen ? {} : {width: '20rem'} "/>

      <q-select standout dense label="进行状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="projectProcessStatus" :options="projectProcessStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />

      <q-select standout dense label="上架状态" class="q-ma-md astercasc-simple-select-margin-pri"
                v-model="projectStatus" :options="projectStatusOpt" clearable
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />

      <div class="q-ma-md">
        <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchProject()"/>
      </div>


    </div>

    <div class="q-mx-lg">
      <q-btn class="astercasc-simple-btn-margin-pri" label="新增活动"
             @click="toSpecifyPage(thisRouter, 'saasHouseBookProjectNew')"/>
    </div>


    <div class="q-mx-lg q-mt-md">
      <AnnouncementInPage :text-list="['活动创建完成后，默认为下架状态，仅已上架且进行中的活动会展示给租客',
       '进行中的活动不允许编辑/删除，仅允许上下架']"/>
    </div>


    <div class="q-mx-lg q-mt-md">
      <ComplexTable v-if="mountTable" :custom-slot="customColumnBuilder"
                    :custom-table-operation="customTableOperation"
                    :table-base-info="tableBaseInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"/>
    </div>

    <div class="q-py-lg"/>


  </div>

  <DialogJudgment :dialog-judgment-data="dialogJudgmentData"
                  :callback-method="deleteProjectDialog"
                  emit-str="showDialogJudgmentEvent"/>
</template>

<script setup>
import {inject, onMounted, onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
import {toSpecifyPage, toSpecifyPageWithQuery} from "@/router";
import ComplexTable from "@/components/ComplexTable.vue";
import {
  ComplexTableColumnEnum,
  ProjectProcessStatusEnum,
  projectProcessStatusOpt,
  ProjectStatusEnum,
  projectStatusOpt
} from "@/constant/enums";
import emitter from "@/utils/bus";
import {bookHouseProjectColumns} from "@/constant/tables";
import DialogJudgment from "@/components/DialogJudgment.vue";
import {extend, useQuasar} from "quasar";
import {notifyTopPositive, notifyTopWarning} from "@/utils/global-notify";
import {bookProjectDelete, bookProjectDown, bookProjectList, bookProjectUp} from "@/api/book-project";
import AnnouncementInPage from "@/components/AnnouncementInPage.vue";

//notify
const notify = useQuasar().notify
const thisRouter = useRouter()
//table
const tableBaseInfo = ref({
  tableColumns: bookHouseProjectColumns,
  tableKey: "projectId",
  renewDataEmitStr: 'saasHouseBookProjectRenewTableEvent',
  selectType: 'none',
  miniCardTitle: 'projectName',
})
const customColumnBuilder = [
  {
    name: "houseSum",
    slotName: "body-cell-houseSum",
    type: ComplexTableColumnEnum.POINTED,
    emitStr: 'saasHouseBookProjectToProjectHouseEvent',
  },
  {
    name: "personSum",
    slotName: "body-cell-personSum",
    type: ComplexTableColumnEnum.POINTED,
    emitStr: 'saasHouseBookProjectToProjectBookUserEvent',
  },
]
const customTableOperation = [
  {
    label: '上架',
    emitStr: 'saasHouseBookProjectUpEvent',
    showCondition: 'inDownStyle'
  },
  {
    label: '下架',
    emitStr: 'saasHouseBookProjectDownEvent',
    showCondition: 'inUpStyle'
  },
  {
    label: '详情',
    emitStr: 'saasHouseBookProjectDetailEvent',
    showCondition: 'allowDetail'
  },
  {
    label: '编辑',
    emitStr: 'saasHouseBookProjectEditEvent',
    showCondition: 'allowDeleteEdit'
  },
  {
    label: '删除',
    emitStr: 'saasHouseBookProjectDeleteEvent',
    showCondition: 'allowDeleteEdit'
  }
]
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
//search
let projectSearchKey = ref("")
let projectProcessStatus = ref(null)
let projectStatus = ref(null)
let pageParam = ref({})
//judgement dialog
let dialogJudgmentData = ref({})


function searchProject() {
  saasHouseBookProjectRenewTableEvent(pageParam.value)
}

function deleteProjectDialog(isDo) {
  if (isDo) {
    bookProjectDelete(dialogJudgmentData.value.projectId).then(data => {
      if (data && 200 === data.status) {
        notifyTopPositive("刪除成功", 2000, notify)
        saasHouseBookProjectRenewTableEvent(pageParam.value)
      }
    }).catch(() => {
      notifyTopWarning("删除失败，请重试", 2000, notify)
    });
  }
  emitter.emit("showDialogJudgmentEvent", false)
}

function saasHouseBookProjectToProjectHouseEvent(map) {
  toSpecifyPageWithQuery(thisRouter, 'saasHouseBookProjectHouse',
      {id: map.projectId, houseSum: map.houseSum})
}

function saasHouseBookProjectToProjectBookUserEvent(map) {
  toSpecifyPageWithQuery(thisRouter, 'saasHouseBookProjectBookUser', {id: map.projectId})
}

function saasHouseBookProjectUpEvent(map) {
  bookProjectUp(map.projectId).then(data => {
    if (data && 200 === data.status) {
      notifyTopPositive("上架成功", 2000, notify)
      saasHouseBookProjectRenewTableEvent(pageParam.value)
    }
  }).catch(() => {
    notifyTopWarning("上架失败，请重试", 2000, notify)
  });

}

function saasHouseBookProjectDownEvent(map) {
  bookProjectDown(map.projectId).then(data => {
    if (data && 200 === data.status) {
      notifyTopPositive("下架成功", 2000, notify)
      saasHouseBookProjectRenewTableEvent(pageParam.value)
    }
  }).catch(() => {
    notifyTopWarning("下架失败，请重试", 2000, notify)
  });
}

function saasHouseBookProjectEditEvent(map) {
  toSpecifyPageWithQuery(thisRouter, 'saasHouseBookProjectNew', {id: map.projectId})
}

function saasHouseBookProjectDetailEvent(map) {
  toSpecifyPageWithQuery(thisRouter, 'saasHouseBookProjectDetail', {id: map.projectId})
}

function saasHouseBookProjectDeleteEvent(map) {
  dialogJudgmentData.value.title = "删除活动"
  dialogJudgmentData.value.content = `确认是否删除活动“${map.projectName}”`
  dialogJudgmentData.value.trueLabel = `删除`
  dialogJudgmentData.value.falseLabel = `取消`
  dialogJudgmentData.value.projectId = map.projectId

  emitter.emit("showDialogJudgmentEvent")
}

function saasHouseBookProjectRenewTableEvent(param) {
  if (param) {
    pageParam.value = param
  }
  bookProjectList(extend(true, {
    projectKeyword: projectSearchKey.value,
    projectProcessStatus: null == projectProcessStatus.value ? null : projectProcessStatus.value.value,
    projectStatus: null == projectStatus.value ? null : projectStatus.value.value,
  }, pageParam.value)).then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      let content = thisData.content
      for (let inData of content) {
        inData.projectProcessStatusName = ProjectProcessStatusEnum.getDesc(inData.projectProcessStatus)
        inData.projectStatusName = ProjectStatusEnum.getDesc(inData.projectStatus)
        if (inData.projectStatus === ProjectStatusEnum.DOWN.code) {
          inData.inDownStyle = true
        } else {
          inData.inUpStyle = true
        }
        if (inData.projectProcessStatus === ProjectProcessStatusEnum.WILL.code) {
          inData.allowDeleteEdit = true
        } else {
          inData.allowDetail = true
        }
      }
      tableData.value = content
      tableDataSum.value = thisData.totalElements
    }
  }).catch(() => {
    notifyTopWarning("更新失败，请重试", 2000, notify)
  });
}


onMounted(() => {
  emitter.on('saasHouseBookProjectToProjectHouseEvent', saasHouseBookProjectToProjectHouseEvent)
  emitter.on('saasHouseBookProjectToProjectBookUserEvent', saasHouseBookProjectToProjectBookUserEvent)
  emitter.on('saasHouseBookProjectUpEvent', saasHouseBookProjectUpEvent)
  emitter.on('saasHouseBookProjectDownEvent', saasHouseBookProjectDownEvent)
  emitter.on('saasHouseBookProjectEditEvent', saasHouseBookProjectEditEvent)
  emitter.on('saasHouseBookProjectDetailEvent', saasHouseBookProjectDetailEvent)
  emitter.on('saasHouseBookProjectDeleteEvent', saasHouseBookProjectDeleteEvent)
  emitter.on('saasHouseBookProjectRenewTableEvent', saasHouseBookProjectRenewTableEvent)

  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('saasHouseBookProjectToProjectHouseEvent', saasHouseBookProjectToProjectHouseEvent)
  emitter.off('saasHouseBookProjectToProjectBookUserEvent', saasHouseBookProjectToProjectBookUserEvent)
  emitter.off('saasHouseBookProjectUpEvent', saasHouseBookProjectUpEvent)
  emitter.off('saasHouseBookProjectDownEvent', saasHouseBookProjectDownEvent)
  emitter.off('saasHouseBookProjectEditEvent', saasHouseBookProjectEditEvent)
  emitter.off('saasHouseBookProjectDetailEvent', saasHouseBookProjectDetailEvent)
  emitter.off('saasHouseBookProjectDeleteEvent', saasHouseBookProjectDeleteEvent)
  emitter.off('saasHouseBookProjectRenewTableEvent', saasHouseBookProjectRenewTableEvent)
})



</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>