import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { EventContent, EventContentForm } from 'src/types/Event';

import { useApiEventContent } from 'src/composables/api/event/useApiEventContent';
import { cloneDeep, pick } from 'lodash';
import { useEventStore } from '../event';
import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export const useEventContentStore = defineStore('eventsContent', () => {
  const eventStore = useEventStore();
  const { getEventContentApi, updateEventContentApi } = useApiEventContent();

  // Event content
  const eventContent = ref<EventContent | null>(null);
  const isEventContentLoading = ref<boolean>(false);

  const loadEventContent = async (slug: string): Promise<void> => {
    isEventContentLoading.value = true;
    const eventContentResponse = await getEventContentApi(slug);

    if (eventContentResponse) {
      eventContent.value = eventContentResponse;
    }

    isEventContentLoading.value = false;
  };

  // Event content form
  const defaultEventContentForm: EventContentForm = {
    image: null,
    mainContent: '',
    links: [],
  };

  const eventContentForm = ref<EventContentForm>(
    cloneDeep(defaultEventContentForm),
  );
  const isEventContentFormDirty = ref(false);

  const clearEventContentForm = (): void => {
    eventContentForm.value = cloneDeep(defaultEventContentForm);
    isEventContentFormDirty.value = false;
  };

  const resetEventContentForm = (): void => {
    eventContentForm.value = cloneDeep(eventContent.value);
    isEventContentFormDirty.value = false;
  };

  watch(eventContent, (newEventContent) => {
    if (newEventContent) {
      eventContentForm.value = cloneDeep(
        pick(newEventContent, ['mainContent', 'links']),
      );
      isEventContentFormDirty.value = false;
    }
  });

  // Update event content
  const isEventContentSaving = ref<boolean>(false);

  const updateEventContent = async (): Promise<boolean> => {
    if (isEventContentSaving.value) {
      return false;
    }
    if (!eventStore.slug) {
      return false;
    }
    isEventContentSaving.value = true;
    const success = await updateEventContentApi(
      eventStore.slug,
      eventContentForm.value,
    );
    if (success) {
      clearEventContentForm();
      await loadEventContent(eventStore.slug);
      Notify.create({
        message: i18n.global.t('event.content.successUpdate'),
        color: 'positive',
      });
      isEventContentSaving.value = false;
      return true;
    }
    isEventContentSaving.value = false;
    return false;
  };

  // Watch change of event
  watch(
    () => eventStore.slug,
    async (newSlug) => {
      if (newSlug) {
        clearEventContentForm();
        await loadEventContent(newSlug);
      }
    },
  );

  const clearEventContentStore = (): void => {
    eventContent.value = null;
  };

  return {
    eventContent,
    eventContentForm,
    isEventContentFormDirty,
    isEventContentSaving,
    isEventContentLoading,
    loadEventContent,
    updateEventContent,
    clearEventContentStore,
    resetEventContentForm,
  };
});
