<template>
  <sider-menu></sider-menu>
  <transition name="fade">
    <div class="wrap-container">
      <app-main />
    </div>
  </transition>
</template>

<script lang="ts">
import AppMain from "./components/appMain.vue";
import siderMenu from "./components/siderMenu.vue";
// defineOptions({
//   name: 'Layout',
// })
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: {siderMenu, AppMain},
  setup() {
    const isBar = false
    return {isBar}
  }
}


</script>
