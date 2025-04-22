<template>
  <q-icon class="text-h5" name="help">
    <q-tooltip class="lt-md text-body2">
      {{ content }}
    </q-tooltip>
    <q-tooltip 
      class="gt-sm text-body2"
      max-width="20%"
      anchor="center right" 
      self="center left" 
      :offset="[10, 10]"
    >
      {{ content }}
    </q-tooltip>
  </q-icon>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>