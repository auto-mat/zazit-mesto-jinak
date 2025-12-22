<template>
  <q-page class="column q-pa-xl">
    <div v-if="isEventProgramLoading" class="loading">Loading...</div>
    <div v-else>
      <div class="row justify-between items-end q-mb-md">
        <div class="q-mb-md">
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleProgram') }}</h1>
        </div>

        <back-button @back="onBack" />
      </div>

      <event-program-editor />
    </div>
    <discard-changes-modal
      v-model="discardChangesModal"
      :is-saving="isEventProgramSaving"
      @cancel="discardChangesModal = false"
      @discard-changes="discardChanges"
      @save="onSave"
    />
  </q-page>
</template>

<script setup lang="ts">
// libraries
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import EventProgramEditor from 'src/components/event/program/EventProgramEditor.vue';
import BackButton from 'src/components/buttons/BackButton.vue';
// eslint-disable-next-line no-unused-vars
import DiscardChangesModal from 'src/components/global/DiscardChangesModal.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventProgramStore } from 'src/stores/event/program';

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const eventProgramStore = useEventProgramStore();
const { isEventProgramSaving, isEventProgramLoading, isEventProgramFormDirty } =
  storeToRefs(eventProgramStore);

const discardChangesModal = ref(false);

const eventName = computed(() => eventStore.getEventName(slug.value));

watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);

const onBack = (): void => {
  if (isEventProgramFormDirty.value) {
    discardChangesModal.value = true;
  } else {
    router.push({
      name: routesConf['event_program']['children']['name'],
      params: { slug: slug.value as string },
    });
  }
};
const discardChanges = (): void => {
  eventProgramStore.clearEventProgramForm();
  router.push({
    name: routesConf['event_program']['children']['name'],
    params: { slug: slug.value as string },
  });
};

const onSave = async (): Promise<void> => {
  const success = await eventProgramStore.addOrUpdateProgramItem();
  if (success) {
    router.push({
      name: routesConf['event_program']['children']['name'],
      params: { slug: slug.value as string },
    });
  }
};
</script>
