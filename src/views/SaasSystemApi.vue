<template>
  <div>

    <div class="q-ma-md row items-center">
      <q-input v-model="keyword" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入接口名称查询"
               input-class="astercasc-input-inner-base"
               :input-style="inject('globalData').isMiniScreen ? {} : {width: '20rem'} "/>

      <div class="q-ma-sm">
        <q-btn class="astercasc-simple-btn-margin-pri-mid" label="查询" @click="search()"/>
      </div>

    </div>


    <div class="q-ma-lg">
      <ComplexTable v-if="mountTable"
                    :custom-slot="customColumnBuilder"
                    :table-base-info="userApiInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"
                    :custom-table-operation="customTableOperation"/>
    </div>
  </div>
</template>

<script setup>


import {inject, onMounted, onUnmounted, ref} from "vue";
import {UserApiColumns} from "@/constant/user-tables";
import ComplexTable from "@/components/ComplexTable.vue";
import emitter from "@/utils/bus";
import {notifyTopWarning} from "@/utils/global-notify";
import {userApiList} from "@/api/user-api";
import {extend} from "quasar";
import {ComplexTableColumnEnum} from "@/constant/enums";

//table
const userApiInfo = ref({
  tableColumns: UserApiColumns,
  tableKey: "apiId",
  renewDataEmitStr: 'userApiRenewTableEvent',
  selectType: 'none',
  miniCardTitle: 'apiName',
})
const customColumnBuilder = [
  {
    name: "statusName",
    slotName: "body-cell-statusName",
    type: ComplexTableColumnEnum.STYLE,
    style: {0: {content: "正常", style: "color: #2e7d32"}, 1: {content: "停用", style: "color: #d84315"}},
  },
]
const customTableOperation = [
  {
    label: '编辑',
    emitStr: 'saasSystemApiEditEvent',
  },
]
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
let pageParam = ref({})
//search
let keyword = ref("")

function search() {
  userApiRenewTableEvent(pageParam.value)
}


function userApiRenewTableEvent(param) {
  if (param) {
    pageParam.value = param
  }
  userApiList(extend(true, {
    keyword: keyword.value,
  }, pageParam.value)).then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      let content = thisData.content
      for (let inData of content) {
        inData.statusName = inData.status
      }
      tableData.value = content
      tableDataSum.value = thisData.totalElements
    }
  }).catch(() => {
    notifyTopWarning("接口数据获取失败，请重试", 2000)
  });

}


onMounted(() => {
  emitter.on('userApiRenewTableEvent', userApiRenewTableEvent)
  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('userApiRenewTableEvent', userApiRenewTableEvent)
})


</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>