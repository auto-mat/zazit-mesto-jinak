type RoutesConf = {
  [key: string]: {
    path: string;
    children: {
      fullPath?: string;
      name: string;
    };
  };
};

const routesConf: RoutesConf = {
  verify_email: {
    path: '/verify-email',
    children: {
      fullPath: '/verify-email',
      name: 'verify-email',
    },
  },
  confirm_email: {
    path: '/confirm-email',
    children: {
      fullPath: '/confirm-email',
      name: 'confirm-email',
    },
  },
  home: {
    path: '/',
    children: {
      fullPath: '/',
      name: 'home',
    },
  },
  login: {
    path: '/login',
    children: {
      fullPath: '/login',
      name: 'login',
    },
  },
  reset_password: {
    path: '/reset-password',
    children: {
      fullPath: '/reset-password',
      name: 'reset-password',
    },
  },
  signup: {
    path: '/signup',
    children: {
      fullPath: '/signup',
      name: 'signup',
    },
  },
  registration: {
    path: '/registration',
    children: {
      fullPath: '/registration',
      name: 'registration',
    },
  },
  profile: {
    path: '/profile',
    children: {
      fullPath: '/profile',
      name: 'profile',
    },
  },
  event: {
    path: '/event/:slug',
    children: {
      fullPath: '/event/:slug',
      name: 'event',
    },
  },
  event_guide: {
    path: '/event/:slug/guide',
    children: {
      fullPath: '/event/:slug/guide',
      name: 'event-guide',
    },
  },
  event_information: {
    path: '/event/:slug/information',
    children: {
      fullPath: '/event/:slug/information',
      name: 'event-information',
    },
  },
  event_information_edit: {
    path: '/event/:slug/information/edit',
    children: {
      fullPath: '/event/:slug/information/edit',
      name: 'event-information-edit',
    },
  },
  event_web_content: {
    path: '/event/:slug/web-content',
    children: {
      fullPath: '/event/:slug/web-content',
      name: 'event-web-content',
    },
  },
  event_web_content_edit: {
    path: '/event/:slug/web-content/edit',
    children: {
      fullPath: '/event/:slug/web-content/edit',
      name: 'event-web-content-edit',
    },
  },
  event_program: {
    path: '/event/:slug/program',
    children: {
      fullPath: '/event/:slug/program',
      name: 'event-program',
    },
  },
  event_program_edit: {
    path: '/event/:slug/program/edit',
    children: {
      fullPath: '/event/:slug/program/edit',
      name: 'event-program-edit',
    },
  },
  event_organizers: {
    path: '/event/:slug/organizers',
    children: {
      fullPath: '/event/:slug/organizers',
      name: 'event-organizers',
    },
  },
  event_organizers_edit: {
    path: '/event/:slug/organizers/edit',
    children: {
      fullPath: '/event/:slug/organizers/edit',
      name: 'event-organizers-edit',
    },
  },
  // profile_notifications: {
  //   path: 'notifications',
  //   children: {
  //     fullPath: '/profile/notifications',
  //     name: 'profile-notifications',
  //   },
  // },
};

export { routesConf };
