<template>
  <div class="row items-center fit q-my-sm">
    <div class="col-12 col-sm-3">
      {{ label }}
    </div>
    <div class="col-12 col-sm-9">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ProfileRow component
 *
 * The `ProfileRow` component is used to display a profile row.
 *
 * @description * Use this component to display a profile row.
 *
 * @props
 * - `label` (string, required): The label of the profile row.
 *
 * @example
 * <profile-row :label="label">
 *  Something to display
 * </profile-row>
 */

defineProps({
  label: {
    type: String,
    default: '',
  },
});
</script>
