<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="isEventInformationLoading" />
    <template v-else-if="eventInformation">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleInformation') }}</h1>
        </div>

        <edit-button
          :to="{
            name: routesConf['event_information_edit']['children']['name'],
            params: { slug: slug },
          }"
        />
      </div>

      <event-information-preview :event-information />
    </template>
  </q-page>
</template>

<script setup lang="ts">
/**
 * Event information page
 * Displays the event information page with the information preview
 */

// libraries
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import EditButton from 'src/components/buttons/EditButton.vue';
import EventInformationPreview from 'src/components/event/information/EventInformationPreview.vue';
import Spinner from 'src/components/global/Spinner.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventInformationStore } from 'src/stores/event/information';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);
const eventStore = useEventStore();
const eventInformationStore = useEventInformationStore();
const { eventInformation, isEventInformationLoading } = storeToRefs(
  eventInformationStore,
);

const eventName = computed(() => eventStore.getEventName(slug.value));

// Watch the slug to set the event slug in the store - get new data
watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
