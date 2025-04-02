<template>
  <div class="row q-my-md">
    <div class="col-12 col-sm-3">{{ label }}</div>
    <div class="col-12 col-sm-9 text-bold">
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