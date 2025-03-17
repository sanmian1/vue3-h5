<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>