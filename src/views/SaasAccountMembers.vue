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
                v-model="orderStatus" :options="orderStatusOpt"
                popup-content-class="astercasc-simple-card" menu-anchor="bottom start" :menu-offset="[0, 5]"
      />

      <div class="q-ma-md">
        <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="查询" @click="searchOrder()"/>
      </div>

    </div>

    <div class="row q-mt-md q-ml-lg ">
      <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="导入用户"
             @click="emitter.emit('showSaasImportUserEvent')"/>
      <div class="q-mx-md"/>
      <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="新增用户"
             @click="emitter.emit('showSaasNewUserEvent')"/>
    </div>


    <div class="q-ma-lg">
      <q-table
          card-class="astercasc-simple-table-pri"
          table-header-class="astercasc-simple-table-header-pri"
          :rows="testRow"
          :columns="projectColumns"
          row-key="orderNo"
          selection="multiple"
          v-model:selected="multiSelect"
          :pagination="{rowsPerPage: 0}"

      >
        <template v-slot:bottom>
          <div class="astercasc-simple-table-bottom-pri">

            <div class="row justify-between items-center q-mx-lg">
              <div class="row justify-start items-center">
                <div>
                  单页容量：
                </div>
                <q-btn :class="pageSize === 5 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                       flat round dense class="q-mx-sm" label="5" @click="updatePageSize(5)"/>
                <q-btn :class="pageSize === 10 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                       flat round dense class="q-mx-sm" label="10" @click="updatePageSize(10)"/>
                <q-btn :class="pageSize === 20 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                       flat round dense class="q-mx-sm" label="20" @click="updatePageSize(20)"/>
                <q-btn :class="pageSize === 30 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                       flat round dense class="q-mx-sm" label="30" @click="updatePageSize(30)"/>
                <q-btn :class="pageSize === 50 ? 'astercasc-simple-table-bottom-selected-contain' : ''"
                       flat round dense class="q-mx-sm" label="50" @click="updatePageSize(50)"/>
              </div>
              <div class="row justify-end items-center">
                <div>
                  <q-pagination
                      v-model="pageNo" :max="pageSum" :max-pages="8"
                      boundary-numbers directionLinks size=".85rem"
                      @update:modelValue="toNewPage()"
                  />
                </div>
              </div>
            </div>
            <div class="astercasc-simple-table-bottom-line"/>
          </div>


        </template>
        <template v-slot:header-selection="scope">
          <q-checkbox class="astercasc-header-checkbox" keep-color v-model="scope.selected"/>
        </template>
      </q-table>
    </div>


  </div>

  <SaasImportUser/>
  <SaasNewUser/>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {searchOrderRet} from "@/mock/account";
import SaasImportUser from "@/components/SaasImportUser.vue";
import SaasNewUser from "@/components/SaasNewUser.vue";
import emitter from "@/utils/bus";


const orderStatusOpt = ref([
  {
    label: '待验房',
    value: 1,
  },
  {
    label: '待签约',
    value: 2,
  },
  {
    label: '已完成',
    value: 3,
  },
  {
    label: '已取消',
    value: 4,
  },
])

const projectColumns = ref([
  {
    name: 'orderNo',
    required: true,
    label: '订单编号',
    align: 'center',
    field: 'orderNo',
  },
  {
    name: 'projectNo',
    required: true,
    label: '活动编号',
    align: 'center',
    field: 'projectNo',
  },
  {
    name: 'projectName',
    required: false,
    label: '活动名称',
    align: 'center',
    field: 'projectName',
  },
  {
    name: 'houseNo',
    required: false,
    label: '房源编号',
    align: 'center',
    field: 'houseNo',
  },
  {
    name: 'houseProfile',
    required: false,
    label: '房源信息',
    align: 'center',
    field: 'houseProfile',
  },
  {
    name: 'bookUserName',
    required: false,
    label: '姓名',
    align: 'center',
    field: 'bookUserName',
  },
  {
    name: 'bookUserPhone',
    required: false,
    label: '手机号',
    align: 'center',
    field: 'bookUserPhone',
  },
  {
    name: 'bookUserIdCard',
    required: false,
    label: '身份证号',
    align: 'center',
    field: 'bookUserIdCard',
  },
  {
    name: 'orderStatus',
    required: false,
    label: '订单状态',
    align: 'center',
    field: 'orderStatus',
  },
  {
    name: 'createTime',
    required: false,
    label: '创建时间',
    align: 'center',
    field: 'createTime',
  },
])

const testRow = ref([])

let orderSearchNo = ref("")
let orderSearchKey = ref("")
let orderStatus = ref()
let multiSelect = ref([])

let pageSize = ref(10)
let pageNo = ref(1)
let pageSum = ref(1)

function searchOrder() {
  console.log(orderSearchKey.value, orderStatus.value, orderSearchNo.value)
}

function toNewPage() {
  let offset = (pageNo.value - 1) * pageSize.value
  let last = offset + pageSize.value > searchOrderRet.length ? searchOrderRet.length : offset + pageSize.value

  console.log(offset, last)
  testRow.value = searchOrderRet.slice(offset, last)
}

function updatePageSize(size) {
  pageSize.value = size;
  pageNo.value = 1

  pageSum.value = searchOrderRet.length / pageSize.value + 1
  toNewPage()
}

onMounted(() => {
  pageSum.value = searchOrderRet.length / pageSize.value + 1
  toNewPage()
})


</script>
<style scoped lang="scss">
@import "@/styles/theme-style";

</style>

<style lang="scss">
@import "@/styles/theme-style";


</style>