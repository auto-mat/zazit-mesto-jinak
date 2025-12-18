import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  EventContent,
  EventMeta,
  EventProgram,
  EventProgramItem,
} from 'src/types/Event';

import { useApiEvents } from 'src/composables/api/event/useApiEvents';
import { useApiEventContent } from 'src/composables/api/event/useApiEventContent';
import { useApiEventProgram } from 'src/composables/api/event/useApiEventProgram';
import { cloneDeep } from 'lodash';
import { useEventInformationStore } from './event/information';
import { useEventOrganizersStore } from './event/organizers';

export const useEventStore = defineStore(
  'events',
  () => {
    const eventInformationStore = useEventInformationStore();
    const eventOrganizersStore = useEventOrganizersStore();
    const { getEventListApi } = useApiEvents();
    const { fetchEventContent } = useApiEventContent();
    const { fetchEventProgram } = useApiEventProgram();

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

    // Event content
    const eventContent = ref<EventContent | null>(null);

    const loadEventContent = async (slug: string): Promise<void> => {
      const eventContentResponse = await fetchEventContent(slug);

      if (eventContentResponse) {
        eventContent.value = {
          image: null,
          mainContent: '',
          links: [],
        } as EventContent;
      }
    };

    const updateEventContent = async (
      newEventContent: EventContent,
    ): Promise<void> => {
      eventContent.value = cloneDeep(newEventContent);
      eventContent.value.image = null;
    };

    // Event program
    const eventProgram = ref<EventProgram>([]);

    const loadEventProgram = async (slug: string): Promise<void> => {
      loading.value = true;
      const eventProgramResponse = await fetchEventProgram(slug);

      if (eventProgramResponse) {
        eventProgram.value = [];
      }

      loading.value = false;
    };

    const addProgramItem = async (
      newProgramItem: EventProgramItem,
    ): Promise<void> => {
      console.log(newProgramItem);
      eventProgram.value = [...eventProgram.value, cloneDeep(newProgramItem)];
      console.log(eventProgram.value);
    };

    const deleteProgramItem = async (item: EventProgramItem): Promise<void> => {
      eventProgram.value = eventProgram.value?.filter(
        (programItem) => programItem.title !== item.title,
      );
    };

    const clearEventStore = (): void => {
      eventList.value = [];
      slug.value = null;
      loading.value = false;
      eventInformationStore.clearEventInformationStore();
      eventOrganizersStore.clearEventOrganizersStore();
      eventContent.value = null;
      eventProgram.value = [];
    };

    return {
      eventList,
      slug,
      setSlug,
      loading,
      isLoading,
      loadEventList,
      getEventName,
      loadEventContent,
      loadEventProgram,
      eventContent,
      updateEventContent,
      eventProgram,
      addProgramItem,
      deleteProgramItem,
      clearEventStore,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['eventContent', 'eventProgram'],
    },
  },
);
