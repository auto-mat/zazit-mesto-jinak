import { ApiEventInformation, eventsAdapter } from 'src/adapters/eventAdapter';
import {
  EventInformation,
  EventInformationForm,
  EventMeta,
} from 'src/types/Event';
import { useLoginStore } from 'src/stores/login';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import apiFetch from 'src/api/apiFetch';
import { Notify } from 'quasar';

export function useApiEvents() {
  const loginStore = useLoginStore();

  const getEventListApi = async (): Promise<EventMeta[] | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const { data } = await apiFetch.get<EventMeta[]>(
        zazitMestoJinakConfig.urlApiEventList,
      );
      return data;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const getEventInformationApi = async (
    slug: string,
  ): Promise<EventInformation | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const { data } = await apiFetch.get<ApiEventInformation>(
        `${zazitMestoJinakConfig.urlApiEventInformation}${slug}/`,
      );
      return eventsAdapter.toEventInformation(data);
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const updateEventInformationApi = async (
    slug: string,
    eventInformation: EventInformationForm,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const payload = eventsAdapter.toEventInformationPayload(eventInformation);
      await apiFetch.put<void>(
        `${zazitMestoJinakConfig.urlApiEventInformation}${slug}/`,
        payload,
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
    getEventListApi,
    getEventInformationApi,
    updateEventInformationApi,
  };
}
