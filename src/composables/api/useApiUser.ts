import { userAdapter, ApiUserDetails } from 'src/adapters/userAdapter';
import {
  UserDetails,
  UserDetailsForm,
  UserNewsPreferences,
} from 'src/types/User';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';
import apiFetch from 'src/api/apiFetch';
import { Notify } from 'quasar';

export function useApiUser() {
  const loginStore = useLoginStore();

  const getUserDetailsApi = async (): Promise<UserDetails | null> => {
    if (!(await loginStore.validateAccessToken())) {
      return null;
    }

    let userDetails: UserDetails | null = null;

    try {
      const { data } = await apiFetch.get<ApiUserDetails>(
        zazitMestoJinakConfig.urlApiUser,
      );
      if (data) {
        userDetails = userAdapter.toUserDetails(data);
      }
      return userDetails;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return null;
    }
  };

  const updateUserDetailsApi = async (
    newUserDetails: UserDetailsForm,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }

    const payload = {
      first_name: newUserDetails.name,
      last_name: newUserDetails.surname,
      email: newUserDetails.email,
      telephone: newUserDetails.phone,
      sex: newUserDetails.gender,
      language: newUserDetails.languagePreference,
    };

    try {
      await apiFetch.patch<void>(zazitMestoJinakConfig.urlApiUser, payload);
      return true;
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
      return false;
    }
  };

  const updateUserNewsPreferencesApi = async (
    newsPreferences: UserNewsPreferences,
  ): Promise<boolean> => {
    if (!(await loginStore.validateAccessToken())) {
      return false;
    }
    try {
      const payload = {
        send_mailing_lists: newsPreferences.onlyOrganizerNews,
        newsletter_on: newsPreferences.allNews,
      };
      await apiFetch.patch<void>(zazitMestoJinakConfig.urlApiUser, payload);
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
    getUserDetailsApi,
    updateUserDetailsApi,
    updateUserNewsPreferencesApi,
  };
}
