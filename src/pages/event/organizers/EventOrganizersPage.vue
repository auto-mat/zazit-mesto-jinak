<template>
  <q-page class="column q-pa-xl">
    <div v-if="isEventOrganizersLoading" class="loading">Loading...</div>

    <!-- <div v-if="error" class="error">{{ error }}</div> -->
    <div v-if="eventOrganizers">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleOrganizers') }}</h1>
        </div>

        <edit-button
          :to="{
            name: routesConf['event_organizers_edit']['children']['name'],
            params: { slug: slug },
          }"
        />
      </div>

      <event-organizers-preview :event-organizers :company />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import EventOrganizersPreview from 'src/components/event/organizers/EventOrganizersPreview.vue';
import EditButton from 'src/components/buttons/EditButton.vue';
import { routesConf } from 'src/router/routes_conf';
import { useEventStore } from 'src/stores/event';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventName = computed(() => eventStore.getEventName(slug.value));

const eventStore = useEventStore();
const {
  eventOrganizers,
  eventOrganizerCompany: company,
  isEventOrganizersLoading,
} = storeToRefs(eventStore);

watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
