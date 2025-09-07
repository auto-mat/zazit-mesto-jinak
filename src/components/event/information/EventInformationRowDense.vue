<template>
  <div class="row q-my-md">
    <div class="col-6 text-bold">{{ label }}</div>
    <div class="col-6">
      <slot>
        {{ data }}
      </slot>
    </div>
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
  },
})
</script>