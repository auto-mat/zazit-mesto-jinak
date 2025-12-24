<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="isEventInformationLoading" />

    <template v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleInformation') }}</h1>
        </div>

        <back-button @back="onBack" />
      </div>

      <event-information-editor @save="onSave" />
    </template>
    <discard-changes-modal
      v-model="discardChangesModal"
      :is-saving="isEventInformationSaving"
      @cancel="discardChangesModal = false"
      @discard-changes="discardChanges"
      @save="onSave"
    />
  </q-page>
</template>

<script setup lang="ts">
/**
 * Event information edit page
 * Displays the event information edit page with the form
 */

// libraries
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import Spinner from 'src/components/global/Spinner.vue';
import BackButton from 'src/components/buttons/BackButton.vue';
import EventInformationEditor from 'src/components/event/information/EventInformationEditor.vue';
// eslint-disable-next-line no-unused-vars
import DiscardChangesModal from 'src/components/global/DiscardChangesModal.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventInformationStore } from 'src/stores/event/information';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const eventInformationStore = useEventInformationStore();
const {
  isEventInformationFormDirty,
  isEventInformationSaving,
  isEventInformationLoading,
} = storeToRefs(eventInformationStore);

const eventName = computed(() => eventStore.getEventName(slug.value));

const discardChangesModal = ref(false);

const discardChanges = (): void => {
  eventInformationStore.resetEventInformationForm();
  router.push({
    name: routesConf['event_information']['children']['name'],
    params: { slug: slug.value as string },
  });
};

const onSave = async (): Promise<void> => {
  const success = await eventInformationStore.updateEventInformation();
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

// Watch the slug to set the event slug in the store - get new data
watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
