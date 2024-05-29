<template>
  <q-input v-model="dateConvertShow" color="grey" hide-bottom-space borderless
           :placeholder="placeholder"
           input-class="astercasc-input-inner-base"
           :input-style="inject('globalData').isMiniScreen ? {} : {width: componentWidth} ">
    <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                   style="background-color:transparent; border:0; padding:1rem;
                             box-shadow: 0 0 0; backdrop-filter:blur(0);"
                   @hide="saveDateTime()"
    >
      <div>
        <div class="row">
          <q-date
              :color="getColorFromStyleTheme()"
              class="q-mx-sm" :dark="styleModel === 'dark'"
              v-model="dateConvertDateInput">
          </q-date>
          <q-time
              :color="getColorFromStyleTheme()"
              class="q-mx-sm" :dark="styleModel === 'dark'"
              v-model="dateConvertTimeInput"
              format24h>
          </q-time>
        </div>
        <div class="row items-center justify-center q-my-md">
          <q-btn v-close-popup class="astercasc-simple-btn-margin-pri-mid"
                 label="保存" @click="saveDateTime()"/>
        </div>
      </div>
    </q-popup-proxy>
  </q-input>
</template>

<script setup>
import {defineEmits, defineProps, inject, onMounted, onUnmounted, ref, watch} from "vue";
import {date} from "quasar";
import {emitter} from "@/utils/bus";
import {getUserBehavior} from "@/utils/store";

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: "",
  },
  placeholder: {
    type: String,
    required: true
  },
  componentWidth: {
    type: String,
    required: false,
    default: "18rem"
  }
})

let styleModel = ref("")
let themeColor = ref("")

const emit = defineEmits(['time-change'])

let dateConvertShow = ref("")
let dateConvertDateInput = ref("")
let dateConvertTimeInput = ref("")

watch(
    () => props.value,
    (newValue) => {
      dateConvertShow.value = newValue

      let thisDate = date.extractDate(newValue, 'YYYY-MM-DD HH:mm')
      dateConvertDateInput.value = date.formatDate(thisDate, 'YYYY/MM/DD')
      dateConvertTimeInput.value = date.formatDate(thisDate, 'HH:mm')
    }
);

function initStyleTheme() {
  let userBehavior = getUserBehavior()
  styleModel.value = userBehavior.styleModel
  themeColor.value = userBehavior.themeColor
}

function getColorFromStyleTheme() {
  if (themeColor.value === 'green') {
    return 'green-10'
  }
  if (themeColor.value === 'blue') {
    return 'blue-8'
  }
  if (themeColor.value === 'orange') {
    return 'deep-orange-10'
  }
  return 'grey-10'
}

function saveDateTime() {
  if (dateConvertDateInput.value && dateConvertTimeInput.value) {
    const timeStamp = new Date(dateConvertDateInput.value + " " + dateConvertTimeInput.value)
    dateConvertShow.value = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')
    emit('time-change', dateConvertShow.value);
  }
}

onMounted(() => {
  initStyleTheme()
  emitter.on("changeStyleModelEvent", initStyleTheme)
  emitter.on("changeThemeColorEvent", initStyleTheme)
})

onUnmounted(() => {
  emitter.off("changeStyleModelEvent", initStyleTheme)
  emitter.off("changeThemeColorEvent", initStyleTheme)
})

</script>

<style lang="scss">
@import "@/styles/main-component-style";


</style>

<style scoped lang="scss">
@import "@/styles/main-component-style";


</style>