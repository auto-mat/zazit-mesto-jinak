import { Notify } from 'quasar';
import apiFetch from 'src/api/apiFetch';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { i18n } from 'src/boot/i18n';
import { useLoginStore } from 'src/stores/login';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshTokenPayload {
  refresh: string;
}

interface RefreshTokenResponse {
  access: string;
}

interface IsUserVerifiedResponse {
  has_user_verified_email_address: boolean;
}

export function useApiLogin() {
  const loginStore = useLoginStore();

  const loginApi = async (
    payload: LoginPayload,
  ): Promise<LoginResponse | null> => {
    try {
      const { data } = await apiFetch.post<LoginResponse>(
        zazitMestoJinakConfig.urlApiLogin,
        payload,
      );
      return data;
    } catch (error) {
      if (error.response?.data?.non_field_errors) {
        Notify.create({
          message: error.response.data.non_field_errors[0],
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

  const refreshTokenApi = async (
    payload: RefreshTokenPayload,
  ): Promise<RefreshTokenResponse | null> => {
    try {
      const { data } = await apiFetch.post<RefreshTokenResponse>(
        zazitMestoJinakConfig.urlApiRefresh,
        payload,
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

  const isUserVerifiedApi = async (): Promise<boolean | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }
    try {
      const { data } = await apiFetch.get<IsUserVerifiedResponse>(
        zazitMestoJinakConfig.urlApiHasUserVerifiedEmail,
      );
      return data.has_user_verified_email_address;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const resetPasswordApi = async (email: string): Promise<boolean> => {
    try {
      await apiFetch.post<void>(zazitMestoJinakConfig.urlApiResetPassword, {
        email,
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

  const resetPasswordConfirmApi = async (
    uid: string,
    token: string,
    password: string,
    passwordConfirm: string,
  ): Promise<boolean> => {
    const payload = {
      uid,
      token,
      new_password1: password,
      new_password2: passwordConfirm,
    };
    try {
      await apiFetch.post<void>(
        zazitMestoJinakConfig.urlApiResetPasswordConfirm,
        payload,
      );
      Notify.create({
        message: i18n.global.t('resetPassword.confirm.passwordResetSuccess'),
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

  return {
    loginApi,
    refreshTokenApi,
    isUserVerifiedApi,
    resetPasswordApi,
    resetPasswordConfirmApi,
  };
}
