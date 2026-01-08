<template>
  <div class="q-pt-md">
    <div class="q-mb-xl">
      <div class="row justify-between items-center q-mb-md">
        <h2 class="text-body1 text-weight-bold">
          {{ t('event.organizers.titleCompany') }}
        </h2>
        <edit-button
          :to="{
            name: routesConf['event_organizer_company_edit']['children'][
              'name'
            ],
            params: { slug: eventStore.slug },
          }"
        />
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
        <edit-button
          :to="{
            name: routesConf['event_organizers_edit']['children']['name'],
            params: { slug: eventStore.slug },
          }"
        />
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
/**
 * EventOrganizersPreview component
 *
 * The `EventOrganizersPreview` component is used to display the event organizers preview.
 *
 * @description * Use this component to display the event organizers preview.
 *
 * @example
 * <event-organizers-preview />
 */

// libraries
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// components
import EventOrganizerPerson from './EventOrganizerPerson.vue';
import EventOrganizerCompanyPreview from './EventOrganizerCompanyPreview.vue';
import EditButton from 'src/components/buttons/EditButton.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventOrganizersStore } from 'src/stores/event/organizers';

// config
import { routesConf } from 'src/router/routes_conf';

const { t } = useI18n();
const eventStore = useEventStore();
const eventOrganizersStore = useEventOrganizersStore();
const { eventOrganizerCompany: company, eventOrganizers } =
  storeToRefs(eventOrganizersStore);
</script>
