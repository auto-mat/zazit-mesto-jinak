import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { routesConf } from 'src/router/routes_conf';
import { useLoginStore } from './login';
import { Notify } from 'quasar';
import { useApiRegister } from 'src/composables/api/useApiRegister';
import { i18n } from 'src/boot/i18n';
import { cloneDeep } from 'lodash';
import { useUserStore } from './user';
import { CompanyType, RegisterForm } from 'src/types/Register';
import { EventSpaceArea, EventSpaceType } from 'src/enums/eventEnums';

export const useRegisterStore = defineStore('register', () => {
  const router = useRouter();
  const loginStore = useLoginStore();
  const userStore = useUserStore();
  const {
    registerApi,
    confirmVerificationApi,
    resendEmailApi,
    checkRegistrationStatusApi,
    registerCompleteApi,
    getCompanyTypesApi,
  } = useApiRegister();

  const email = ref('');
  const password = ref('');
  const passwordConfirm = ref('');

  // TODO temporary flag
  const isRegistratonComplete = ref(false);

  // TODO temporary date
  const eventDate = '28.09.2026';

  const companyTypes = ref<CompanyType[]>([]);

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
      date: eventDate,
      gps: {
        latitude: 0,
        longitude: 0,
      },
      place: '',
      spaceType: EventSpaceType.NONE, //option
      spaceArea: EventSpaceArea.NONE, //option
      spaceRent: false,
      activities: '',
    },
    organizers: {
      company: {
        title: '',
        businessType: null,
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

  const registerFormState = ref<RegisterForm>(
    cloneDeep(registerDefaultFormState) as RegisterForm,
  );

  const clearRegisterData = (): void => {
    email.value = '';
    password.value = '';
    passwordConfirm.value = '';
  };

  /**
   * Sing up function
   */
  const register = async (): Promise<void> => {
    const data = await registerApi({
      email: email.value,
      password1: password.value,
      password2: passwordConfirm.value,
    });

    if (data) {
      loginStore.userEmail = email.value;
      await loginStore.processLoginData({
        access: data.access,
        refresh: data.refresh,
      });
      await router.push(routesConf['home']['path']);
      clearRegisterData();
    }
  };

  const confirmVerification = async (key: string): Promise<void> => {
    if (await confirmVerificationApi(key)) {
      await router.push(routesConf['home']['path']);
    }
  };

  const resendEmail = async (): Promise<void> => {
    const data = await resendEmailApi();

    if (data && data.send_registration_confirmation_email) {
      Notify.create({
        message: i18n.global.t('verifyEmail.emailSent'),
        color: 'positive',
      });
    } else {
      Notify.create({
        message: i18n.global.t('verifyEmail.emailNotSent'),
        color: 'negative',
      });
    }
  };

  const checkRegistrationStatus = async (): Promise<void> => {
    isRegistratonComplete.value = await checkRegistrationStatusApi();
  };

  const getCompanyTypes = async (): Promise<void> => {
    companyTypes.value = await getCompanyTypesApi();
    console.log(companyTypes.value);
  };

  const registerComplete = async (): Promise<void> => {
    await registerCompleteApi(registerFormState.value);
    await userStore.loadUserDetails();
    registerFormState.value = cloneDeep(
      registerDefaultFormState,
    ) as RegisterForm;
    await router.push(routesConf['home']['path']);
  };

  return {
    email,
    password,
    passwordConfirm,
    register,
    registerComplete,
    registerFormState,
    eventDate,
    confirmVerification,
    resendEmail,
    checkRegistrationStatus,
    isRegistratonComplete,
    companyTypes,
    getCompanyTypes,
  };
});
