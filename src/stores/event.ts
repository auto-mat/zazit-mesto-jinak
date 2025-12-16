import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import {
  EventContent,
  EventInformation,
  EventInformationForm,
  EventMeta,
  EventOrganizer,
  EventOrganizerCompany,
  EventProgram,
  EventProgramItem,
} from 'src/types/Event';
import { Notify } from 'quasar';

import { useApiEvents } from 'src/composables/api/event/useApiEvents';
import { useApiEventContent } from 'src/composables/api/event/useApiEventContent';
import { useApiEventProgram } from 'src/composables/api/event/useApiEventProgram';
import { cloneDeep, pick } from 'lodash';
import { i18n } from 'src/boot/i18n';

export const useEventStore = defineStore(
  'events',
  () => {
    const {
      getEventListApi,
      getEventInformationApi,
      updateEventInformationApi,
    } = useApiEvents();
    const { fetchEventContent } = useApiEventContent();
    const { fetchEventProgram } = useApiEventProgram();

    const eventList = ref<EventMeta[]>([]);
    const slug = ref<string | null>(null);
    const loading = ref(false);

    const isLoading = computed(() => loading.value);

    const loadEventList = async (): Promise<void> => {
      loading.value = true;
      const events = await getEventListApi();
      if (events) {
        eventList.value = events;
      }
      loading.value = false;
    };

    const getEventName = (slug: string): string | null => {
      return eventList.value.find((event) => event.slug === slug)?.name ?? null;
    };

    const setSlug = (newSlug: string): void => {
      slug.value = newSlug;
    };

    // Event information
    const eventInformation = ref<EventInformation | null>(null);
    const isEventInformationLoading = ref<boolean>(false);
    const isEventInformationSaving = ref<boolean>(false);

    const loadEventInformation = async (slug: string): Promise<void> => {
      isEventInformationLoading.value = true;
      const eventInformationResponse = await getEventInformationApi(slug);

      if (!eventInformationResponse) {
        return;
      }

      eventInformation.value = eventInformationResponse;

      isEventInformationLoading.value = false;
    };

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

    const updateEventInformation = async (): Promise<boolean> => {
      if (isEventInformationSaving.value) {
        return false;
      }
      isEventInformationSaving.value = true;
      if (!slug.value) {
        return false;
      }
      const success = await updateEventInformationApi(
        slug.value,
        eventInformationForm.value,
      );
      if (success) {
        clearEventInformationForm();
        await loadEventList();
        await loadEventInformation(slug.value);
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

    // Event organizers
    // Event organizers
    const eventOrganizers = ref<EventOrganizer[]>([]);
    const eventOrganizerCompany = ref<EventOrganizerCompany | null>(null);
    const eventOrganizersForm = ref<{
      organizers: EventOrganizer[];
      company: EventOrganizerCompany | null;
    }>({
      organizers: [],
      company: null,
    });
    const isEventOrganizersFormDirty = ref(false);
    const isEventOrganizersLoading = ref(false);
    const isEventOrganizersSaving = ref(false);

    const loadEventOrganizers = async (): Promise<void> => {
      isEventOrganizersLoading.value = true;
      // Replace this with actual API call
      // Example: const response = await fetchEventOrganizers(slug);
      // if (response) {
      //   eventOrganizers.value = response.organizers;
      //   eventOrganizerCompany.value = response.company;
      // }
      eventOrganizers.value = [];
      eventOrganizerCompany.value = null;
      isEventOrganizersLoading.value = false;
    };

    const clearEventOrganizersForm = () => {
      eventOrganizersForm.value = {
        organizers: cloneDeep(eventOrganizers.value),
        company: cloneDeep(eventOrganizerCompany.value),
      };
      isEventOrganizersFormDirty.value = false;
    };

    watch(
      [eventOrganizers, eventOrganizerCompany],
      ([newOrganizers, newCompany]) => {
        if (newOrganizers != null && newCompany !== undefined) {
          eventOrganizersForm.value = {
            organizers: cloneDeep(newOrganizers),
            company: cloneDeep(newCompany),
          };
          isEventOrganizersFormDirty.value = false;
        }
      },
    );

    const updateEventOrganizers = async (
      company: EventOrganizerCompany | null,
      organizers: EventOrganizer[],
    ): Promise<boolean> => {
      if (isEventOrganizersSaving.value) {
        return false;
      }
      isEventOrganizersSaving.value = true;
      if (!slug.value) {
        return false;
      }
      // Replace with actual updateEventOrganizersApi
      // const success = await updateEventOrganizersApi(slug.value, eventOrganizersForm.value);
      eventOrganizers.value = cloneDeep(organizers);
      eventOrganizerCompany.value = company ? cloneDeep(company) : null;
      const success = true;
      if (success) {
        clearEventOrganizersForm();
        Notify.create({
          message: i18n.global.t('event.organizers.successUpdate'),
          color: 'positive',
        });
        isEventOrganizersSaving.value = false;
        return true;
      }
      isEventOrganizersSaving.value = false;
      return false;
    };

    // Event content
    const eventContent = ref<EventContent | null>(null);

    const loadEventContent = async (slug: string): Promise<void> => {
      const eventContentResponse = await fetchEventContent(slug);

      if (eventContentResponse) {
        eventContent.value = {
          image: null,
          mainContent: '',
          links: [],
        } as EventContent;
      }
    };

    const updateEventContent = async (
      newEventContent: EventContent,
    ): Promise<void> => {
      eventContent.value = cloneDeep(newEventContent);
      eventContent.value.image = null;
    };

    // Event program
    const eventProgram = ref<EventProgram>([]);

    const loadEventProgram = async (slug: string): Promise<void> => {
      loading.value = true;
      const eventProgramResponse = await fetchEventProgram(slug);

      if (eventProgramResponse) {
        eventProgram.value = [];
      }

      loading.value = false;
    };

    const addProgramItem = async (
      newProgramItem: EventProgramItem,
    ): Promise<void> => {
      console.log(newProgramItem);
      eventProgram.value = [...eventProgram.value, cloneDeep(newProgramItem)];
      console.log(eventProgram.value);
    };

    const deleteProgramItem = async (item: EventProgramItem): Promise<void> => {
      eventProgram.value = eventProgram.value?.filter(
        (programItem) => programItem.title !== item.title,
      );
    };

    watch(slug, async (newSlug) => {
      if (newSlug) {
        clearEventInformationForm();
        await loadEventInformation(newSlug);
      }
    });

    const clearEventStore = (): void => {
      eventList.value = [];
      slug.value = null;
      loading.value = false;
      eventInformation.value = null;
      isEventInformationLoading.value = false;
      isEventInformationSaving.value = false;
      eventContent.value = null;
      eventProgram.value = [];
      eventOrganizers.value = [];
      eventOrganizerCompany.value = null;
      isEventOrganizersLoading.value = false;
      isEventOrganizersSaving.value = false;
    };

    return {
      eventList,
      slug,
      setSlug,
      loading,
      isLoading,
      loadEventList,
      getEventName,
      loadEventInformation,
      loadEventContent,
      loadEventProgram,
      eventInformation,
      eventContent,
      updateEventContent,
      eventProgram,
      addProgramItem,
      deleteProgramItem,
      eventInformationForm,
      isEventInformationFormDirty,
      isEventInformationSaving,
      isEventInformationLoading,
      clearEventInformationForm,
      resetEventInformationForm,
      updateEventInformation,
      eventOrganizers,
      eventOrganizerCompany,
      loadEventOrganizers,
      updateEventOrganizers,
      isEventOrganizersLoading,
      isEventOrganizersSaving,
      clearEventStore,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: [
        'eventContent',
        'eventProgram',
        'eventOrganizers',
        'eventOrganizerCompany',
      ],
    },
  },
);
