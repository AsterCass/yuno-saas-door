<template>
  <div>
    <q-dialog :model-value="showImportBookUser" @hide="closeImportBookUser"
              transition-show="fade" transition-hide="fade">
      <q-card class="astercasc-dialog-frame-standard">

        <h5 class="astercasc-theme-base" style="text-align: start">
          导入活动租客
        </h5>

        <q-separator inset class="q-ma-sm half-opacity" :dark="getUserBehavior().styleModel === 'dark'"/>

        <div class="q-mx-lg q-mt-lg q-mb-xs">

          <q-btn outline class="astercasc-outline-btn-margin-pri-mid" label="下载导入模板"
                 @click="downloadTemplate"/>

          <div class="q-ma-md"/>

          <q-file class="q-ma-md astercasc-input-inner-file" v-model="importUserData" borderless
                  accept=".xls,.xlsx" max-file-size="5120000" label-slot clearable
                  @rejected="notifyTopWarning('文件不满足条件，请重新上传', 3000, notify)"
                  style=" width: 30rem; height: 18rem;">
            <template v-slot:label>
              <div class="row" style="margin-top: 5rem;">
                <div>
                  将文件拖到此处，或点击上传，仅支持xls、xlsx格式
                </div>
                <ul>
                  <li>
                    文件大小不得超过5MB
                  </li>
                  <li>
                    文件中数据不能超过3000行
                  </li>
                </ul>
              </div>
            </template>
            <template v-slot:default>
              <div style="height: 18rem; width: 30rem;"/>
            </template>
          </q-file>

          <div v-show="errorList.length > 0" class="q-my-md">
            <div class="text-red-10" v-for="(item, index) in errorList" :key="index">
              * {{ item }}
            </div>
          </div>

          <div class="row justify-evenly q-mt-md">
            <q-btn outline class="astercasc-outline-btn-margin-pri-mid" label="取消" @click="closeImportBookUser"/>
            <q-btn class="astercasc-simple-btn-margin-pri-mid" label="提交" @click="submitImportBookUser"/>
          </div>


        </div>

      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import emitter from "@/utils/bus";
import {useQuasar} from "quasar";
import {notifyTopPositive, notifyTopWarning} from "@/utils/global-notify";
import {getUserBehavior} from "@/utils/store";
import {bookProjectUserImport} from "@/api/book-project-user";

const BASE_ADD = process.env.VUE_APP_BASE_ADD
//notify
const notify = useQuasar().notify
//input
let showImportBookUser = ref(false);
let importUserData = ref(null)
let thisProjectId = ref("")
let errorList = ref([])
let downloadUrl = ref("")


function downloadTemplate() {
  // bookProjectUserImportDownload().then(data => {
  //   const blob = new Blob([data], {type: 'application/vnd.ms-excel'});
  //   const downloadUrl = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = downloadUrl;
  //   link.setAttribute('download', 'template.xlsx');
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // }).catch(() => {
  //   notifyTopWarning("获取模板失败，请重试", 2000, notify)
  // });

  //todo this is template logic, use request for data need https
  const link = document.createElement('a');
  link.href = 'https://web-pulbic-read.obs.cn-southwest-2.myhuaweicloud.com/template/import-book-user.xlsx';
  link.setAttribute('download', 'template.xlsx');
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function submitImportBookUser() {
  if (!importUserData.value) {
    notifyTopWarning("导入文件不能为空", 2000, notify)
    errorList.value = []
    return
  }
  const formData = new FormData();
  formData.append('file', importUserData.value);
  bookProjectUserImport(thisProjectId.value, formData).then(data => {
    if (data && 200 === data.status) {
      notifyTopPositive("导入成功", 2000, notify)
      showImportBookUser.value = false
      emitter.emit("saasHouseBookProjectBookUserRenewTableEvent")
    } else if (data && 550 === data.status) {
      errorList.value = JSON.parse(data.message)
    }
  }).catch(() => {
    notifyTopWarning("导入失败，请重试", 2000, notify)
  });
}

function closeImportBookUser() {
  importUserData.value = null
  errorList.value = []
  showImportBookUser.value = false
}

function showImportBookUserEvent(projectId) {
  thisProjectId.value = projectId
  showImportBookUser.value = true
}

onMounted(() => {
  downloadUrl.value = BASE_ADD + "book/admin/project/user/import/download/auth"
  emitter.on('showImportBookUserEvent', showImportBookUserEvent)
})

onUnmounted(() => {
  emitter.off('showImportBookUserEvent', showImportBookUserEvent)
})

</script>

<style lang="scss">
@import "@/styles/main-component-style";


</style>

<style scoped lang="scss">
@import "@/styles/main-component-style";


</style>