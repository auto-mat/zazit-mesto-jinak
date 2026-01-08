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
/**
 * InfoButton component
 *
 * The `InfoButton` component is used to display an info button.
 *
 * @description * Use this component to display an info button.
 *
 * @example
 * <info-button :content="content" />
 */

defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>
