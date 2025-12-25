<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="isEventContentLoading" />
    <div v-else class="content">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleWebContent') }}</h1>
        </div>

        <back-button
          :to="{
            name: routesConf['event_web_content']['children']['name'],
            params: { slug: slug },
          }"
        />
      </div>

      <div class="q-pt-md q-pb-xl">
        <form-event-content @save="onSave" @reset="onBack" />
      </div>
    </div>
    <discard-changes-modal
      v-model="discardChangesModal"
      :is-saving="isEventContentSaving"
      @cancel="discardChangesModal = false"
      @discard-changes="discardChanges"
      @save="onSave"
    />
  </q-page>
</template>

<script setup lang="ts">
/**
 * Event content edit page
 * Displays the event content edit page with the form
 */

// libraries
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import Spinner from 'src/components/global/Spinner.vue';
import BackButton from 'src/components/buttons/BackButton.vue';
import FormEventContent from 'src/components/form/event/FormEventContent.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventContentStore } from 'src/stores/event/content';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);
const router = useRouter();

const eventStore = useEventStore();
const eventContentStore = useEventContentStore();
const { isEventContentLoading, isEventContentFormDirty, isEventContentSaving } =
  storeToRefs(eventContentStore);
const discardChangesModal = ref(false);

const discardChanges = (): void => {
  eventContentStore.resetEventContentForm();
  router.push({
    name: routesConf['event_web_content']['children']['name'],
    params: { slug: slug.value as string },
  });
};

const onSave = async (): Promise<void> => {
  const success = await eventContentStore.updateEventContent();
  if (success) {
    router.push({
      name: routesConf['event_web_content']['children']['name'],
      params: { slug: slug.value },
    });
  }
};

const onBack = (): void => {
  if (isEventContentFormDirty.value) {
    discardChangesModal.value = true;
  } else {
    router.push({
      name: routesConf['event_web_content']['children']['name'],
      params: { slug: slug.value },
    });
  }
};

const eventName = computed(() => eventStore.getEventName(slug.value));

// Watch the slug to set the event slug in the store - get new data
watch(
  slug,
  () => {
    eventStore.setSlug(slug.value as string);
  },
  { immediate: true },
);
</script>
