<template>
  <div class="row">
    <div class="col-4">{{ label }}</div>
    <div class="col-8 text-bold">{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  data: {
    type: String,
    default: '',
  }
})
</script>