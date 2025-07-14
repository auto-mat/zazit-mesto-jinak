import { ref } from 'vue';
import eventService from 'src/services/eventService';

import { EventProgramType } from 'src/types/Event';
import { eventsAdapter } from 'src/adapters/eventAdapter';

export function useApiEventProgram() {
  const error = ref(null);

  const fetchEventProgram = async (slug: string) => {
    let eventProgram: EventProgramType = [];

    try {
      const response = await eventService.getEventProgram(slug);
      if (response && response.length > 0) {
        eventProgram = eventsAdapter.toEventProgram(response)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    }

    return eventProgram;
  }

  return {
    fetchEventProgram,
    error
  }
}