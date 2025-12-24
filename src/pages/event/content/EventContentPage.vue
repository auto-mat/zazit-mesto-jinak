<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="isLoading" />
    <template v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ t('event.titleWebContent') }}</h1>
        </div>

        <edit-button
          :to="{
            name: routesConf['event_web_content_edit']['children']['name'],
            params: { slug: slug },
          }"
        />
      </div>

      <event-content-preview />
    </template>
  </q-page>
</template>

<script setup lang="ts">
/**
 * Event content page
 * Displays the event content page with the content preview
 */

// libraries
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import EditButton from 'src/components/buttons/EditButton.vue';
import EventContentPreview from 'components/event/content/EventContentPreview.vue';
import Spinner from 'src/components/global/Spinner.vue';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventContentStore } from 'src/stores/event/content';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);

const eventStore = useEventStore();
const eventContentStore = useEventContentStore();
const { isEventContentLoading } = storeToRefs(eventContentStore);

const isLoading = computed(() => isEventContentLoading.value);
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
