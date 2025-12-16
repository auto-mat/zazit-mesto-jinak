<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <!-- <div v-if="error" class="error">{{ error }}</s div> -->
    <div v-if="eventProgram">
      <div class="row justify-between items-end q-mb-md">
        <div class="q-mb-md">
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleProgram') }}</h1>
        </div>

        <edit-button
          :to="{
            name: routesConf['event_program_edit']['children']['name'],
            params: { slug: slug },
          }"
        />
      </div>

      <event-program-table :rows="eventProgram" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { routesConf } from 'src/router/routes_conf';

import EventProgramTable from 'src/components/event/program/EventProgramTable.vue';
import EditButton from 'src/components/buttons/EditButton.vue';

import { useEventStore } from 'src/stores/event';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();

onMounted(() => {
  if (eventStore.eventProgram.length === 0) {
    eventStore.loadEventProgram(slug.value);
  }
});

const isLoading = computed(() => eventStore.isLoading);
const eventName = computed(() => eventStore.getEventName(slug.value));
const eventProgram = computed(() => eventStore.eventProgram);
</script>
