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
/**
 * EventInformationRowDense component
 *
 * The `EventInformationRowDense` component is used to display an event information row in a dense format.
 *
 * @description * Use this component to display an event information row in a dense format.
 *
 * @props
 * - `label` (string, required): The label of the event information row.
 * - `data` (string, required): The data of the event information row.
 *
 * @example
 * <event-information-row-dense :label="label" :data="data" />
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
