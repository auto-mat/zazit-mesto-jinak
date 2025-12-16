<template>
  <div class="q-pt-md">
    <div class="q-mb-xl">
      <div class="row justify-between items-center q-mb-md">
        <h2 class="text-body1 text-weight-bold">
          {{ t('event.organizers.titleCompany') }}
        </h2>
      </div>
      <event-organizer-company-preview v-if="company" :company />
      <div v-else class="text-grey-6">
        {{ t('event.organizers.noCompany') }}
      </div>
    </div>
    <div>
      <div class="row justify-between items-center q-mb-md">
        <h2 class="text-body1 text-weight-bold">
          {{ t('event.organizers.titleOtherOrganizers') }}
        </h2>
      </div>
      <div v-for="organizer in eventOrganizers" :key="organizer.email">
        <event-organizer-person :organizer="organizer" />
        <q-separator spaced="xl" />
      </div>
      <div v-if="eventOrganizers.length === 0" class="text-grey-6">
        {{ t('event.organizers.noOrganizers') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import EventOrganizerPerson from './EventOrganizerPerson.vue';
import EventOrganizerCompanyPreview from './EventOrganizerCompanyPreview.vue';
import { EventOrganizerCompany, EventOrganizers } from 'src/types/Event';

defineProps({
  eventOrganizers: {
    type: Array as PropType<EventOrganizers>,
    required: true,
  },
  company: {
    type: Object as PropType<EventOrganizerCompany | null>,
    required: true,
  },
});

const { t } = useI18n();
</script>
