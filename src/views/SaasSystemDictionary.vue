<template>
  <div>

    <div class="q-ma-md row items-center">
      <q-input v-model="keyword" color="grey q-ma-sm" hide-bottom-space borderless
               placeholder="请输入字典名称查询"
               input-class="astercasc-input-inner-base"
               :input-style="inject('globalData').isMiniScreen ? {} : {width: '20rem'} "/>

      <div class="q-ma-sm">
        <q-btn class="astercasc-simple-btn-margin-pri-mid" label="查询" @click="search()"/>
      </div>

    </div>


    <div class="q-ma-lg">
      <ComplexTable v-if="mountTable"
                    :table-watch-data="tableWatchData"
                    :custom-slot="customColumnBuilder"
                    :table-base-info="userDictInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"
                    :custom-table-operation="customTableOperation"/>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted, onUnmounted, ref} from "vue";
import ComplexTable from "@/components/ComplexTable.vue";
import emitter from "@/utils/bus";
import {extend} from "quasar";
import {notifyTopWarning} from "@/utils/global-notify";
import {userDictList} from "@/api/user-dict";
import {UserDictColumns} from "@/constant/user-tables";
import {ComplexTableColumnEnum} from "@/constant/enums";


//table
const userDictInfo = ref({
  tableColumns: UserDictColumns,
  tableKey: "dictId",
  renewDataEmitStr: 'userDictRenewTableEvent',
  selectType: 'none',
  miniCardTitle: 'dictName',
})
const customColumnBuilder = [
  {
    name: "dictValueList",
    slotName: "body-cell-dictValueList",
    type: ComplexTableColumnEnum.EDIT_ICON,
    emitStr: 'saasSystemDictEditPairsEvent',
  },
]
const customTableOperation = [
  {
    label: '编辑',
    emitStr: 'saasSystemDictEditEvent',
  },
]
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)
let pageParam = ref({})
let tableWatchData = ref({inLoading: true})
//search
let keyword = ref("")

function search() {
  userDictRenewTableEvent(pageParam.value)
}


function userDictRenewTableEvent(param) {
  tableWatchData.value.inLoading = true
  if (param) {
    pageParam.value = param
  }
  userDictList(extend(true, {
    keyword: keyword.value,
  }, pageParam.value)).then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      let content = thisData.content
      for (let inData of content) {
        if (inData.pairList && 0 !== inData.pairList.length) {
          inData.dictValueList = ''
          for (let pair of inData.pairList) {
            inData.dictValueList += pair.value + "、"
          }
          inData.dictValueList = inData.dictValueList.slice(0, -1)
        }
        inData.dictMark = inData.dictMark ? inData.dictMark : '无'
      }
      tableData.value = content
      tableDataSum.value = thisData.totalElements
    }
    tableWatchData.value.inLoading = false
  }).catch(() => {
    notifyTopWarning("接口数据获取失败，请重试", 2000)
  });

}


onMounted(() => {
  emitter.on('userDictRenewTableEvent', userDictRenewTableEvent)
  mountTable.value = true
})

onUnmounted(() => {
  emitter.off('userDictRenewTableEvent', userDictRenewTableEvent)
})



</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>