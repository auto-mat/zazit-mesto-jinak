<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="eventProgram">
      <div class="row justify-between items-end q-mb-md">
        <div class="q-mb-md">
          <span>{{ eventName }}</span>
          <h1>{{ $t('event.titleProgram') }}</h1>
        </div>

        <back-button v-if="edit" @back="edit = false" />
        <edit-button v-else @edit="edit = true" />
      </div>

      <event-program-editor v-if="edit" :event-program/>

      <event-program-table v-else :rows="eventProgram" />
    </div>
    
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import EventProgramTable from 'src/components/event/program/EventProgramTable.vue';
import EventProgramEditor from 'src/components/event/program/EventProgramEditor.vue';
import EditButton from 'src/components/buttons/EditButton.vue';
import BackButton from 'src/components/buttons/BackButton.vue';

import { useEventProgram } from 'src/composables/api/event/useEventProgram';


const edit = ref(false)

const route = useRoute()
const slug = ref(route.params.slug[0])

// watch the params of the route to fetch the data again
watch(
  () => route.params.slug, 
  () => slug.value = route.params.slug[0], 
  { immediate: true }
)

const { eventName, eventProgram, isLoading, error } = useEventProgram(slug)

</script>