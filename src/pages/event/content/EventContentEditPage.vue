<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <!-- <div v-if="error" class="error">{{ error }}</div> -->

    <div v-if="eventContent && eventProgram" class="content">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ $t('event.titleInformation') }}</h1>
        </div>

        <back-button
          :to="{
            name: routesConf['event_web_content']['children']['name'],
            params: { slug: slug },
          }"
        />
      </div>

      <!-- <embed 
        src="https://zazitmestojinak.cz/locations_/praha/praha-3/husitska" 
        style="width:500px; height: 300px;"
      > -->

      <event-content-editor :event-content />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { routesConf } from 'src/router/routes_conf';

import BackButton from 'src/components/buttons/BackButton.vue';
import EventContentEditor from 'src/components/event/content/EventContentEditor.vue';
import { useEventStore } from 'src/stores/event';

const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();

onMounted(() => {
  eventStore.loadEventContent(slug.value);
  eventStore.loadEventProgram(slug.value);
});

const isLoading = computed(() => eventStore.isLoading);
const eventName = computed(() => eventStore.getEventName(slug.value));
const eventContent = computed(() => eventStore.getEventContent(slug.value));
const eventProgram = computed(() => eventStore.getEventProgram(slug.value));
</script>
