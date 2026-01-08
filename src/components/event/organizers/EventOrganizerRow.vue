<template>
  <div class="row">
    <div class="col-4">{{ label }}</div>
    <div class="col-8 text-bold">{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventOrganizerRow component
 *
 * The `EventOrganizerRow` component is used to display an event organizer row.
 *
 * @description * Use this component to display an event organizer row.
 *
 * @props
 * - `label` (string, required): The label of the event organizer row.
 * - `data` (string, required): The data of the event organizer row.
 *
 * @example
 * <event-organizer-row :label="label" :data="data" />
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
