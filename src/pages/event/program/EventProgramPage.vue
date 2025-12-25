<template>
  <q-page class="column q-pa-xl">
    <div v-if="isEventProgramLoading" class="loading">Loading...</div>
    <div v-else>
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

      <event-program-table
        :rows="eventProgram"
        :pagination="{ rowsPerPage: 20 }"
        :rows-per-page-label="t('event.program.rowsPerPageLabel')"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// libraries
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import EventProgramTable from 'src/components/event/program/EventProgramTable.vue';
import EditButton from 'src/components/buttons/EditButton.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventProgramStore } from 'src/stores/event/program';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const eventProgramStore = useEventProgramStore();
const { eventProgram, isEventProgramLoading } = storeToRefs(eventProgramStore);

const eventName = computed(() => eventStore.getEventName(slug.value));

watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
