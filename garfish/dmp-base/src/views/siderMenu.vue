<template>
  <div class="menu-aside" :class="{ 'min-menu': false }">
    <div class="menu-wrapper">
      <div v-for="it in userMenus" :key="it.key">
        <div class="menu-item">{{it.title}}</div>
        <div v-for="item in it.children" :key="item.key">
          <div class="menu-item menu-v2" @click="runPage(item)">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import data from "./data";
import Garfish from 'garfish';

export default{
  name: 'SiderMenu',
  setup() {
    const userMenus = data;
    const collapsed = ref(false)
    const runPage = (item:any) => {
      console.log(item, 'item')
       Garfish.router.push({
        path: item.path,
        query: item.query,
      })
    }
    return {
      userMenus,
      collapsed,
      runPage
    }
  }
}



</script>
<style lang="scss">
.menu-item{
  height:20px;
  color:#000;
  font-size: 14px;
  cursor: pointer;
}
.menu-v2{
  padding-left: 30px;
}
</style>