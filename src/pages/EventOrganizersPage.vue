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

      <event-organizers-editor v-if="editOrganizers" :organizers="eventOrganizers" />
      <event-organizer-company-editor v-if="company && editCompany" :company />
      <event-organizers-preview 
        v-if="!editOrganizers && !editCompany"
        :event-organizers 
        :company 
        @edit-organizers="editOrganizers = true"
        @edit-company="editCompany = true"
      />
    </div>
    
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import EventOrganizersPreview from 'src/components/event/organizers/EventOrganizersPreview.vue';
import EventOrganizerCompanyEditor from 'src/components/event/organizers/EventOrganizerCompanyEditor.vue';
import EventOrganizersEditor from 'src/components/event/organizers/EventOrganizersEditor.vue';

import { useEventOrganizers } from 'src/composables/api/event/useEventOrganizers';

const editCompany = ref(false)
const editOrganizers = ref(false);

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