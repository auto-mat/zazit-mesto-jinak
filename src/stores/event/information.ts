import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { EventInformation, EventInformationForm } from 'src/types/Event';
import { Notify } from 'quasar';

import { useApiEvents } from 'src/composables/api/event/useApiEvents';
import { cloneDeep, pick } from 'lodash';
import { i18n } from 'src/boot/i18n';
import { useEventStore } from '../event';

export const useEventInformationStore = defineStore('eventsInformation', () => {
  const eventStore = useEventStore();

  const { getEventInformationApi, updateEventInformationApi } = useApiEvents();

  // Event information
  const eventInformation = ref<EventInformation | null>(null);
  const isEventInformationLoading = ref<boolean>(false);

  const loadEventInformation = async (slug: string): Promise<void> => {
    isEventInformationLoading.value = true;
    const eventInformationResponse = await getEventInformationApi(slug);

    if (!eventInformationResponse) {
      return;
    }

    eventInformation.value = eventInformationResponse;

    isEventInformationLoading.value = false;
  };

  // Event information form
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

  // Update event information
  const isEventInformationSaving = ref<boolean>(false);

  const updateEventInformation = async (): Promise<boolean> => {
    if (isEventInformationSaving.value) {
      return false;
    }
    isEventInformationSaving.value = true;
    if (!eventStore.slug) {
      return false;
    }
    const success = await updateEventInformationApi(
      eventStore.slug,
      eventInformationForm.value,
    );
    if (success) {
      clearEventInformationForm();
      await eventStore.loadEventList();
      await loadEventInformation(eventStore.slug);
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

  // Watch change of event
  watch(
    () => eventStore.slug,
    async (newSlug) => {
      console.log('newSlug', newSlug);
      if (newSlug) {
        clearEventInformationForm();
        await loadEventInformation(newSlug);
      }
    },
  );

  const clearEventInformationStore = (): void => {
    eventInformation.value = null;
    isEventInformationLoading.value = false;
    isEventInformationSaving.value = false;
  };

  return {
    eventInformation,
    eventInformationForm,
    isEventInformationFormDirty,
    isEventInformationSaving,
    isEventInformationLoading,
    clearEventInformationForm,
    resetEventInformationForm,
    updateEventInformation,
    clearEventInformationStore,
  };
});
