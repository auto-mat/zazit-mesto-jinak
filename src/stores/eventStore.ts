import { defineStore } from 'pinia';
import { EventDetailsType, EventMetaType } from 'src/types/Event';

import { useApiEvents } from 'src/composables/api/event/useApiEvents';
import { useApiEventContent } from 'src/composables/api/event/useApiEventContent';


export const useEventStore = defineStore('events', {
  state: () => ({
    eventList: [] as EventMetaType[],
    eventDetails: {} as Record<string, EventDetailsType>,
    loading: false,
  }),
  getters: {
    isLoading: (state) => state.loading,
    getEventList: (state) => state.eventList,
    getEventName: (state) => (slug: string) => state.eventList.find(event => event.slug === slug)?.name ?? '',
    getEventInformation: (state) => (slug: string) => state.eventDetails[slug]?.information,
    getEventOrganizers: (state) => (slug: string) => state.eventDetails[slug]?.organizers,
    getEventContent: (state) => (slug: string) => state.eventDetails[slug]?.content,
    getEventProgram: (state) => (slug: string) => state.eventDetails[slug]?.program,
  },
  actions: {
    async loadEventList() {
      const { getEventList } = useApiEvents(); 
      this.loading = true;
      const events = await getEventList(0); // TODO user id
      this.eventList = events;
      this.loading = false;
    },

    async loadEventInformation(slug: string) {
      const { getEventInformation } = useApiEvents();
      this.loading = true;
      const eventInformation = await getEventInformation(slug);

      if (!this.eventDetails[slug]) {
        this.eventDetails[slug] = {}
      }

      if (eventInformation) {
        this.eventDetails[slug].information = eventInformation
      }

      this.loading = false;
    },

    async loadEventContent(slug: string) {
      const { fetchEventContent } = useApiEventContent();
      this.loading = true;
      const eventContent = await fetchEventContent(slug);

      if (!this.eventDetails[slug]) {
        this.eventDetails[slug] = {}
      }

      if (eventContent) {
        this.eventDetails[slug].content = eventContent
      }

      this.loading = false;
    },

    clearEventDetails(slug: string) {
      delete this.eventDetails[slug];
    }
  },
});
