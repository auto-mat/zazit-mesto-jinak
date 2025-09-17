import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { rideToWorkByBikeConfig } from './global_vars';

const api = axios.create({ baseURL: rideToWorkByBikeConfig.apiBase });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { axios, api };
