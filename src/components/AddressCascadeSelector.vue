<template>

  <div>
    <q-btn flat :label="retDistrict" class="address-cascade-selector-btn"
           align="between" icon-right="checklist">
      <q-menu class="astercasc-simple-card" :offset="[0, 5]">
        <q-list style="max-height: 20rem; width: 15rem; direction: rtl;overflow:auto;">

          <q-item v-show="showClear" style="direction:ltr;" clickable @click="clearCode()" v-close-popup>
            <q-item-section class="text-red-10">清除选择...</q-item-section>
          </q-item>

          <q-item style="direction:ltr;" v-for="(thisProvince, index) in provinceData" :key="index" clickable
                  @click="loadCityData(thisProvince.code)">
            <q-item-section>{{ thisProvince.label }}</q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right"/>
            </q-item-section>

            <q-menu class="astercasc-simple-card" anchor="top end" self="top start" :offset="[5, 0]">
              <q-list style="max-height: 20rem; width: 10rem; direction: rtl;overflow:auto;">
                <q-item style="direction:ltr;" v-for="(thisCity, index) in cityData" :key="index"
                        clickable @click="loadDistrictData(thisCity.code)">
                  <q-item-section>{{ thisCity.label }}</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right"/>
                  </q-item-section>
                  <q-menu class="astercasc-simple-card" anchor="top end" self="top start" :offset="[5, 0]">
                    <q-list style="max-height: 20rem; width: 10rem; direction: rtl;overflow:auto;">
                      <q-item style="direction:ltr;" v-for="(thisDistrict, index) in districtData" :key="index"
                              v-close-popup clickable @click="selectedCode(
                                  thisProvince.label+ '/' + thisCity.label + '/' + thisDistrict.label,
                                  thisDistrict.code)">
                        <q-item-section>{{ thisDistrict.label }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
              </q-list>
            </q-menu>

          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>

</template>

<script setup>

import {defineEmits, onMounted, ref} from "vue";
import {delay} from "@/utils/delay-exe";


const emit = defineEmits(['update-address'])

let provinceData = ref([])
let cityData = ref([])
let districtData = ref([])

let retDistrict = ref("区域选择")
let showClear = ref(false)

function selectedCode(title, code) {
  retDistrict.value = title
  emit('update-address', code);
  delay(200).then(() => {
    showClear.value = true
  })
}

function clearCode() {
  retDistrict.value = "区域选择"
  emit('update-address', "");
  delay(200).then(() => {
    showClear.value = false
  })
}

function loadDistrictData(cityCode) {
  if ("1101" === cityCode) {
    districtData.value = [
      {
        code: "110101",
        label: "东城区",
      },
      {
        code: "110102",
        label: "西城区",
      },
    ]
  } else if ("1301" === cityCode) {
    districtData.value = [
      {
        code: "130102",
        label: "长安区",
      },
      {
        code: "130104",
        label: "桥西区",
      },
    ]
  } else if ("1302" === cityCode) {
    districtData.value = [
      {
        code: "130202",
        label: "路南区",
      },
      {
        code: "130203",
        label: "路北区",
      },
    ]
  } else if ("1303" === cityCode) {
    districtData.value = [
      {
        code: "130302",
        label: "海港区",
      },
      {
        code: "130303",
        label: "山海关区",
      },
    ]
  }
}


function loadCityData(provinceCode) {
  if ("11" === provinceCode) {
    cityData.value = [
      {
        code: "1101",
        label: "市辖区",
      }
    ]
  } else {
    cityData.value = [
      {
        code: "1301",
        label: "石家庄市",
      },
      {
        code: "1302",
        label: "唐山市",
      },
      {
        code: "1303",
        label: "秦皇岛市",
      },
    ]
  }
}

function loadPrinceData() {
  provinceData.value = [
    {
      code: "11",
      label: "北京市",
    },
    {
      code: "13",
      label: "河北省",
    },
  ]
}


onMounted(() => {
  loadPrinceData()
})

</script>

<style scoped lang="scss">
@import "@/styles/theme-style";

.address-cascade-selector-btn {
  font-size: .9rem;
  border-radius: .5rem;
  margin: .5rem;
  padding: 0 1rem;
  width: 15rem;
  height: 40px;
}

.yuno-light-model {
  .address-cascade-selector-btn {
    background-color: #d2d2d2;
    color: #545454;
  }
}

.yuno-dark-model {
  .address-cascade-selector-btn {
    background-color: #414141;
    color: #dddddd;
  }
}

::-webkit-scrollbar {
  width: 15px !important;
}


</style>

<style lang="scss">
@import "@/styles/theme-style";


</style>