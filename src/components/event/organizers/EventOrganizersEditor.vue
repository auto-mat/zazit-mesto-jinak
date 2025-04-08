<template>
  <div class="q-pt-md">
    <form-event-organizers :organizers /> 
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import FormEventOrganizers from 'src/components/form/event/FormEventOrganizers.vue';
import { EventOrganizersType } from 'src/types/Event';

defineProps({
  organizers: {
    type: Array as PropType<EventOrganizersType>,
    required: true
  }
})
</script>