import { Notify } from 'quasar';
import {
  eventsAdapter,
  ApiEventAgreement,
  ApiEventInvoice,
} from 'src/adapters/eventAdapter';
import apiFetch from 'src/api/apiFetch';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';
import {
  ChecklistItem,
  EventAgreement,
  EventAgreementPayload,
  EventInvoice,
} from 'src/types/Event';

interface EventContentPublicApi {
  public_on_web: boolean;
}

interface ApiEventChecklistItem {
  id: number | null;
  name: string;
  checked: boolean;
  custom: boolean;
}

interface ApiEventChecklists {
  predefined: ApiEventChecklistItem[];
  custom: ApiEventChecklistItem[];
}

export function useApiEventGuide() {
  const loginStore = useLoginStore();

  const getEventAgreementApi = async (
    slug: string,
  ): Promise<EventAgreement | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventAgreement}`;
      const { data } = await apiFetch.get<ApiEventAgreement>(url);
      return data ? eventsAdapter.toEventAgreement(data) : null;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const updateEventAgreementApi = async (
    slug: string,
    eventAgreement: EventAgreementPayload,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventAgreement}`;
    try {
      const formData = new FormData();
      if (eventAgreement.pdfFile) {
        formData.append('pdf_file_signed', eventAgreement.pdfFile);
      }
      await apiFetch.post<void>(url, formData);
      return true;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return false;
    }
  };

  const getEventInvoiceApi = async (
    slug: string,
  ): Promise<EventInvoice | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventInvoice}`;
      const { data } = await apiFetch.get<ApiEventInvoice>(url);
      return data ? eventsAdapter.toEventInvoice(data) : null;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const getEventContentPublicApi = async (
    slug: string,
  ): Promise<boolean | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventContentPublic}`;
      const { data } = await apiFetch.get<EventContentPublicApi>(url);
      return data.public_on_web;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const getEventChecklistApi = async (
    slug: string,
  ): Promise<ApiEventChecklists | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventChecklist}`;
      const { data } = await apiFetch.get<ApiEventChecklists>(url);
      return data;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const updateEventChecklistApi = async (
    slug: string,
    eventChecklist: ChecklistItem[],
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventChecklist}`;
      await apiFetch.put<void>(url, eventChecklist);
      return true;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return false;
    }
  };

  const updateEventChecklistItemApi = async (
    slug: string,
    eventChecklistItem: ChecklistItem,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventChecklist}${eventChecklistItem.id}/`;
      await apiFetch.patch<void>(url, { checked: eventChecklistItem.checked });
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
    getEventAgreementApi,
    updateEventAgreementApi,
    getEventInvoiceApi,
    getEventContentPublicApi,
    getEventChecklistApi,
    updateEventChecklistApi,
    updateEventChecklistItemApi,
  };
}
