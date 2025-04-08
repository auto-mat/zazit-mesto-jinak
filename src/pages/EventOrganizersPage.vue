<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="eventOrganizers">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ $t('event.titleOrganizers') }}</h1>
        </div>
      </div>

      <!-- <event-information-editor v-if="edit" :event-information /> -->
      <event-organizers-preview :event-organizers :company/>
    </div>
    
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import EventOrganizersPreview from 'src/components/event/organizers/EventOrganizersPreview.vue';


import { useEventOrganizers } from 'src/composables/api/event/useEventOrganizers';


// const editOrganizers = ref(false);

const route = useRoute();
const slug = ref(route.params.slug[0]);

// watch the params of the route to fetch the data again
watch(
  () => route.params.slug, 
  () => slug.value = route.params.slug[0], 
  { immediate: true }
);

const { eventName, eventOrganizers, company, isLoading, error } = useEventOrganizers(slug);

</script>