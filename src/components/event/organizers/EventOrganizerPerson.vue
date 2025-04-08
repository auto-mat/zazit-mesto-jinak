<template>
  <div class="row q-col-gutter-md">
    <event-organizer-row 
      :label="$t('event.organizers.labelName')" 
      :data="organizer.name" 
      class="col-12 col-sm-6"
    />
    <event-organizer-row 
      :label="$t('event.organizers.labelSurname')" 
      :data="organizer.surname" 
      class="col-12 col-sm-6"
    />
    <event-organizer-row 
      :label="$t('event.organizers.labelEmail')" 
      :data="organizer.email" 
      class="col-12 col-sm-6"
    />
    <event-organizer-row 
      :label="$t('event.organizers.labelPhone')" 
      :data="organizer.phone" 
      class="col-12 col-sm-6"
    />
    <event-organizer-row 
      :label="$t('event.organizers.labelRole')" 
      :data="organizer.role" 
      class="col-12 col-sm-6"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import EventOrganizerRow from './EventOrganizerRow.vue';
import { EventOrganizerType } from 'src/types/Event';

defineProps({
  organizer: {
    type: Object as PropType<EventOrganizerType>,
    required: true
  }
})
</script>