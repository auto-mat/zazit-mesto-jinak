import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { routesConf } from 'src/router/routes_conf';
import { useLoginStore } from './login';
import { Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useApiRegister } from 'src/composables/api/useApiRegister';

export const useRegisterStore = defineStore('register', () => {
  const { t } = useI18n();
  const router = useRouter();
  const loginStore = useLoginStore();
  const { registerApi, confirmVerificationApi, resendEmailApi } =
    useApiRegister();

  const email = ref('');
  const password = ref('');
  const passwordConfirm = ref('');

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
    const data = await registerApi({
      email: email.value,
      password1: password.value,
      password2: passwordConfirm.value,
    });

    if (data) {
      await loginStore.processLoginData({
        access: data.access,
        refresh: data.refresh,
      });
      await loginStore.checkUserVerification();
      if (loginStore.isUserVerified) {
        await router.push(routesConf['home']['path']);
      } else {
        await router.push(routesConf['verify_email']['path']);
      }
    }
  };

  const confirmVerification = async (key: string) => {
    console.log('confirm verification');
    if (await confirmVerificationApi(key)) {
      await router.push(routesConf['home']['path']);
    }
  };

  const resendEmail = async () => {
    console.log('resend email');
    const data = await resendEmailApi();

    if (data && data.send_registration_confirmation_email) {
      Notify.create({
        message: t('verifyEmail.emailSent'),
        color: 'positive',
      });
    } else {
      console.log('Email sending failed');
      Notify.create({
        message: t('verifyEmail.emailNotSent'),
        color: 'negative',
      });
    }
  };

  const registerDone = async () => {
    console.log('register done');
    await router.push(routesConf['home']['path']);
  };

  return {
    email,
    password,
    passwordConfirm,
    register,
    registerDone,
    registerFormState,
    confirmVerification,
    resendEmail,
  };
});
