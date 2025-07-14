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
        name: 'eventInformation',
        component: () => import('src/pages/event/information/EventInformationPage.vue'), 
      },
      {
        path: 'information/edit',
        name: 'eventInformationEdit',
        component: () => import('src/pages/event/information/EventInformationEditPage.vue')
      },
      {
        path: 'web-content',
        name: 'eventContent',
        component: () => import('pages/event/content/EventContentPage.vue') 
      },
      {
        path: 'web-content/edit',
        name: 'eventContentEdit',
        component: () => import('pages/event/content/EventContentEditPage.vue') 
      },
      {
        path: 'program',
        name: 'eventProgram',
        component: () => import('pages/event/program/EventProgramPage.vue')
      },
      {
        path: 'program/edit',
        name: 'eventProgramEdit',
        component: () => import('pages/event/program/EventProgramEditPage.vue')
      },
      {
        path: 'organizers',
        component: () => import('pages/EventOrganizersPage.vue')
      },
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
