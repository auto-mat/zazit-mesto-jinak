import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';
import { useI18n } from 'vue-i18n';

export class ClientSideError extends Error {}
interface Options {
  method: string;
  payload?: any;
  headers?: Record<string, string>;
}

export async function apiFetch(endpoint: string, options?: Options) {
  const { t } = useI18n();
  const loginStore = useLoginStore();
  const { accessToken } = storeToRefs(loginStore);

  try {
    const response = await fetch(
      `${zazitMestoJinakConfig.apiBase}${endpoint}`,
      {
        headers: {
          Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
          ...options?.headers,
        },
        method: options?.method,
        body: options?.payload ?? undefined,
      },
    );

    if (!response.ok) {
      if (response.status < 500) {
        const error = await response.json();
        if (error && error.detail) {
          throw new ClientSideError(error.detail);
        } else {
          throw new Error(t('error.clientSideError'));
        }
      } else {
        throw new Error(t('error.serverSideError'));
      }
    }

    return response;
  } catch (error) {
    if (error instanceof ClientSideError) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
    } else {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
    }
  }
  return null;
}

export async function getApi<T>(endpoint: string): Promise<T | null> {
  const response = await apiFetch(endpoint, {
    method: 'GET',
  });
  return response ? response.json() : null;
}

export async function postApi(endpoint: string, payload: any) {
  return await apiFetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(payload),
  });
}

export async function putApi<T>(endpoint: string, payload: T) {
  return apiFetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(payload),
  });
}
