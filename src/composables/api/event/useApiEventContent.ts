import { ref } from 'vue';
import eventService from 'src/services/eventService';

import { EventContentType } from 'src/types/Event';
import { eventsAdapter } from 'src/adapters/eventAdapter';


type ApiLinkType = {
  title: string,
  url: string
}

type ApiEventContentType = {
  image: File | null,
  main_content: string,
  links: ApiLinkType[]
} 

export function useApiEventContent() {
  const error = ref<string | null>(null);

  const fetchEventContent = async (slug: string) => {
    let eventContent: EventContentType | null = null;

    try {
      const response: ApiEventContentType = await eventService.getEventContent(slug);
      if (response) {
        eventContent = eventsAdapter.toEventContent(response); 
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    }

    return eventContent;
  }

  return {
    fetchEventContent,
    error
  }
}