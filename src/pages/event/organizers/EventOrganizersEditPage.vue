<template>
  <q-page class="column q-pa-xl">
    <spinner
      v-if="isEventOrganizerCompanyLoading || isEventOrganizersLoading"
    />
    <template v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleOrganizers') }}</h1>
        </div>

        <back-button @back="onBack" />
      </div>

      <div class="q-pt-md">
        <div class="q-mb-xl">
          <div class="row justify-between items-center q-mb-md">
            <h2 class="text-body1 text-weight-bold">
              {{ t('event.organizers.titleCompany') }}
            </h2>
          </div>
          <event-organizer-company-preview v-if="company" :company />
          <div v-else class="text-grey-6">
            {{ t('event.organizers.noCompany') }}
          </div>
        </div>
        <form-event-organizers @save="onSave" @reset="onBack" />
      </div>
    </template>
    <discard-changes-modal
      v-model="discardChangesModal"
      :is-saving="isEventOrganizersSaving"
      @cancel="discardChangesModal = false"
      @discard-changes="discardChanges"
      @save="onSave"
    />
  </q-page>
</template>

<script setup lang="ts">
/**
 * Event organizers edit page
 * Displays the event organizers edit page with the form
 */

// libraries
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventOrganizersStore } from 'src/stores/event/organizers';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import FormEventOrganizers from 'src/components/form/event/FormEventOrganizers.vue';
import BackButton from 'src/components/buttons/BackButton.vue';
import EventOrganizerCompanyPreview from 'src/components/event/organizers/EventOrganizerCompanyPreview.vue';
// eslint-disable-next-line no-unused-vars
import DiscardChangesModal from 'src/components/global/DiscardChangesModal.vue';
import Spinner from 'src/components/global/Spinner.vue';

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const eventOrganizersStore = useEventOrganizersStore();
const {
  eventOrganizerCompany: company,
  isEventOrganizersLoading,
  isEventOrganizerCompanyLoading,
  isEventOrganizersSaving,
  isEventOrganizersFormDirty,
} = storeToRefs(eventOrganizersStore);

const eventName = computed(() => eventStore.getEventName(slug.value));

const discardChangesModal = ref(false);

const onSave = async (): Promise<void> => {
  const success = await eventOrganizersStore.updateEventOrganizers();
  if (success) {
    router.push({
      name: routesConf['event_organizers']['children']['name'],
      params: { slug: slug.value as string },
    });
  }
};

const onBack = (): void => {
  if (isEventOrganizersFormDirty.value) {
    discardChangesModal.value = true;
  } else {
    router.push({
      name: routesConf['event_organizers']['children']['name'],
      params: { slug: slug.value as string },
    });
  }
};

const discardChanges = (): void => {
  eventOrganizersStore.resetEventOrganizersForm();
  router.push({
    name: routesConf['event_organizers']['children']['name'],
    params: { slug: slug.value as string },
  });
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
