import { ref } from 'vue';

import { userAdapter } from 'src/adapters/userAdapter';
import userService from 'src/services/userService';
import { UserDetailsType, UserMetaType } from 'src/types/User'

export function useApiUser() {
  const error = ref<string | null>(null);

  const getUserMeta = async () => {
    let user: UserMetaType | null = null;

    try {
      const response = await userService.getUserMeta();
      if (response) {
        user = userAdapter.toUserMeta(response);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    }

    return user;
  }

  const getUserDetails = async (userId: string) => {
    let userDetails: UserDetailsType | null = null;

    try {
      const response = await userService.getUserDetails(userId);
      if (response) {
        userDetails = userAdapter.toUserDetails(response);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message;
    }

    return userDetails;
  }
  return {
    getUserMeta,
    getUserDetails,
    error
  }
}