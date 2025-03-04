<template>
  <q-page class="column q-pa-xl">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="eventContent" class="content">
      <div class="q-mb-md">
        <span>{{ eventContent.name }}</span>
        <h1>{{ $t('event.titleWebContent') }}</h1>
      </div>

      <!-- <embed 
        src="https://zazitmestojinak.cz/locations_/praha/praha-3/husitska" 
        style="width:500px; height: 300px;"
      > -->

      <!-- FormFieldImage -->
      <event-content-preview />

    </div>
  </q-page>
</template>

<script setup lang="ts">
import EventContentPreview from 'components/event/content/EventContentPreview.vue'
import { EventContentType, getEventContent } from 'app/mock/eventData'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false)
const eventContent = ref<EventContentType | null>(null)
const error = ref(null)

// watch the params of the route to fetch the data again
watch(() => route.params.slug, fetchData, { immediate: true })

async function fetchData(value: string | string[]) {
  error.value = eventContent.value = null
  loading.value = true
  
  try {
    eventContent.value = await getEventContent(value[0])
    // replace `getPost` with your data fetching util / API wrapper
    //post.value = await getEventGuide(title)
  } catch (err) {
    // error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>