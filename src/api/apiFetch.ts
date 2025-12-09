import axios from 'axios';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';

const apiFetch = axios.create({
  baseURL: zazitMestoJinakConfig.apiBase,
  timeout: 8000,
});

apiFetch.interceptors.request.use((config) => {
  const loginStore = useLoginStore();

  if (loginStore.accessToken) {
    config.headers.Authorization = `Bearer ${loginStore.accessToken}`;
  }

  return config;
});

export default apiFetch;
