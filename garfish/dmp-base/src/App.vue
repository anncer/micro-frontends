<template>
  <router-view />
</template>

<script lang="ts">

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "App",

  setup() {
    const isBar = false
    return { isBar }
  }
}


</script>
