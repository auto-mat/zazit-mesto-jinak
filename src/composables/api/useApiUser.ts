import { ref } from 'vue';

import { userAdapter, ApiUserDetails } from 'src/adapters/userAdapter';
import { UserDetails } from 'src/types/User';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useFetch } from '../useFetch';

export function useApiUser() {
  const error = ref<string | null>(null);

  const getUserDetails = async () => {
    let userDetails: UserDetails | null = null;
    // TODO if user is not logged in
    try {
      const response = await useFetch<ApiUserDetails>(
        zazitMestoJinakConfig.urlApiUser,
      );
      if (response) {
        userDetails = userAdapter.toUserDetails(response.data.value);
      }
    } catch (err: any) {
      error.value = err.message;
    }

    return userDetails;
  };
  return {
    getUserDetails,
    error,
  };
}
