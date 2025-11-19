import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { routesConf } from 'src/router/routes_conf';
import { useLoginStore } from './login';

export const useRegisterStore = defineStore('register', () => {
  const loginStore = useLoginStore();
  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const registerDefaultFormState = {
    personalDetails: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: 'unknown',
      onlyOrganizerNews: false,
      allNews: false,
      terms: false,
      codex: false,
    },
    eventDetails: {
      eventName: '',
      date: '06/11/2025',
      gps: '',
      spaceType: 'none', //option
      spaceArea: 'none', //option
      spaceRent: 'none',
      activities: '',
    },
    organizers: {
      company: {
        title: '',
        businessType: '',
        ico: '',
        dic: '',
      },
      organizers: [
        {
          name: '',
          surname: '',
          email: '',
          phone: '',
        },
      ],
    },
    moreInformation: {
      organizeReasons: [],
      collaborationSubject: '',
      fundingTypes: [],
      fundingCost: '',
      ownChanges: '',
      otherActivities: '',
    },
  };

  const registerFormState = ref(registerDefaultFormState);

  const register = async () => {
    console.log('register');
    // TODO: send register request to API
    await loginStore.login({ username: email.value, password: password.value });
    await router.push(routesConf['registration']['path']);
  };

  const registerDone = async () => {
    console.log('register done');
    await router.push(routesConf['home']['path']);
  };

  return {
    email,
    password,
    register,
    registerDone,
    registerFormState,
  };
});
