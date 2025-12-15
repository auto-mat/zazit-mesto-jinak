import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import {
  EventContent,
  EventInformation,
  EventInformationForm,
  EventMeta,
  EventProgram,
} from 'src/types/Event';
import { Notify } from 'quasar';

import { useApiEvents } from 'src/composables/api/event/useApiEvents';
import { useApiEventContent } from 'src/composables/api/event/useApiEventContent';
import { useApiEventProgram } from 'src/composables/api/event/useApiEventProgram';
import { cloneDeep, pick } from 'lodash';
import { i18n } from 'src/boot/i18n';

export const useEventStore = defineStore('events', () => {
  const { getEventListApi, getEventInformationApi, updateEventInformationApi } =
    useApiEvents();
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

  // Event information
  const eventInformation = ref<EventInformation | null>(null);
  const isEventInformationLoading = ref<boolean>(false);
  const isEventInformationSaving = ref<boolean>(false);

  const loadEventInformation = async (slug: string): Promise<void> => {
    isEventInformationLoading.value = true;
    const eventInformationResponse = await getEventInformationApi(slug);

    if (!eventInformationResponse) {
      return;
    }

    eventInformation.value = eventInformationResponse;

    isEventInformationLoading.value = false;
  };

  const defaultEventInformationForm: EventInformationForm = {
    name: '',
    date: '',
    place: '',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  };

  const eventInformationForm = ref<EventInformationForm>(
    cloneDeep(defaultEventInformationForm),
  );
  const isEventInformationFormDirty = ref(false);

  const clearEventInformationForm = (): void => {
    eventInformationForm.value = cloneDeep(defaultEventInformationForm);
    isEventInformationFormDirty.value = false;
  };

  const resetEventInformationForm = (): void => {
    eventInformationForm.value = cloneDeep(
      pick(eventInformation.value, [
        'name',
        'date',
        'place',
        'coordinates.latitude',
        'coordinates.longitude',
      ]),
    );
    isEventInformationFormDirty.value = false;
  };

  watch(eventInformation, (newEventInformation) => {
    if (newEventInformation) {
      eventInformationForm.value = cloneDeep(
        pick(newEventInformation, [
          'name',
          'date',
          'place',
          'coordinates.latitude',
          'coordinates.longitude',
        ]),
      );
      isEventInformationFormDirty.value = false;
    }
  });

  const updateEventInformation = async (): Promise<boolean> => {
    isEventInformationSaving.value = true;
    if (!slug.value) {
      return false;
    }
    const success = await updateEventInformationApi(
      slug.value,
      eventInformationForm.value,
    );
    if (success) {
      clearEventInformationForm();
      await loadEventList();
      await loadEventInformation(slug.value);
      Notify.create({
        message: i18n.global.t('event.information.successUpdate'),
        color: 'positive',
      });
      isEventInformationSaving.value = false;
      return true;
    }
    isEventInformationSaving.value = false;
    return false;
  };

  // Event content
  const eventContent = ref<EventContent | null>(null);

  const loadEventContent = async (slug: string): Promise<void> => {
    loading.value = true;
    const eventContentResponse = await fetchEventContent(slug);

    if (eventContentResponse) {
      eventContent.value = eventContentResponse;
    }

    loading.value = false;
  };

  // Event program
  const eventProgram = ref<EventProgram | null>(null);

  const loadEventProgram = async (slug: string): Promise<void> => {
    loading.value = true;
    const eventProgramResponse = await fetchEventProgram(slug);

    if (eventProgramResponse) {
      eventProgram.value = eventProgramResponse;
    }

    loading.value = false;
  };

  watch(slug, async (newSlug) => {
    if (newSlug) {
      clearEventInformationForm();
      await loadEventInformation(newSlug);
    }
  });

  return {
    eventList,
    slug,
    setSlug,
    loading,
    isLoading,
    loadEventList,
    getEventName,
    loadEventInformation,
    loadEventContent,
    loadEventProgram,
    eventInformation,
    eventContent,
    eventProgram,
    eventInformationForm,
    isEventInformationFormDirty,
    isEventInformationSaving,
    isEventInformationLoading,
    clearEventInformationForm,
    resetEventInformationForm,
    updateEventInformation,
  };
});
