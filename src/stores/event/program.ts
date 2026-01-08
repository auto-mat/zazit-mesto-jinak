import { defineStore } from 'pinia';
import { useEventStore } from '../event';
import { ref, watch } from 'vue';
import {
  EventCategory,
  EventProgram,
  EventProgramItem,
  EventProgramItemPayload,
} from 'src/types/Event';
import { useApiEventProgram } from 'src/composables/api/event/useApiEventProgram';
import { cloneDeep } from 'lodash';
import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export const useEventProgramStore = defineStore('eventProgram', () => {
  const eventStore = useEventStore();

  const {
    getEventProgramApi,
    createEventProgramItemApi,
    updateEventProgramItemApi,
    deleteEventProgramItemApi,
    getEventCategoriesApi,
  } = useApiEventProgram();

  // Event program
  const eventProgram = ref<EventProgram>([]);
  const isEventProgramLoading = ref<boolean>(false);

  const loadEventProgram = async (slug: string): Promise<void> => {
    isEventProgramLoading.value = true;
    const eventProgramResponse = await getEventProgramApi(slug);

    if (eventProgramResponse) {
      eventProgram.value = eventProgramResponse;
    }

    isEventProgramLoading.value = false;
  };

  // Event program form
  const defaultEventProgramForm: EventProgramItemPayload = {
    id: null,
    name: '',
    description: '',
    timeFrom: '',
    timeTo: '',
    categories: [],
  };

  const eventProgramForm = ref<EventProgramItemPayload>(
    cloneDeep(defaultEventProgramForm),
  );
  const isEventProgramFormDirty = ref(false);

  const clearEventProgramForm = (): void => {
    eventProgramForm.value = cloneDeep(defaultEventProgramForm);
    isEventProgramFormDirty.value = false;
  };

  const selectedEventProgramItem = ref<EventProgramItem | null>(null);

  const selectEventProgramItem = (item: EventProgramItem | null): void => {
    if (item) {
      eventProgramForm.value = {
        id: item.id,
        name: item.name,
        description: item.description,
        timeFrom: item.timeFrom,
        timeTo: item.timeTo,
        categories: item.categories.map((category) => category.id),
      };
    } else {
      eventProgramForm.value = cloneDeep(defaultEventProgramForm);
    }
    selectedEventProgramItem.value = item;
    isEventProgramFormDirty.value = false;
  };

  // Add or update program item
  const isEventProgramSaving = ref<boolean>(false);

  const addOrUpdateProgramItem = async (): Promise<boolean> => {
    if (isEventProgramSaving.value) {
      return false;
    }
    if (!eventStore.slug) {
      return false;
    }
    isEventProgramSaving.value = true;
    let success = false;
    if (selectedEventProgramItem.value) {
      success = await updateEventProgramItemApi(
        eventStore.slug,
        eventProgramForm.value,
      );
    } else {
      success = await createEventProgramItemApi(
        eventStore.slug,
        eventProgramForm.value,
      );
    }
    if (success) {
      clearEventProgramForm();
      await loadEventProgram(eventStore.slug);
      Notify.create({
        message: selectedEventProgramItem.value
          ? i18n.global.t('event.program.successUpdate')
          : i18n.global.t('event.program.successAdd'),
        color: 'positive',
      });
      selectedEventProgramItem.value = null;
      isEventProgramSaving.value = false;
      return true;
    }
    isEventProgramSaving.value = false;
    return false;
  };

  // Delete program item
  const deleteProgramItem = async (
    item: EventProgramItem,
  ): Promise<boolean> => {
    if (!eventStore.slug || !item.id) {
      return false;
    }
    isEventProgramSaving.value = true;
    const success = await deleteEventProgramItemApi(eventStore.slug, item);
    if (success) {
      await loadEventProgram(eventStore.slug);
      Notify.create({
        message: i18n.global.t('event.program.successDelete'),
        color: 'positive',
      });
      isEventProgramSaving.value = false;
      return true;
    }
    isEventProgramSaving.value = false;
    return false;
  };

  // Get event categories
  const eventCategories = ref<EventCategory[]>([]);
  const getEventCategories = async (): Promise<void> => {
    const eventCategoriesResponse = await getEventCategoriesApi();
    eventCategories.value = eventCategoriesResponse;
  };

  // Watch change of event
  watch(
    () => eventStore.slug,
    (newSlug) => {
      if (newSlug) {
        clearEventProgramForm();
        loadEventProgram(newSlug);
        getEventCategories();
      }
    },
  );

  const clearEventProgramStore = (): void => {
    eventProgram.value = [];
    isEventProgramLoading.value = false;
    isEventProgramSaving.value = false;
    selectedEventProgramItem.value = null;
  };

  return {
    loadEventProgram,
    eventProgram,
    addOrUpdateProgramItem,
    deleteProgramItem,
    clearEventProgramStore,
    eventProgramForm,
    isEventProgramFormDirty,
    selectedEventProgramItem,
    isEventProgramSaving,
    isEventProgramLoading,
    clearEventProgramForm,
    selectEventProgramItem,
    eventCategories,
    getEventCategories,
  };
});
