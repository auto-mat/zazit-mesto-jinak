import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { EventOrganizer, EventOrganizerCompany } from 'src/types/Event';
import { Notify } from 'quasar';

import { cloneDeep } from 'lodash';
import { i18n } from 'src/boot/i18n';
import { useApiEventOrganizers } from 'src/composables/api/event/useApiEventOrganizers';
import { useEventStore } from '../event';
import { CompanyType } from 'src/types/Register';
import { useApiRegister } from 'src/composables/api/useApiRegister';

export const useEventOrganizersStore = defineStore(
  'eventsOrganizers',
  () => {
    const eventStore = useEventStore();

    const {
      getEventOrganizerCompanyApi,
      updateEventOrganizerCompanyApi,
      getEventOrganizersApi,
      updateEventOrganizersApi,
    } = useApiEventOrganizers();
    const { getCompanyTypesApi } = useApiRegister();

    // Event organizers
    const eventOrganizers = ref<EventOrganizer[]>([]);

    const isEventOrganizersFormDirty = ref(false);
    const isEventOrganizersLoading = ref(false);
    const isEventOrganizersSaving = ref(false);

    const loadEventOrganizers = async (): Promise<void> => {
      isEventOrganizersLoading.value = true;
      const eventOrganizersResponse = await getEventOrganizersApi(
        eventStore.slug,
      );
      if (eventOrganizersResponse) {
        eventOrganizers.value = eventOrganizersResponse;
      } else {
        eventOrganizers.value = [];
      }
      isEventOrganizersLoading.value = false;
    };

    // Event organizers form
    const eventOrganizersForm = ref<EventOrganizer[]>([]);

    const clearEventOrganizersForm = () => {
      eventOrganizersForm.value = [];
      isEventOrganizersFormDirty.value = false;
    };

    const resetEventOrganizersForm = () => {
      eventOrganizersForm.value = cloneDeep(eventOrganizers.value);
      isEventOrganizersFormDirty.value = false;
    };

    watch(eventOrganizers, (newOrganizers) => {
      eventOrganizersForm.value = cloneDeep(newOrganizers);
      isEventOrganizersFormDirty.value = false;
    });

    // Update event organizers
    const updateEventOrganizers = async (): Promise<boolean> => {
      if (isEventOrganizersSaving.value || eventStore.slug === null) {
        return false;
      }
      isEventOrganizersSaving.value = true;
      const success = await updateEventOrganizersApi(
        eventStore.slug,
        eventOrganizersForm.value,
      );
      if (success) {
        clearEventOrganizersForm();
        await loadEventOrganizers();
        Notify.create({
          message: i18n.global.t('event.organizers.successOrganizersUpdate'),
          color: 'positive',
        });
        isEventOrganizersSaving.value = false;
        return true;
      }
      isEventOrganizersSaving.value = false;
      return false;
    };

    // Event organizer company
    const eventOrganizerCompany = ref<EventOrganizerCompany | null>(null);
    const isEventOrganizerCompanyLoading = ref(false);
    const isEventOrganizerCompanySaving = ref(false);

    const loadEventOrganizerCompany = async (): Promise<void> => {
      isEventOrganizerCompanyLoading.value = true;

      const eventOrganizerCompanyResponse = await getEventOrganizerCompanyApi(
        eventStore.slug,
      );

      if (eventOrganizerCompanyResponse) {
        eventOrganizerCompany.value = eventOrganizerCompanyResponse;
      } else {
        eventOrganizerCompany.value = null;
      }

      isEventOrganizerCompanyLoading.value = false;
    };

    // Event organizer company form
    const isEventOrganizerCompanyFormDirty = ref(false);
    const companyTypes = ref<CompanyType[]>([]);

    const getCompanyTypes = async (): Promise<void> => {
      companyTypes.value = await getCompanyTypesApi();
    };

    const defaultEventOrganizerCompanyForm: EventOrganizerCompany = {
      title: '',
      businessTypeName: '',
      businessType: null,
      ico: '',
      dic: '',
    };

    const eventOrganizerCompanyForm = ref<EventOrganizerCompany>(
      cloneDeep(defaultEventOrganizerCompanyForm),
    );

    const clearEventOrganizerCompanyForm = () => {
      eventOrganizerCompanyForm.value = cloneDeep(
        defaultEventOrganizerCompanyForm,
      );
      isEventOrganizerCompanyFormDirty.value = false;
    };

    const resetEventOrganizerCompanyForm = () => {
      eventOrganizerCompanyForm.value = cloneDeep(eventOrganizerCompany.value);
      isEventOrganizerCompanyFormDirty.value = false;
    };

    watch(eventOrganizerCompany, (newCompany) => {
      if (newCompany !== null) {
        eventOrganizerCompanyForm.value = cloneDeep(newCompany);
      } else {
        eventOrganizerCompanyForm.value = cloneDeep(
          defaultEventOrganizerCompanyForm,
        );
      }
      isEventOrganizerCompanyFormDirty.value = false;
    });

    // Update event organizer company
    const updateEventOrganizerCompany = async (): Promise<boolean> => {
      if (isEventOrganizerCompanySaving.value || eventStore.slug === null) {
        return false;
      }
      isEventOrganizerCompanySaving.value = true;

      const success = await updateEventOrganizerCompanyApi(
        eventStore.slug,
        eventOrganizerCompanyForm.value,
      );
      if (success) {
        clearEventOrganizerCompanyForm();
        await loadEventOrganizerCompany();
        Notify.create({
          message: i18n.global.t('event.organizers.successCompanyUpdate'),
          color: 'positive',
        });
        isEventOrganizerCompanySaving.value = false;
        return true;
      }
      isEventOrganizerCompanySaving.value = false;
      return false;
    };

    // Watch change of event
    watch(
      () => eventStore.slug,
      async (newSlug) => {
        if (newSlug) {
          clearEventOrganizersForm();
          await loadEventOrganizers();
          await loadEventOrganizerCompany();
        }
      },
    );

    const clearEventOrganizersStore = (): void => {
      eventOrganizers.value = [];
      eventOrganizerCompany.value = null;
      isEventOrganizersLoading.value = false;
      isEventOrganizersSaving.value = false;
      isEventOrganizerCompanyLoading.value = false;
      isEventOrganizerCompanySaving.value = false;
    };

    return {
      eventOrganizers,
      eventOrganizerCompany,
      companyTypes,
      getCompanyTypes,
      loadEventOrganizers,
      loadEventOrganizerCompany,
      updateEventOrganizers,
      updateEventOrganizerCompany,
      isEventOrganizersLoading,
      isEventOrganizersSaving,
      isEventOrganizerCompanyLoading,
      isEventOrganizerCompanySaving,
      eventOrganizersForm,
      eventOrganizerCompanyForm,
      isEventOrganizersFormDirty,
      isEventOrganizerCompanyFormDirty,
      resetEventOrganizersForm,
      resetEventOrganizerCompanyForm,
      clearEventOrganizersStore,
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
