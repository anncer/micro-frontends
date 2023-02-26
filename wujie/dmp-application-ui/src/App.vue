<template>
  <div class="app" :class="theme || 'light'">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router';
import settings from '../config'

const router = useRouter();

defineOptions({
  name: "Main"
});

watch(router, () => {
  window.$wujie?.bus.$emit("sub-route-change", "vite", this.$route.path);
})

// watch: {
//   // 在 vite-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
//   $route() {
//     window.$wujie?.bus.$emit("sub-route-change", "vite", this.$route.path);
//   },
// },

const { theme } = settings

</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
