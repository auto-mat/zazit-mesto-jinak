<template>
  <div class="row items-center fit q-my-sm">
    <div class="col-3">
      {{ label }}
    </div>
    <div class="col">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
});
</script>
