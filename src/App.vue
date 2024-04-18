<template>
  <router-view/>
</template>

<script setup>
import {RouterView} from "vue-router";
import {onMounted} from "vue";
import {getStyleModel} from "@/utils/store";

function styleModelInit() {
  if (getStyleModel() === 'dark') {
    document.documentElement.classList.remove("yuno-light-model")
    document.documentElement.classList.add("yuno-dark-model")
  } else {
    document.documentElement.classList.remove("yuno-dark-model")
    document.documentElement.classList.add("yuno-light-model")
  }
}

onMounted(() => {
  styleModelInit()
})
</script>

<style lang="scss">
@import "@fontsource/roboto-slab/index.css";
@import "@/styles/base-style.scss";
</style>
