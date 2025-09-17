import { boot } from 'quasar/wrappers';
import vue3GoogleLogin from 'vue3-google-login';
import { zazitMestoJinakConfig } from './global_vars';

const clientId = zazitMestoJinakConfig.googleLoginAppId;

export default boot(({ app }) => {
  if (clientId) {
    // Use the GoogleLoginPlugin with the provided client ID
    app.use(vue3GoogleLogin, {
      clientId,
    });
  }
});
