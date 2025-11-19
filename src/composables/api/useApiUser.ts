import { ref } from 'vue';

import { userAdapter } from 'src/adapters/userAdapter';
import userService from 'src/services/userService';
import { UserDetails, UserMeta } from 'src/types/User';

export function useApiUser() {
  const error = ref<string | null>(null);

  const getUserMeta = async () => {
    let user: UserMeta | null = null;

    try {
      const response = await userService.getUserMeta();
      if (response) {
        user = userAdapter.toUserMeta(response);
      }
    } catch (err: any) {
      error.value = err.message;
    }

    return user;
  };

  const getUserDetails = async (userId: string) => {
    let userDetails: UserDetails | null = null;

    try {
      const response = await userService.getUserDetails(userId);
      if (response) {
        userDetails = userAdapter.toUserDetails(response);
      }
    } catch (err: any) {
      error.value = err.message;
    }

    return userDetails;
  };
  return {
    getUserMeta,
    getUserDetails,
    error,
  };
}
