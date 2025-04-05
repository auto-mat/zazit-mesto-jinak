<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="eventInformation">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ $t('event.titleInformation') }}</h1>
        </div>

        <back-button v-if="edit" @back="edit = false" />
        <edit-button v-else @edit="edit = true" />
      </div>

      <event-information-editor v-if="edit" :event-information />
      <event-information-preview v-else :event-information />
    </div>
    
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import EditButton from 'src/components/buttons/EditButton.vue';
import BackButton from 'src/components/buttons/BackButton.vue';
import EventInformationPreview from 'src/components/event/information/EventInformationPreview.vue';
import EventInformationEditor from 'src/components/event/information/EventInformationEditor.vue';

import { useEventInformation } from 'src/composables/api/event/useEventInformation';


const edit = ref(false);

const route = useRoute();
const slug = ref(route.params.slug[0]);

// watch the params of the route to fetch the data again
watch(
  () => route.params.slug, 
  () => slug.value = route.params.slug[0], 
  { immediate: true }
);

const { eventName, eventInformation, isLoading, error } = useEventInformation(slug);

</script>