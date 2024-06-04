<template>

  <div>

    <q-btn v-if="retDistrict" flat class="address-cascade-selector-btn" align="between"
           @click="openSelector">
      <div class="ellipsis col-10 row justify-start">
        <div>
          {{ retDistrict }}
        </div>
      </div>
      <div class="col-2">
        <q-btn style="margin-left: .8rem; color: #818181" round flat dense icon="cancel" @click="clearCode()"/>
      </div>
    </q-btn>

    <q-btn ref="addressCascadeMenu" v-else flat label="区域选择" class="address-cascade-selector-btn"
           align="between" icon-right="checklist">
      <q-menu class="astercasc-simple-card" :offset="[0, 5]">
        <q-list style="max-height: 25rem; width: 15rem; direction: rtl;overflow:auto;">

          <!--          <q-item v-show="showClear" style="direction:ltr;" clickable @click="clearCode()" v-close-popup>-->
          <!--            <q-item-section class="text-red-10">清除选择...</q-item-section>-->
          <!--          </q-item>-->

          <q-item style="direction:ltr;" v-for="(thisProvince, index) in provinceData" :key="index" clickable
                  @click="loadCityData(thisProvince.divisionCode)">
            <q-item-section>{{ thisProvince.divisionName }}</q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right"/>
            </q-item-section>

            <q-menu class="astercasc-simple-card" anchor="top end" self="top start" :offset="[5, 0]">
              <q-list style="max-height: 25rem; width: 10rem; direction: rtl;overflow:auto;">
                <q-item style="direction:ltr;" v-for="(thisCity, index) in cityData" :key="index"
                        clickable @click="loadDistrictData(thisCity.divisionCode)">
                  <q-item-section>{{ thisCity.divisionName }}</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right"/>
                  </q-item-section>
                  <q-menu class="astercasc-simple-card" anchor="top end" self="top start" :offset="[5, 0]">
                    <q-list style="max-height: 25rem; width: 10rem; direction: rtl;overflow:auto;">
                      <q-item style="direction:ltr;" v-for="(thisDistrict, index) in districtData" :key="index"
                              v-close-popup clickable @click="selectedCode(
                                  thisDistrict.fullName, thisDistrict.divisionCode)">
                        <q-item-section>{{ thisDistrict.divisionName }}</q-item-section>
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
import {divisionAddress} from "@/api/division";
import {useQuasar} from "quasar";
import {notifyTopWarning} from "@/utils/global-notify";


//notify
const notify = useQuasar().notify
const emit = defineEmits(['update-address'])

let provinceData = ref([])
let cityData = ref([])
let districtData = ref([])

let retDistrict = ref("")
let showClear = ref(false)

const addressCascadeMenu = ref(null);

function selectedCode(title, code) {
  retDistrict.value = title
  emit('update-address', code);
  delay(200).then(() => {
    showClear.value = true
  })
}

function clearCode() {
  retDistrict.value = ''
  emit('update-address', "");
  delay(200).then(() => {
    showClear.value = false
  })
}

function openSelector() {
  clearCode()
  delay(0).then(() => {
    if (addressCascadeMenu.value) {
      addressCascadeMenu.value.$el.click();
    }
  })

}

function loadDistrictData(cityCode) {
  divisionAddress({level: 2, divisionCode: cityCode.replace(/0+$/, '')}).then(data => {
    if (data && 200 === data.status) {
      if (data.data.length > 0) {
        districtData.value = data.data
      } else {
        districtData.value = []
      }
    }
  }).catch(() => {
    notifyTopWarning("获取地址数据失败，请重试", 2000, notify)
  });
}


function loadCityData(provinceCode) {
  divisionAddress({level: 1, divisionCode: provinceCode.substr(0, 2)}).then(data => {
    if (data && 200 === data.status) {
      if (data.data.length > 0) {
        cityData.value = data.data
      } else {
        cityData.value = [{divisionCode: provinceCode, divisionName: "市辖区"}]
      }
    }
  }).catch(() => {
    notifyTopWarning("获取地址数据失败，请重试", 2000, notify)
  });
}

function loadPrinceData() {
  divisionAddress({}).then(data => {
    if (data && 200 === data.status) {
      provinceData.value = data.data
    }
  }).catch(() => {
    notifyTopWarning("获取地址数据失败，请重试", 2000, notify)
  });
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