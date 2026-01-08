import { Notify } from 'quasar';
import {
  ApiEventOrganizerCompany,
  ApiEventOrganizer,
  eventsAdapter,
} from 'src/adapters/eventAdapter';
import apiFetch from 'src/api/apiFetch';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';
import { EventOrganizerCompany, EventOrganizers } from 'src/types/Event';

export function useApiEventOrganizers() {
  const loginStore = useLoginStore();

  const getEventOrganizerCompanyApi = async (
    slug: string,
  ): Promise<EventOrganizerCompany | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }

    const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventOrganizerCompany}`;
    try {
      const { data } = await apiFetch.get<ApiEventOrganizerCompany>(url);
      return data ? eventsAdapter.toEventOrganizerCompany(data) : null;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const updateEventOrganizerCompanyApi = async (
    slug: string,
    eventOrganizerCompany: EventOrganizerCompany,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }

    const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventOrganizerCompany}`;
    try {
      await apiFetch.put<void>(
        url,
        eventsAdapter.toEventOrganizerCompanyPayload(eventOrganizerCompany),
      );
      return true;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return false;
    }
  };

  const getEventOrganizersApi = async (
    slug: string,
  ): Promise<EventOrganizers | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }

    const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventOrganizers}`;
    try {
      const { data } = await apiFetch.get<ApiEventOrganizer[]>(url);
      return data ? eventsAdapter.toEventOrganizers(data) : [];
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const updateEventOrganizersApi = async (
    slug: string,
    eventOrganizers: EventOrganizers,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }

    const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventOrganizers}`;
    try {
      await apiFetch.put<void>(
        url,
        eventsAdapter.toEventOrganizersPayload(eventOrganizers),
      );
      return true;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return false;
    }
  };

  return {
    getEventOrganizerCompanyApi,
    updateEventOrganizerCompanyApi,
    getEventOrganizersApi,
    updateEventOrganizersApi,
  };
}
