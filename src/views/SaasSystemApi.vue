<template>
  <div>


    <div class="q-ma-lg">
      <ComplexTable v-if="mountTable" :table-base-info="userApiInfo"
                    :table-data="tableData"
                    :table-data-sum="tableDataSum"/>
    </div>
  </div>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import {UserApiColumns} from "@/constant/user-tables";
import ComplexTable from "@/components/ComplexTable.vue";
import emitter from "@/utils/bus";
import {notifyTopWarning} from "@/utils/global-notify";
import {userApiList} from "@/api/user-api";

//table
const userApiInfo = ref({
  tableColumns: UserApiColumns,
  tableKey: "apiId",
  renewDataEmitStr: 'userApiRenewTableEvent',
  selectType: 'none',
  miniCardTitle: 'apiName',
})
let mountTable = ref(false)
let tableData = ref([])
let tableDataSum = ref(0)


function userApiRenewTableEvent() {
  userApiList().then(data => {
    if (data && 200 === data.status) {
      let thisData = data.data
      tableData.value = thisData
      tableDataSum.value = thisData.length
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