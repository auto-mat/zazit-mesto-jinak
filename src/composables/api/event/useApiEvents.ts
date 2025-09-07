import { ref } from 'vue';
import eventService from 'src/services/eventService';
import { eventsAdapter } from 'src/adapters/eventAdapter';
import { EventInformationType, EventMetaType } from 'src/types/Event';


type ApiEventListType = {
  slug: string,
  name: string,
}

export function useApiEvents() {
  const error = ref<string | null>(null);

  const getEventList = async (userId: number) => {
    let events: EventMetaType[] = [];

    try {
      const response: ApiEventListType[] = await eventService.getEventList(userId);
      if (response && response.length > 0) {
        events = eventsAdapter.toEventList(response);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    }

    return events;
  }

  const getEventInformation = async (slug: string) => {
    let eventInformation: EventInformationType | null = null;

    try {
      const response = await eventService.getEventInformation(slug);
      if (response) {
        eventInformation = eventsAdapter.toEventInformation(response);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    }

    return eventInformation;
  }

  return {
    getEventList,
    getEventInformation,
    error
  }
}