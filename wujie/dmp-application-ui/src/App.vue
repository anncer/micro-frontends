<template>
  <div id="nav">
    <router-link to="/home">首页</router-link> | <router-link to="/dialog">弹窗</router-link> |
    <router-link to="/location">路由</router-link> | <router-link to="/contact">通信</router-link> |
    <router-link to="/state">状态</router-link>
  </div>
  <router-view />
</template>

<!-- <script>
export default {
  watch: {
    // 在 vue3-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
    $route() {
      console.log(123)
      window.$wujie?.bus.$emit("sub-route-change", "vue3", this.$route.path);
    },
  },
  mounted() {
    console.log('xxxxx')
    window.$wujie?.bus.$on("vue3-router-change", (path) => this.$router.push(path));
  },
};
</script> -->


<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import settings from '../config'
// declare const window: any;
const router = useRouter();

const current = router.currentRoute

watch(current, () => {
  // console.log(router, 'router')
  console.log(current.value, 'current')
  window.$wujie?.bus.$emit("sub-route-change", "vue3", router.currentRoute.value.path);
})

onMounted(() => {
  console.log(window.$wujie, 'onMounted')
  window.$wujie?.bus.$on("vue3-router-change", (path: any) => router.push(path));
})
// watch: {
//   // 在 vite-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
//   $route() {
//     window.$wujie?.bus.$emit("sub-route-change", "vite", this.$route.path);
//   },
// },

// const { theme } = settings

</script>