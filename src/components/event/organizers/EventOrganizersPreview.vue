<template>
  <div class="q-pt-md">
    <div class="q-mb-xl">
      <div class="row justify-between items-center q-mb-md">
        <h2 class="text-body1 text-weight-bold">
          {{ $t('event.organizers.titleMainOrganizer') }}
        </h2>
        <edit-button @edit="$emit('editOrganizers')"/>
      </div>
      <event-organizer-person v-if="mainOrganizer" :organizer="mainOrganizer" />
    </div>
    <div v-if="company" class="q-mb-xl">
      <div class="row justify-between items-center q-mb-md">
        <h2 class="text-body1 text-weight-bold">
          {{ $t('event.organizers.titleCompany') }}
        </h2>
        <edit-button @edit="$emit('editCompany')"/>
      </div>
      <event-organizer-company :company />
    </div>
    <div>
      <div class="row justify-between items-center q-mb-md">
        <h2 class="text-body1 text-weight-bold">
          {{ $t('event.organizers.titleOtherOrganizers') }}
        </h2>
        <edit-button @edit="$emit('editOrganizers')"/>
      </div>
      <div
        v-for="organizer in otherOrganizers"
        :key="organizer.email"
      >
        <event-organizer-person :organizer="organizer" />
        <q-separator spaced="xl"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

import EventOrganizerPerson from './EventOrganizerPerson.vue';
import EventOrganizerCompany from './EventOrganizerCompany.vue';
import EditButton from 'src/components/buttons/EditButton.vue';
import { EventOrganizerCompanyType, EventOrganizersType } from 'src/types/Event';


const props = defineProps({
  eventOrganizers: {
    type: Array as PropType<EventOrganizersType>,
    required: true,
  },
  company: {
    type: Object as PropType<EventOrganizerCompanyType | null>,
    required: true,
  }
})

defineEmits(['editOrganizers', 'editCompany'])

const mainOrganizer = computed(() => {
  // TODO roles
  return props.eventOrganizers.find((organizer) => organizer.role === 'main')
})

const otherOrganizers = computed(() => {
  return props.eventOrganizers.filter((organizer) => organizer.role !== 'main')
})
</script>