import { userAdapter, ApiUserDetails } from 'src/adapters/userAdapter';
import { UserDetails } from 'src/types/User';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { getApi, putApi } from 'src/api/apiFetch';
import { useLoginStore } from 'src/stores/login';

export function useApiUser() {
  const loginStore = useLoginStore();

  const getUserDetails = async () => {
    let userDetails: UserDetails | null = null;

    if (!(await loginStore.validateAccessToken())) {
      return null;
    }

    const data = await getApi<ApiUserDetails>(zazitMestoJinakConfig.urlApiUser);

    if (data) {
      userDetails = userAdapter.toUserDetails(data);
    }

    return userDetails;
  };

  const updateUserDetails = async (newUserDetails: UserDetails) => {
    const payload = {
      first_name: newUserDetails.name,
      last_name: newUserDetails.surname,
      email: newUserDetails.email,
      telephone: newUserDetails.phone,
      sex: newUserDetails.gender,
      language: newUserDetails.languagePreference,
    };

    await putApi(zazitMestoJinakConfig.urlApiUser, payload);
  };

  return {
    getUserDetails,
    updateUserDetails,
  };
}
