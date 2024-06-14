<template>

  <div v-if="inject('globalData').isMiniScreen">

    <div v-if="tableData && tableData.length > 0">
      <div class="row justify-evenly">
        <div v-for="(data, index) in tableData" :key="index">
          <q-card class="astercasc-list-mini-card-standard">

            <div class="row items-center justify-between astercasc-list-mini-card-standard-header">
              <div v-if="miniData.titleData" class="row justify-start q-px-md">
                <div v-if="miniData.titleData.miniCardHaveLabel">
                  {{ miniData.titleData.label }} ：
                </div>
                <div>
                  {{ data[miniData.titleData.name] }}
                </div>
              </div>
              <div v-if="'multiple' === tableBaseInfo.selectType" class="row justify-center q-mx-md">
                <q-checkbox dense class="astercasc-header-checkbox" keep-color v-model="data.webChecked"
                            @click="localMultiSelect = tableData.filter(obj => obj['webChecked'])"/>
              </div>
              <div v-if="miniData.subscriptData" class="row justify-end q-px-md">
                <div v-if="miniData.subscriptData.miniCardHaveLabel">
                  {{ miniData.subscriptData.label }} ：
                </div>
                <div>
                  {{ data[miniData.subscriptData.name] }}
                </div>
              </div>
            </div>

            <div class="astercasc-list-mini-card-standard-body">
              <div v-for="(col, colIndex) in miniData.stdData"
                   :key="colIndex" class="row justify-start">
                <div v-if="col.miniCardHaveLabel">
                  {{ col.label }} ：
                </div>
                <div v-if="customSlot && customSlot.some(obj=>obj['name'] === col.name)">
                  <div style="color: #1976D2; cursor: pointer"
                       @click="emitter.emit(props.customSlot.find(obj=>obj['name'] === col.name).emitStr, data)">
                    {{ data[col.name] }}
                  </div>
                </div>
                <div v-else>
                  {{ data[col.name] }}
                </div>
              </div>
            </div>

            <div class="row justify-end q-mr-md">
              <div v-show="!operation.showCondition ||  data[operation.showCondition]"
                   v-for="(operation, index) in customTableOperation" :key="index"
                   style="color: #1976D2; cursor: pointer; margin: 0 .2rem"
                   @click="emitter.emit(operation.emitStr, data)">
                {{ operation.label }}
              </div>
            </div>

            <q-separator inset class="q-ma-sm half-opacity" :dark="getUserBehavior().styleModel === 'dark'"/>

            <div class="row q-px-sm justify-between">
              <div class="q-pr-md q-pl-xs">
                <div v-if="miniData.footerLeftData" class="row justify-start">
                  <div v-if="miniData.footerLeftData.miniCardHaveLabel">
                    {{ miniData.footerLeftData.label }} ：
                  </div>
                  <div>
                    {{ data[miniData.footerLeftData.name] }}
                  </div>
                </div>
              </div>
              <div class="q-px-md">
                <div v-if="miniData.footerMiddleData" class="row justify-center">
                  <div v-if="miniData.footerMiddleData.miniCardHaveLabel">
                    {{ miniData.footerMiddleData.label }} ：
                  </div>
                  <div>
                    {{ data[miniData.footerMiddleData.name] }}
                  </div>
                </div>
              </div>
              <div class="q-pl-md q-pr-xs">
                <div v-if="miniData.footerRightData" class="row justify-end">
                  <div v-if="miniData.footerRightData.miniCardHaveLabel">
                    {{ miniData.footerRightData.label }} ：
                  </div>
                  <div>
                    {{ data[miniData.footerRightData.name] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="astercasc-list-mini-card-standard-tail"/>

          </q-card>
        </div>
      </div>
      <div class="astercasc-simple-table-bottom-pri">
        <div class="row justify-between items-center q-mx-lg">
          <div class="row justify-start items-center q-my-sm">
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
          <div class="row justify-end items-center q-my-sm">
            <div class="q-mr-md">
              数据总条数：{{ tableDataSum }}
            </div>
            <div>
              <q-pagination
                  v-model="pageNo" :max="Math.ceil(tableDataSum / pageSize)" :max-pages="8"
                  boundary-numbers directionLinks size=".85rem"
                  @update:modelValue="toNewPage()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="full-width row flex-center q-mt-md q-mb-lg items-center">
        <q-icon size="2.5rem" class="q-mr-md" name="fa-solid fa-triangle-exclamation"/>
        <div style="font-size: 2rem">
          无可获得数据
        </div>
      </div>
    </div>


  </div>

  <q-table v-else
           card-class="astercasc-simple-table-pri"
           table-header-class="astercasc-simple-table-header-pri"
           :loading="tableWatchData.inLoading"
           :rows="tableData"
           :columns="tableBaseInfo.tableColumns"
           :row-key="tableBaseInfo.tableKey"
           :pagination="{rowsPerPage: 0}"
           :selection="tableBaseInfo.selectType"
           v-model:selected="localMultiSelect"
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
            <div class="q-mr-md">
              数据总条数：{{ tableDataSum }}
            </div>
            <div>
              <q-pagination
                  v-model="pageNo" :max="Math.ceil(tableDataSum / pageSize)" :max-pages="8"
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

    <template v-slot:no-data>
      <div class="full-width row flex-center q-mt-md q-mb-lg items-center">
        <q-icon size="1.2rem" class="q-mr-sm" name="fa-solid fa-triangle-exclamation"/>
        <h6>
          无可获得数据
        </h6>
      </div>
    </template>

    <template v-for="(thisSlot, index) in customSlot" :key="index" v-slot:[thisSlot.slotName]="props">
      <q-td :props="props">
        <div v-if="thisSlot.type === ComplexTableColumnEnum.POINTED" style="color: #1976D2; cursor: pointer"
             @click="emitter.emit(thisSlot.emitStr, props.row)">
          {{ props.row[thisSlot.name] }}
        </div>
        <div v-else-if="thisSlot.type === ComplexTableColumnEnum.STYLE"
             :style="thisSlot.style[props.row[thisSlot.name]].style">
          {{ thisSlot.style[props.row[thisSlot.name]].content }}
        </div>
        <div v-else-if="thisSlot.type === ComplexTableColumnEnum.EDIT_ICON">
          <div class="row justify-center items-center">
            <div>
              {{ props.row[thisSlot.name] }}
            </div>
            <q-btn class="q-mx-xs" round size=".5rem" dense flat icon="fa-solid fa-pen-to-square"
                   style="color: #1976D2"
                   @click="emitter.emit(thisSlot.emitStr, props.row)"/>
          </div>
        </div>
        <div v-else>
          {{ props.row[thisSlot.name] }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-operation="props">
      <q-td :props="props">
        <div class="row justify-center">
          <div v-show="!operation.showCondition ||  props.row[operation.showCondition]"
               v-for="(operation, index) in customTableOperation" :key="index"
               style="color: #1976D2; cursor: pointer; margin: 0 .2rem"
               @click="emitter.emit(operation.emitStr, props.row)">
            {{ operation.label }}
          </div>
        </div>

      </q-td>
    </template>

  </q-table>


</template>

<script setup>
import {defineEmits, defineExpose, defineProps, inject, onMounted, ref, watch} from "vue";
import emitter from "@/utils/bus";
import {getUserBehavior} from "@/utils/store";
import {ComplexTableColumnEnum} from "@/constant/enums";

const props = defineProps({
  customSlot: {
    type: Array,
    required: false,
    default: () => [],
  },
  customTableOperation: {
    type: Array,
    required: false,
    default: () => [],
  },
  tableBaseInfo: {
    type: Object,
    required: true,
    default: () => {
    },
  },
  tableWatchData: {
    type: Object,
    required: false,
    default: () => {
      return {inLoading: false}
    },
  },
  tableData: {
    type: Array,
    required: false,
    default: () => [],
  },
  tableDataSum: {
    type: Number,
    required: false,
    default: 0,
  },
})

let pageSize = ref(10)
let pageNo = ref(1)
let localMultiSelect = ref([])

let miniData = ref({
  titleData: null,
  subscriptData: null,
  stdData: [],
  footerLeftData: null,
  footerMiddleData: null,
  footerRightData: null,
})

const emit = defineEmits(['multiSelectChange'])
watch(localMultiSelect, () => {
  for (let data of props.tableData) {
    for (let changeData of localMultiSelect.value) {
      data.webChecked =
          data[props.tableBaseInfo.tableKey] === changeData[props.tableBaseInfo.tableKey]
      if (data.webChecked) {
        break
      }
    }
  }
  emit('multiSelectChange', localMultiSelect.value);
})

function clearSelected() {
  localMultiSelect.value = []
}

function toNewPage() {
  emitter.emit(props.tableBaseInfo.renewDataEmitStr,
      {pageNo: pageNo.value, pageSize: pageSize.value})
}

function buildMiniData() {
  let miniCardTitle = props.tableBaseInfo.miniCardTitle
  for (let key of props.tableBaseInfo.tableColumns) {
    if (key.name === miniCardTitle) {
      miniData.value.titleData = key
    } else if (key.miniCardSite === 'subscript') {
      miniData.value.subscriptData = key
    } else if (key.miniCardSite === 'footerRight') {
      miniData.value.footerRightData = key
    } else if (key.miniCardSite === 'footerLeft') {
      miniData.value.footerLeftData = key
    } else if (key.miniCardSite === 'footerMiddle') {
      miniData.value.footerMiddleData = key
    } else {
      miniData.value.stdData.push(key)
    }
  }
}

function updatePageSize(size) {
  pageSize.value = size;
  pageNo.value = 1
  toNewPage()
}

onMounted(() => {
  buildMiniData()
  toNewPage()
})

defineExpose({
  clearSelected
})


</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>