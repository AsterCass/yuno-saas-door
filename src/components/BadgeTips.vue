<template>
  <q-badge class="transparent no-padding">
    <q-icon size="1rem" name="fa-regular fa-circle-question"
            class="astercasc-theme-base" style="opacity: .75;"/>
    <q-tooltip class="astercasc-simple-card-outline"
               :anchor="isTop ? 'top middle' : 'bottom middle'"
               :self="isTop ? 'bottom middle' : 'top middle'">
      <div class="q-pa-sm" style="max-width: 15rem;font-size: .9rem">
        {{ text}}
      </div>
    </q-tooltip>
  </q-badge>
</template>

<script setup>

import {defineProps} from "vue";

defineProps({
  isTop: {
    type: Boolean,
    required: false,
    default: true,
  },
  text: {
    type: String,
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