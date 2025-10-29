<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <!-- <div v-if="error" class="error">{{ error }}</div> -->
    <div v-if="eventInformation">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ $t('event.titleInformation') }}</h1>
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
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { routesConf } from 'src/router/routes_conf';

import EditButton from 'src/components/buttons/EditButton.vue';
import EventInformationPreview from 'src/components/event/information/EventInformationPreview.vue';

import { useEventStore } from 'src/stores/event';

const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();

onMounted(() => {
  eventStore.loadEventInformation(slug.value);
});

const isLoading = computed(() => eventStore.isLoading);
const eventName = computed(() => eventStore.getEventName(slug.value));
const eventInformation = computed(() =>
  eventStore.getEventInformation(slug.value),
);
</script>
