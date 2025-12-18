<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <!-- <div v-if="error" class="error">{{ error }}</div> -->
    <div v-if="eventInformation">
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
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

// stores
import { useEventStore } from 'src/stores/event';
import { useEventInformationStore } from 'src/stores/event/information';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);
const eventStore = useEventStore();
const eventInformationStore = useEventInformationStore();
const { eventInformation } = storeToRefs(eventInformationStore);

const isLoading = computed(() => eventStore.isLoading);
const eventName = computed(() => eventStore.getEventName(slug.value));

watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
