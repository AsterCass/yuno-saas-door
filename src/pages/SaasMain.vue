<template>
  <q-layout view="lHr LpR fff">

    <DashboardHeader/>
    <DashboardLeftMenu/>
    <DashboardRightMenu/>

    <q-page-container>
      <div class="q-mt-xl"/>
      <router-view/>
    </q-page-container>

    <!--    <q-footer/>-->
    <CopyrightFooter/>
  </q-layout>

  <!--  <CopyrightFooter/>-->

</template>

<script setup>
import CopyrightFooter from "@/components/CopyrightFooter.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import DashboardLeftMenu from "@/components/DashboardLeftMenu.vue";
import DashboardRightMenu from "@/components/DashboardRightMenu.vue";
</script>

<style scoped lang="scss">

</style>