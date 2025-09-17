import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { zazitMestoJinakConfig } from './global_vars';

const api = axios.create({ baseURL: zazitMestoJinakConfig.apiBase });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { axios, api };
