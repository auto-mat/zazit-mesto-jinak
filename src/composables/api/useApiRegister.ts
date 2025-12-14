import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';
import { useLoginStore } from 'src/stores/login';
import apiFetch from 'src/api/apiFetch';
import { registerAdapter } from 'src/adapters/registerAdapter';
import { CompanyType, RegisterForm } from 'src/types/Register';

interface RegisterPayload {
  email: string;
  password1: string;
  password2: string;
}

interface RegisterResponse {
  access: string;
  refresh: string;
  user: {
    pk: number;
    username: string;
  };
}

interface ResendEmailResponse {
  send_registration_confirmation_email: boolean;
}

interface RegistrationStatusResponse {
  is_complete: boolean;
}

export function useApiRegister() {
  const loginStore = useLoginStore();

  const registerApi = async (
    payload: RegisterPayload,
  ): Promise<RegisterResponse | null> => {
    try {
      const { data } = await apiFetch.post<RegisterResponse>(
        zazitMestoJinakConfig.urlApiRegister,
        payload,
      );
      return data;
    } catch (error) {
      if (error.response?.data?.email) {
        Notify.create({
          message: error.response.data.email[0],
          color: 'negative',
        });
      } else {
        Notify.create({
          message: error.message,
          color: 'negative',
        });
      }
      return null;
    }
  };

  const confirmVerificationApi = async (key: string): Promise<boolean> => {
    try {
      await apiFetch.get<void>(
        zazitMestoJinakConfig.urlApiConfirmEmail + `${key}/`,
      );
      Notify.create({
        message: i18n.global.t('confirmEmail.emailConfirmed'),
        color: 'positive',
      });
      return true;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return false;
    }
  };

  const resendEmailApi = async (): Promise<ResendEmailResponse | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const { data } = await apiFetch.post<ResendEmailResponse>(
        zazitMestoJinakConfig.urlApiResendEmail,
      );
      return data;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const checkRegistrationStatusApi = async (): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const { data } = await apiFetch.get<RegistrationStatusResponse>(
        zazitMestoJinakConfig.urlApiCheckRegistrationStatus,
      );
      return data.is_complete;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return false;
    }
  };

  const getCompanyTypesApi = async (): Promise<CompanyType[] | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const { data } = await apiFetch.get<CompanyType[]>(
        zazitMestoJinakConfig.urlApiCompanyTypes,
      );
      return data;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const registerCompleteApi = async (payload: RegisterForm): Promise<void> => {
    if (!(await loginStore.validateAccessToken())) {
      return;
    }
    try {
      await apiFetch.post<void>(
        zazitMestoJinakConfig.urlApiRegisterComplete,
        registerAdapter.toRegisterPayload(payload),
      );
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
    }
  };

  return {
    registerApi,
    confirmVerificationApi,
    resendEmailApi,
    checkRegistrationStatusApi,
    registerCompleteApi,
    getCompanyTypesApi,
  };
}
