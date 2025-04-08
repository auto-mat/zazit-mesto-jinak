import { onMounted, Ref, ref, watchEffect } from 'vue';
import eventService from 'src/services/eventService';

import { EventOrganizerCompanyType, EventOrganizersType } from 'src/types/Event';


type ApiCompanyType = {
  title: string,
  businessType: string,
  ico: string,
  dic: string
}

type ApiOrganizerType = {
  name: string,
  surname: string,
  email: string,
  phone: string,
  role: string
}

type ApiEventOrganizersType = {
  slug: string,
  name: string,
  organizers: ApiOrganizerType[],
  company: ApiCompanyType | null
} 

export function useEventOrganizers(slug: Ref<string>) {
  const eventName = ref('');
  const eventOrganizers = ref<EventOrganizersType | null>(null);
  const company = ref<EventOrganizerCompanyType | null>(null)
  const isLoading = ref(true);
  const error = ref(null);

  const fetchEventOrganizers = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: ApiEventOrganizersType = await eventService.getEventOrganizers(slug.value);
      eventName.value = response.name;
      company.value = response.company;
      eventOrganizers.value = response.organizers;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  watchEffect(() => {
    fetchEventOrganizers();
  })

  onMounted(fetchEventOrganizers);

  return {
    eventName,
    eventOrganizers,
    company,
    isLoading,
    error
  }
}