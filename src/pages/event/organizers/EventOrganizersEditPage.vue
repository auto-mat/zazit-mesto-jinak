<template>
  <q-page class="column q-pa-xl">
    <div v-if="isEventOrganizersLoading" class="loading">Loading...</div>

    <div v-if="eventOrganizers">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleOrganizers') }}</h1>
        </div>

        <back-button @back="onBack" />
      </div>

      <event-organizers-editor
        :company="company"
        :organizers="eventOrganizers"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import EventOrganizersEditor from 'src/components/event/organizers/EventOrganizersEditor.vue';
import BackButton from 'src/components/buttons/BackButton.vue';
import { useEventStore } from 'src/stores/event';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { routesConf } from 'src/router/routes_conf';

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const {
  eventOrganizers,
  eventOrganizerCompany: company,
  isEventOrganizersLoading,
} = storeToRefs(eventStore);

const eventName = computed(() => eventStore.getEventName(slug.value));

// watch the params of the route to fetch the data again
watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);

const onBack = (): void => {
  router.push({
    name: routesConf['event_organizers']['children']['name'],
    params: { slug: slug.value as string },
  });
};
</script>
