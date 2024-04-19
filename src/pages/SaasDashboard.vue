<template>
  <q-layout view="lhr lpr lfr">

    <DashboardHeader/>
    <DashboardLeftMenu/>
    <DashboardRightMenu/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

  <CopyrightFooter/>

</template>

<script setup>
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import DashboardLeftMenu from "@/components/DashboardLeftMenu.vue";
import DashboardRightMenu from "@/components/DashboardRightMenu.vue";
</script>

<style scoped lang="scss">

</style>