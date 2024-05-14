<template>
  <div>
    <div class="q-ma-md">
      <q-btn class=" astercasc-simple-btn-margin-pri-mid" label="创建模板"
             @click="toSpecifyPage(thisRouter, 'saasApprovalTemplatesNew')"/>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {toSpecifyPage} from "@/router";

const thisRouter = useRouter()

</script>

<style scoped lang="scss">

</style>