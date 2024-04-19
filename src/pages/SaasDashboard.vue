<template>
  <q-layout view="lhr lpr lfr">

    <DashboardHeader/>
    <DashboardLeftMenu/>
    <DashboardRightMenu/>

    <q-page-container>
      <q-page-container>
        <q-page padding>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
            dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
            commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

<!--  <CopyrightFooter/>-->

</template>

<script setup>
// import CopyrightFooter from "@/components/CopyrightFooter.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import DashboardLeftMenu from "@/components/DashboardLeftMenu.vue";
import DashboardRightMenu from "@/components/DashboardRightMenu.vue";
</script>

<style scoped lang="scss">

</style>