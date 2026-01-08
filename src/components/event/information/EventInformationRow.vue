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
/**
 * EventInformationRow component
 *
 * The `EventInformationRow` component is used to display an event information row.
 *
 * @description * Use this component to display an event information row.
 *
 * @props
 * - `label` (string, required): The label of the event information row.
 * - `data` (string, required): The data of the event information row.
 *
 * @example
 * <event-information-row :label="label" :data="data" />
 */

defineProps({
  label: {
    type: String,
    default: '',
  },
  data: {
    type: String,
    default: '',
  },
});
</script>
