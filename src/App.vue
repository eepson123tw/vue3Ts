<template>
  <router-view :key="key" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() =>
  route.name ? String(route.name) + new Date() : String(route.path) + new Date()
)
</script>
<style>
:root {
  --dark-bg: rgba(15, 15, 15, 0.95);
  --spacing: 350px;
  font-family: brandon-grotesque, sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
