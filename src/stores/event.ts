import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { EventMeta } from 'src/types/Event';

import { useApiEvents } from 'src/composables/api/event/useApiEvents';
import { useEventInformationStore } from './event/information';
import { useEventOrganizersStore } from './event/organizers';
import { useEventContentStore } from './event/content';
import { useEventProgramStore } from './event/program';

export const useEventStore = defineStore('events', () => {
  const eventInformationStore = useEventInformationStore();
  const eventOrganizersStore = useEventOrganizersStore();
  const eventContentStore = useEventContentStore();
  const eventProgramStore = useEventProgramStore();
  const { getEventListApi } = useApiEvents();

  const eventList = ref<EventMeta[]>([]);
  const slug = ref<string | null>(null);
  const loading = ref(false);

  const isLoading = computed(() => loading.value);

  const loadEventList = async (): Promise<void> => {
    loading.value = true;
    const events = await getEventListApi();
    if (events) {
      eventList.value = events;
    }
    loading.value = false;
  };

  const getEventName = (slug: string): string | null => {
    return eventList.value.find((event) => event.slug === slug)?.name ?? null;
  };

  const setSlug = (newSlug: string): void => {
    slug.value = newSlug;
  };

  const clearEventStore = (): void => {
    eventList.value = [];
    slug.value = null;
    loading.value = false;
    eventInformationStore.clearEventInformationStore();
    eventOrganizersStore.clearEventOrganizersStore();
    eventContentStore.clearEventContentStore();
    eventProgramStore.clearEventProgramStore();
  };

  return {
    eventList,
    slug,
    setSlug,
    loading,
    isLoading,
    loadEventList,
    getEventName,
    clearEventStore,
  };
});
