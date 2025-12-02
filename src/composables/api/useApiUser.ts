import { userAdapter, ApiUserDetails } from 'src/adapters/userAdapter';
import { UserDetails } from 'src/types/User';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useLoginStore } from 'src/stores/login';
import apiFetch from 'src/api/apiFetch';
import { Notify } from 'quasar';

export function useApiUser() {
  const loginStore = useLoginStore();

  const getUserDetails = async (): Promise<UserDetails | null> => {
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

  const updateUserDetails = async (
    newUserDetails: UserDetails,
  ): Promise<void> => {
    if (!(await loginStore.validateAccessToken())) {
      return;
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
      await apiFetch.put<void>(zazitMestoJinakConfig.urlApiUser, payload);
    } catch (error) {
      Notify.create({
        message: error.message,
        color: 'negative',
      });
    }
  };

  return {
    getUserDetails,
    updateUserDetails,
  };
}
