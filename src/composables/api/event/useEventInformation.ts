import { onMounted, Ref, ref, watchEffect } from 'vue';
import eventService from 'src/services/eventService';

import { EventInformationType } from 'src/types/Event';


type ApiEventInformationType = {
  slug: string,
  name: string,
  date: string,
  address: string,
  latitude: number,
  longitude: number,
  municipalDistrict: string,
  spaceType: string,
  spaceArea: string,
  eventType: string,
  eventTypeDescription: string,
}

export function useEventInformation(slug: Ref<string>) {
  const eventName = ref('');
  const eventInformation = ref<EventInformationType | null>(null);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchEventInformation = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: ApiEventInformationType = await eventService.getEventInformation(slug.value);
      eventName.value = response.name;
      eventInformation.value = {
        name: response.name,
        date: response.date,
        address: response.address,
        municipalDistrinct: response.municipalDistrict,
        coordinates: {
          latitude: response.latitude,
          longitude: response.longitude,
        },
        spaceType: response.spaceType,
        spaceArea: response.spaceArea,
        eventType: response.eventType,
        eventTypeDescription: response.eventTypeDescription
      };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  watchEffect(() => {
    fetchEventInformation();
  })

  onMounted(fetchEventInformation);

  return {
    eventName,
    eventInformation,
    isLoading,
    error
  }
}