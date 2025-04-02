import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/registration',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegistrationPage.vue') }],
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProfilePage.vue') }],
  },
  {
    path: '/event/:slug',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/EventGuidePage.vue') 
      },
      { 
        path: 'guide', 
        component: () => import('pages/EventGuidePage.vue') 
      },
      { 
        path: 'information', 
        component: () => import('pages/EventInformationPage.vue') 
      },
      {
        path: 'web-content',
        component: () => import('pages/EventContentPage.vue') 
      },
      {
        path: 'program',
        component: () => import('pages/EventProgramPage.vue')
      }
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
