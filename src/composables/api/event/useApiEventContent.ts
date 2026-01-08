import { EventContent, EventContentForm } from 'src/types/Event';
import { ApiEventContent, eventsAdapter } from 'src/adapters/eventAdapter';
import { useLoginStore } from 'src/stores/login';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import apiFetch from 'src/api/apiFetch';
import { Notify } from 'quasar';

export function useApiEventContent() {
  const loginStore = useLoginStore();

  const getEventContentApi = async (
    slug: string,
  ): Promise<EventContent | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const url = `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventContent}`;
      const { data } = await apiFetch.get<ApiEventContent>(url);
      return eventsAdapter.toEventContent(data);
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const updateEventContentApi = async (
    slug: string,
    eventContent: EventContentForm,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }

    const formData = new FormData();
    if (eventContent.image) {
      formData.append('main_photo', eventContent.image);
    }

    formData.append('description', eventContent.mainContent);

    if (eventContent.links[0]) {
      formData.append('url', eventContent.links[0].url);
      formData.append('url_title', eventContent.links[0].title);
    }
    if (eventContent.links[1]) {
      formData.append('url1', eventContent.links[1].url);
      formData.append('url_title1', eventContent.links[1].title);
    }
    if (eventContent.links[2]) {
      formData.append('url2', eventContent.links[2].url);
      formData.append('url_title2', eventContent.links[2].title);
    }

    try {
      await apiFetch.put<void>(
        `${zazitMestoJinakConfig.urlApiEvents}${slug}${zazitMestoJinakConfig.urlApiEventContent}`,
        formData,
      );
      return true;
    } catch (error) {
      let errorMessage = error.message;
      if (error.response?.data?.url?.[0]) {
        errorMessage = error.response.data.url[0];
      }
      Notify.create({
        message: errorMessage,
        color: 'negative',
      });
      return false;
    }
  };

  return {
    getEventContentApi,
    updateEventContentApi,
  };
}
