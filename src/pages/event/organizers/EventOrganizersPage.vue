<template>
  <q-page class="column q-pa-xl">
    <div
      v-if="isEventOrganizerCompanyLoading || isEventOrganizersLoading"
      class="loading"
    >
      Loading...
    </div>
    <div v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleOrganizers') }}</h1>
        </div>
      </div>

      <event-organizers-preview />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// libraries
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// components
import EventOrganizersPreview from 'src/components/event/organizers/EventOrganizersPreview.vue';

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

watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
