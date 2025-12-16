<template>
  <q-page class="column q-pa-xl">
    <div v-if="isEventInformationLoading" class="loading">Loading...</div>

    <div v-if="eventInformation">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleInformation') }}</h1>
        </div>

        <back-button @back="onBack" />
      </div>

      <event-information-editor @save="onSave" />
    </div>
  </q-page>
  <discard-changes-modal
    v-model="discardChangesModal"
    :is-saving="isEventInformationSaving"
    @cancel="discardChangesModal = false"
    @discard-changes="discardChanges"
    @save="onSave"
  />
</template>

<script setup lang="ts">
// libraries
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import BackButton from 'src/components/buttons/BackButton.vue';
import EventInformationEditor from 'src/components/event/information/EventInformationEditor.vue';
// eslint-disable-next-line no-unused-vars
import DiscardChangesModal from 'src/components/global/DiscardChangesModal.vue';

// stores
import { useEventStore } from 'src/stores/event';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const {
  eventInformation,
  isEventInformationFormDirty,
  isEventInformationSaving,
  isEventInformationLoading,
} = storeToRefs(eventStore);

const eventName = computed(() => eventStore.getEventName(slug.value));

const discardChangesModal = ref(false);

const discardChanges = (): void => {
  eventStore.resetEventInformationForm();
  router.push({
    name: routesConf['event_information']['children']['name'],
    params: { slug: slug.value as string },
  });
};

watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);

const onSave = async (): Promise<void> => {
  const success = await eventStore.updateEventInformation();
  if (success) {
    router.push({
      name: routesConf['event_information']['children']['name'],
      params: { slug: slug.value as string },
    });
  }
};

const onBack = (): void => {
  if (isEventInformationFormDirty.value) {
    discardChangesModal.value = true;
  } else {
    router.push({
      name: routesConf['event_information']['children']['name'],
      params: { slug: slug.value as string },
    });
  }
};
</script>
