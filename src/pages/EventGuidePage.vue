<template>
  <q-page class="column q-pa-xl">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="eventGuide" class="content">
      <div class="q-mb-md">
      <span>{{ $t('event.titleStatus') }}</span>
      <h1>{{ eventGuide.name }}</h1>
    </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { EventGuideType, getEventGuide } from 'app/mock/eventData'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false)
const eventGuide = ref<EventGuideType | null>(null)
const error = ref(null)

// watch the params of the route to fetch the data again
watch(() => route.params.slug, fetchData, { immediate: true })

async function fetchData(value: string | string[]) {
  error.value = eventGuide.value = null
  loading.value = true
  
  try {
    eventGuide.value = await getEventGuide(value[0])
    // replace `getPost` with your data fetching util / API wrapper
    //post.value = await getEventGuide(title)
  } catch (err) {
    // error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>