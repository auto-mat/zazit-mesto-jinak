<template>
  <div class="q-pt-md">
    <form-event-organizer-company :company /> 
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import FormEventOrganizerCompany from 'src/components/form/event/FormEventOrganizerCompany.vue';
import { EventOrganizerCompanyType } from 'src/types/Event';

defineProps({
  company: {
    type: Object as PropType<EventOrganizerCompanyType>,
    required: true
  }
})
</script>