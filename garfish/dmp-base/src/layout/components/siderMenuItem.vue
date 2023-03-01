<template>
  <div class="menu-box">
    <template v-if="isChildren">
      <el-sub-menu :index="menuItem.key">
        <template #title>
          <span>{{ menuItem.title }}</span>
        </template>
        <sider-menu-item
          v-for="item2 in item.children"
          :item="item2"
          :key="item2.key"
        >
        </sider-menu-item>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menuItem.key">
        <span>{{ menuItem.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
// import { isProperty, isRealArray } from "@/utils/comment";
// import type { IRouterItem } from "./types.d";
// import SvgIcon from "@/components/svgIcon/index.vue";

export default defineComponent({
  name: "SiderMenuItem",
  // components: {
  //   SvgIcon
  // },
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      default: "",
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  setup(props) {
    const { item } = toRefs(props);
    // const checkPromise = (item: IRouterItem) => {
    //   return isProperty(item, "isShow") && !item.hidden;
    // };

    const checkChildren = (it: any): boolean => {
      return Boolean(it.children && it.children.length)
    };

    const isChildren = computed<boolean>(() => checkChildren(item.value));

    return {
      // checkPromise,
      isChildren,
      menuItem: item
    };
  }
});
</script>
