<template>
  <div class="hello">
    <img alt="Vue logo" :src="logo" />
    <h2 class="vue-title">{{ msg }}</h2>
  </div>
</template>

<script lang="ts" setup>

import logo from '@/assets/logo.png';
import {defineProps, toRefs } from 'vue'

defineOptions({
  name: 'HelloWorld',
})

const props = defineProps({msg: {type: String, default: ""}})

const {msg} = toRefs(props)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
  margin-bottom: 50px;
}

img {
  width: 200px;
  height: 200px;
}

.vue-title {
  color: var(--host-color);
}
</style>
