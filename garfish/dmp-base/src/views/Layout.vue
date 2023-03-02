<template>
  <sider-menu></sider-menu>
  <div class="wrap-container" id="content">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import siderMenu from "./siderMenu.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: { siderMenu, },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>