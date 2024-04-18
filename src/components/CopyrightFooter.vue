<template>
  <div id="margin-collapsing">
    <div id="web-footer" class="footer">
      <ul class="copyright">
        <li>&copy; 2020-2024 astercasc.com 版权所有 互联网ICP备案：
          <a target="_blank" href="https://beian.miit.gov.cn/">浙ICP备2022023127号</a>
        </li>
        <li>
          <q-icon name="fa-solid fa-envelope"/>
          Author Mail：astercass@qq.com
        </li>
        <li>
          <q-icon name="eva-github"/>
          Project Github：
          <a target="_blank" href="https://github.com/AsterCass?tab=repositories">YunoSaasDoorWeb</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";

function screenEventHandler() {
  let marginColHelper = document.getElementById('margin-collapsing')
  let footElement = document.getElementById('web-footer')
  const footRect = footElement.getBoundingClientRect();
  let preMargin = marginColHelper.style.paddingTop ?
      marginColHelper.style.paddingTop.replaceAll("px", "") : 0
  const footerY = footRect.top - preMargin
  const footerHeight = footRect.height
  const pageHeight = document.documentElement.clientHeight
  if (footerY + footerHeight < pageHeight) {
    let distinct = pageHeight - footerY - footerHeight
    marginColHelper.style.paddingTop = distinct + 'px'
  } else {
    marginColHelper.style.paddingTop = '0'
  }
}

onMounted(() => {
  screenEventHandler()
  window.addEventListener("resize", screenEventHandler);
})

onUnmounted(() => {
  //删除屏幕改变事件
  window.removeEventListener("resize", screenEventHandler);
})

</script>

<style lang="scss" scoped>
@import "@/styles/base-style";

.footer {
  bottom: 0;
  width: 100%;
  color: $yuno_white;
  background-image: $yuno_black_gradient_180;
  padding: 0.1rem 0 1.2em 0;

  .copyright {
    color: inherit;
    background: transparent;
    font-size: 0.9em;
    margin: 1em 0 0 0;
    padding: 0;
    text-align: center;
  }

  .copyright li {
    color: inherit;
    background: transparent;
    display: inline-block;
    list-style: none;
    margin-left: 2rem;
  }

  .copyright li:first-child {
    border-left: 0;
    margin-left: 0;
    padding-left: 0;
  }

  .copyright a, i {
    color: inherit;
    background: transparent;
  }

}

</style>