import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useLoginStore } from 'src/stores/login';
import { routesConf } from './routes_conf';
import { useRegisterStore } from 'src/stores/register';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const loginStore = useLoginStore();
    const registerStore = useRegisterStore();

    const isAuthenticated: boolean = await loginStore.validateAccessToken();
    const isUserVerified: boolean = loginStore.isUserVerified;
    const isRegistratonComplete: boolean = registerStore.isRegistratonComplete;

    if (
      !isAuthenticated &&
      /**
       * Only these pages are accessible when NOT authenticated
       *
       * Access: "login"
       */
      !to.matched.some(
        (record) =>
          record.path === routesConf['login']['path'] ||
          record.path === routesConf['signup']['path'] ||
          record.path === routesConf['verify_email']['path'] ||
          record.path === routesConf['confirm_email']['path'] ||
          record.path === routesConf['email_reset_password']['path'],
      )
    ) {
      console.log('Router user is not authenticated, redirect to login page.');
      // redirect to login page
      next({ path: routesConf['login']['path'] });
    } else if (
      isAuthenticated &&
      !isUserVerified &&
      !to.matched.some(
        (record) =>
          record.path === routesConf['verify_email']['path'] ||
          record.path === routesConf['confirm_email']['path'],
      )
    ) {
      console.log(
        'Router user is authenticated, but not verified, redirect to verify email page.',
      );
      next({ path: routesConf['verify_email']['path'] });
    } else if (
      isAuthenticated &&
      isUserVerified &&
      !isRegistratonComplete &&
      !to.matched.some(
        (record) => record.path === routesConf['registration']['path'],
      )
    ) {
      next({ path: routesConf['registration']['path'] });
    } else {
      // allow navigation to proceed
      next();
    }
  });

  return Router;
});
