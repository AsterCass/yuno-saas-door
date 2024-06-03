<template>
  <div>

  </div>
</template>

<script setup>
import {defineProps, onMounted} from "vue";
import {saveUserToken} from "@/utils/store";
import {toSpecifyPage} from "@/router";
import {useRouter} from "vue-router";
import {preLoginTmp} from "@/api/book-project";

//router
const thisRouter = useRouter()

const props = defineProps({
  token: {
    type: String,
    required: true,
    default: ""
  }
})


function loginTmp() {
  preLoginTmp({token: props.token}).then(data => {
    if (data && 200 === data.status) {
      saveUserToken(props.token)
      toSpecifyPage(thisRouter, "saasHouseBookProject")
    } else {
      toSpecifyPage(thisRouter, "notLogin")
    }
  }).catch(() => {
    toSpecifyPage(thisRouter, "notLogin")
  });
}


onMounted(() => {
  loginTmp()
})

</script>

<style scoped lang="scss">

</style>