import { Notify } from 'quasar';
import apiFetch from 'src/api/apiFetch';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';

export interface LoginPayload {
  username: string;
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
      if (error.response?.data?.detail) {
        Notify.create({
          message: error.response.data.detail,
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
        zazitMestoJinakConfig.urlApiRefreshToken,
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

  return {
    loginApi,
    refreshTokenApi,
    isUserVerifiedApi,
  };
}
