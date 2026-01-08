<template>
  <q-page class="column q-pa-xl">
    <div
      v-if="isEventOrganizerCompanyLoading || isEventOrganizersLoading"
      class="loading"
    >
      Loading...
    </div>

    <div v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleOrganizers') }}</h1>
        </div>

        <back-button @back="onBack" />
      </div>

      <div class="q-pt-md">
        <form-event-organizer-company @save="onSave" @reset="onBack" />
        <div>
          <div class="row justify-between items-center q-mb-md">
            <h2 class="text-body1 text-weight-bold">
              {{ t('event.organizers.titleOtherOrganizers') }}
            </h2>
          </div>
          <div v-for="organizer in eventOrganizers" :key="organizer.email">
            <event-organizer-person :organizer="organizer" />
            <q-separator spaced="xl" />
          </div>
          <div v-if="eventOrganizers.length === 0" class="text-grey-6">
            {{ t('event.organizers.noOrganizers') }}
          </div>
        </div>
      </div>
    </div>
    <discard-changes-modal
      v-model="discardChangesModal"
      :is-saving="isEventOrganizerCompanySaving"
      @cancel="discardChangesModal = false"
      @discard-changes="discardChanges"
      @save="onSave"
    />
  </q-page>
</template>

<script setup lang="ts">
// libraries
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// components
import BackButton from 'src/components/buttons/BackButton.vue';
import FormEventOrganizerCompany from 'src/components/form/event/FormEventOrganizerCompany.vue';
import EventOrganizerPerson from 'src/components/event/organizers/EventOrganizerPerson.vue';
// eslint-disable-next-line no-unused-vars
import DiscardChangesModal from 'src/components/global/DiscardChangesModal.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventOrganizersStore } from 'src/stores/event/organizers';

// config
import { routesConf } from 'src/router/routes_conf';

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const eventOrganizersStore = useEventOrganizersStore();
const {
  isEventOrganizersLoading,
  isEventOrganizerCompanyLoading,
  eventOrganizers,
  isEventOrganizerCompanySaving,
  isEventOrganizersFormDirty,
} = storeToRefs(eventOrganizersStore);

const eventName = computed(() => eventStore.getEventName(slug.value));

const discardChangesModal = ref(false);

// watch the params of the route to fetch the data again
watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);

onMounted(async () => {
  await eventOrganizersStore.getCompanyTypes();
});

const onSave = async (): Promise<void> => {
  const success = await eventOrganizersStore.updateEventOrganizerCompany();
  if (success) {
    router.push({
      name: routesConf['event_organizers']['children']['name'],
      params: { slug: slug.value as string },
    });
  }
};

const discardChanges = (): void => {
  eventOrganizersStore.resetEventOrganizerCompanyForm();
  router.push({
    name: routesConf['event_organizers']['children']['name'],
    params: { slug: slug.value as string },
  });
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
</script>
