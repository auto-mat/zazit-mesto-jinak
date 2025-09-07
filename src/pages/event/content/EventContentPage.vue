<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>

    <!-- <div v-if="error" class="error">{{ error }}</div> -->

    <div v-if="eventContent && eventProgram" class="content">
      <div class="row justify-between items-end q-mb-md">
        <div>
          <span>{{ eventName }}</span>
          <h1>{{ $t('event.titleInformation') }}</h1>
        </div>

        <edit-button :to="{ name: 'eventContentEdit', params: { slug: slug }}" />
      </div>

      <!-- <embed 
        src="https://zazitmestojinak.cz/locations_/praha/praha-3/husitska" 
        style="width:500px; height: 300px;"
      > -->


      <event-content-preview :event-content :event-program />

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EditButton from 'src/components/buttons/EditButton.vue'
import EventContentPreview from 'components/event/content/EventContentPreview.vue';
import { useEventStore } from 'src/stores/eventStore'

const route = useRoute()
const slug = ref(route.params.slug as string)

const eventStore = useEventStore()

onMounted(() => {
  eventStore.loadEventContent(slug.value);
  eventStore.loadEventProgram(slug.value);
});

const isLoading = computed(() => eventStore.isLoading);
const eventName = computed(() => eventStore.getEventName(slug.value));
const eventContent = computed(() => eventStore.getEventContent(slug.value));
const eventProgram = computed(() => eventStore.getEventProgram(slug.value));

</script>