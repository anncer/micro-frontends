<template>
  <div class="menu-aside" :class="{ 'min-menu': false }">
    <div class="menu-wrapper">
      <div v-for="it in userMenus" :key="it.key">
        <div style="height:20px;color:#000;font-size: 14px;cursor: pointer;">{{it.title}}</div>
        <div v-for="item in it.children" :key="item.key">
          <div style="height:20px;color:#000;padding-left: 30px;font-size: 14px;cursor: pointer;">{{ item.title }}</div>
        </div>
      </div>
      <!-- <el-menu
        class="menu-content"
        :collapse="collapsed"
        :collapse-transition="true"
        :unique-opened="true"
        mode="vertical"
      >
        <sider-menu-item
          v-for="item in userMenus"
          :key="item.key"
          :item="item"
        ></sider-menu-item>
      </el-menu> -->
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import siderMenuItem from "./siderMenuItem.vue";
import data from "./data";
// import settings from '../../../config'
// import { portMap } from '../../../utils.ts'
// onClick = {
//                   () =>
// Garfish.router.push({
//   path: k.path,
//   query: k.query,
// })
// defineOptions({
//   name: 'SiderMenu'
// })

export default{
  name: 'SiderMenu',
  components: { siderMenuItem },
  setup() {
    const userMenus = data;
    const collapsed = ref(false)
    return {
      userMenus,
      collapsed
    }
  }
}



</script>
