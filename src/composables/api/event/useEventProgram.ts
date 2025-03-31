import { onMounted, Ref, ref, watchEffect } from 'vue';
import eventService from 'src/services/eventService';

import { EventProgramType } from 'src/types/Event';


type ApiEventProgramItemType = {
  title: string,
  description: string,
  timeFrom: string,
  timeTo: string,
  categories: string[]
}

type ApiEventProgramType = {
  slug: string,
  name: string,
  program: ApiEventProgramItemType[]
} 

export function useEventProgram(slug: Ref<string>) {
  const eventName = ref('');
  const eventProgram = ref<EventProgramType | null>(null);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchEventProgram = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: ApiEventProgramType = await eventService.getEventProgram(slug.value);
      eventName.value = response.name;
      eventProgram.value = response.program;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  watchEffect(() => {
    fetchEventProgram();
  })

  onMounted(fetchEventProgram);

  return {
    eventName,
    eventProgram,
    isLoading,
    error
  }
}