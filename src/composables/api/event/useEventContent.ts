import { onMounted, Ref, ref, watchEffect } from 'vue';
import eventService from 'src/services/eventService';

import { EventContentType } from 'src/types/Event';


type ApiLinkType = {
  title: string,
  url: string
}

type ApiEventContentType = {
  slug: string,
  name: string,
  image: File | null,
  mainContent: string,
  links: ApiLinkType[]
} 

export function useEventContent(slug: Ref<string>) {
  const eventName = ref('');
  const eventContent = ref<EventContentType | null>(null);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchEventContent = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: ApiEventContentType = await eventService.getEventContent(slug.value);
      eventName.value = response.name;
      eventContent.value = {
        image: response.image,
        mainContent: response.mainContent,
        links: response.links
      };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  watchEffect(() => {
    fetchEventContent();
  })

  onMounted(fetchEventContent);

  return {
    eventName,
    eventContent,
    isLoading,
    error
  }
}