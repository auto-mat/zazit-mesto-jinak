<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="eventContent && eventProgram" class="content">
      <div class="q-mb-md">
        <span>{{ eventName }}</span>
        <h1>{{ $t('event.titleWebContent') }}</h1>
      </div>

      <!-- <embed 
        src="https://zazitmestojinak.cz/locations_/praha/praha-3/husitska" 
        style="width:500px; height: 300px;"
      > -->


      <event-content-editor v-if="edit" :event-content />
      <event-content-preview v-else :event-content :event-program @edit="edit = true" />

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEventContent } from 'src/composables/api/event/useEventContent'
import EventContentPreview from 'components/event/content/EventContentPreview.vue'
import EventContentEditor from 'src/components/event/content/EventContentEditor.vue'
import { useEventProgram } from 'src/composables/api/event/useEventProgram'

const edit = ref(false)

const route = useRoute()
const slug = ref(route.params.slug[0])

// watch the params of the route to fetch the data again
watch(
  () => route.params.slug, 
  () => slug.value = route.params.slug[0], 
  { immediate: true }
)

const { eventName, eventContent, isLoading, error } = useEventContent(slug)
const { eventProgram } = useEventProgram(slug)

</script>