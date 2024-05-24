<template>

  <div v-show="textList.length > 0" class="astercasc-announcement-in-page">
    <ul>
      <li v-for="(text, index) in textList" :key="index">
        <p>{{ text }}</p>
      </li>
    </ul>
  </div>

</template>


<script setup>
import {defineProps} from "vue";

defineProps({
  textList: {
    type: Array,
    required: true,
  },
})

</script>

<style lang="scss">
@import "@/styles/theme-style";


</style>

<style scoped lang="scss">
@import "@/styles/theme-style";


</style>