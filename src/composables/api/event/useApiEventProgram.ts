import {
  EventCategory,
  EventProgram,
  EventProgramItem,
  EventProgramItemPayload,
} from 'src/types/Event';
import {
  ApiEventCategory,
  ApiEventProgramItem,
  eventsAdapter,
} from 'src/adapters/eventAdapter';
import { useLoginStore } from 'src/stores/login';
import { Notify } from 'quasar';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import apiFetch from 'src/api/apiFetch';

export function useApiEventProgram() {
  const loginStore = useLoginStore();

  const getEventCategoriesApi = async (): Promise<EventCategory[] | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const { data } = await apiFetch.get<ApiEventCategory[]>(
        zazitMestoJinakConfig.urlApiEventCategories,
      );
      return data as EventCategory[];
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const getEventProgramApi = async (
    slug: string,
  ): Promise<EventProgram | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventProgram}`;
      const { data } = await apiFetch.get<ApiEventProgramItem[]>(url);
      return eventsAdapter.toEventProgram(data);
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const createEventProgramItemApi = async (
    slug: string,
    eventProgramItem: EventProgramItemPayload,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventProgram}`;
      await apiFetch.post<void>(
        url,
        eventsAdapter.toEventProgramItemPayload(eventProgramItem),
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

  const updateEventProgramItemApi = async (
    slug: string,
    eventProgramItem: EventProgramItemPayload,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventProgram}${eventProgramItem.id}/`;
      await apiFetch.put<void>(
        url,
        eventsAdapter.toEventProgramItemPayload(eventProgramItem),
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

  const deleteEventProgramItemApi = async (
    slug: string,
    eventProgramItem: EventProgramItem,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventProgram}${eventProgramItem.id}/`;
      await apiFetch.delete<void>(url);
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
    getEventCategoriesApi,
    getEventProgramApi,
    createEventProgramItemApi,
    updateEventProgramItemApi,
    deleteEventProgramItemApi,
  };
}
