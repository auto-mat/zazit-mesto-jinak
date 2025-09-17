// libraries
// import { Screen } from 'quasar';

// config
import { routesConf } from './routes_conf';

// types
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // home
  {
    path: routesConf['home']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['home']['children']['name'],
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  // profile
  {
    path: routesConf['profile']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['profile']['children']['name'],
        component: () => import('pages/ProfilePage.vue'),
      },
    ],
  },
  // event information
  {
    path: routesConf['event_information']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['event_information']['children']['name'],
        component: () => import('pages/event/information/EventInformationPage.vue'),
      },
    ],
  },
  // event information edit
  {
    path: routesConf['event_information_edit']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['event_information_edit']['children']['name'],
        component: () => import('pages/event/information/EventInformationEditPage.vue'),
      },
    ],
  },
  // event guide
  {
    path: routesConf['event_guide']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['event_guide']['children']['name'],
        component: () => import('pages/EventGuidePage.vue'),
      },
    ],
  },
  // event web content
  {
    path: routesConf['event_web_content']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['event_web_content']['children']['name'],
        component: () => import('pages/event/content/EventContentPage.vue'),
      },
    ],
  },
  // event web content edit
  {
    path: routesConf['event_web_content_edit']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['event_web_content_edit']['children']['name'],
        component: () => import('pages/event/content/EventContentEditPage.vue'),
      },
    ],
  },
  // event program
  {
    path: routesConf['event_program']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['event_program']['children']['name'],
        component: () => import('pages/event/program/EventProgramPage.vue'),
      },
    ],
  },
  // event program edit
  {
    path: routesConf['event_program_edit']['path'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['event_program_edit']['children']['name'],
        component: () => import('pages/event/program/EventProgramEditPage.vue'),
      },
    ],
  },
  // verify email
  // {
  //   path: routesConf['verify_email']['path'],
  //   component: () => import('layouts/LoginRegisterLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: routesConf['verify_email']['children']['name'],
  //       component: () => import('pages/VerifyEmailPage.vue'),
  //     },
  //   ],
  // },
  // confirm email
  // {
  //   path: routesConf['confirm_email']['path'],
  //   component: () => import('layouts/LoginRegisterLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: routesConf['confirm_email']['children']['name'],
  //       component: () => import('pages/ConfirmEmailPage.vue'),
  //     },
  //   ],
  // },
  // login
  // {
  //   path: routesConf['login']['path'],
  //   component: () => import('layouts/LoginRegisterLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: routesConf['login']['children']['name'],
  //       component: () => import('pages/LoginPage.vue'),
  //     },
  //   ],
  // },
  // reset password
  // {
  //   path: routesConf['reset_password']['path'],
  //   component: () => import('layouts/LoginRegisterLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: routesConf['reset_password']['children']['name'],
  //       component: () => import('pages/ResetPasswordPage.vue'),
  //     },
  //   ],
  // },
  // register
  {
    path: routesConf['register']['path'],
    component: () => import('layouts/LoginRegisterLayout.vue'),
    children: [
      {
        path: '',
        name: routesConf['register']['children']['name'],
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
