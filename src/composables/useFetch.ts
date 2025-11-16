import { storeToRefs } from 'pinia';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';
import { ref } from 'vue';

interface Options {
  method: string;
  payload?: any;
  headers?: Record<string, string>;
}

export async function useFetch<T>(endpoint: string, options?: Options) {
  const loginStore = useLoginStore();
  const { accessToken } = storeToRefs(loginStore);

  const baseUrl = zazitMestoJinakConfig.apiBase;
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const apiFetch = async <T>(
    endpoint: string,
    options?: Options,
  ): Promise<T | null> => {
    loading.value = true;
    error.value = null;

    // if (await loginStore.validateAccessToken()) {
    //   return null;
    // }
    console.log(`useFetch: ${baseUrl}${endpoint}`);

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
          ...options?.headers,
        },
        method: options?.method || 'GET',
        body: options?.payload ? JSON.stringify(options?.payload) : undefined,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP error ${res.status}`);
      }

      const json = (await res.json()) as T;
      data.value = json;
      return json;
    } catch (err: any) {
      error.value = err.message || 'Something went wrong';
      return null;
    } finally {
      loading.value = false;
    }
  };

  await apiFetch(endpoint, options);

  return { data, error, loading };
}
