<template>
  <div class="q-pt-md">
    <form-event-organizer-company :company />
    <form-event-organizers :organizers />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import FormEventOrganizers from 'src/components/form/event/FormEventOrganizers.vue';
import FormEventOrganizerCompany from 'src/components/form/event/FormEventOrganizerCompany.vue';
import { EventOrganizers, EventOrganizerCompany } from 'src/types/Event';

defineProps({
  company: {
    type: Object as PropType<EventOrganizerCompany>,
    required: true,
  },
  organizers: {
    type: Array as PropType<EventOrganizers>,
    required: true,
  },
});
</script>
