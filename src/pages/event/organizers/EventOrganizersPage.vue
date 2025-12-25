<template>
  <q-page class="column q-pa-xl">
    <spinner
      v-if="isEventOrganizerCompanyLoading || isEventOrganizersLoading"
    />
    <template v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleOrganizers') }}</h1>
        </div>
      </div>

      <event-organizers-preview />
    </template>
  </q-page>
</template>

<script setup lang="ts">
/**
 * Event organizers page
 * Displays the event organizers page with the organizers preview
 */

// libraries
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// components
import EventOrganizersPreview from 'src/components/event/organizers/EventOrganizersPreview.vue';
import Spinner from 'src/components/global/Spinner.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventOrganizersStore } from 'src/stores/event/organizers';

const { t } = useI18n();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventName = computed(() => eventStore.getEventName(slug.value));

const eventStore = useEventStore();
const eventOrganizersStore = useEventOrganizersStore();
const { isEventOrganizerCompanyLoading, isEventOrganizersLoading } =
  storeToRefs(eventOrganizersStore);

// Watch the slug to set the event slug in the store - get new data
watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
