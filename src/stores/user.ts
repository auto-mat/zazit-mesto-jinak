import { defineStore } from 'pinia';
import { useApiUser } from 'src/composables/api/useApiUser';
import { UserDetails } from 'src/types/User';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const defaultUserDetails = {
    name: '',
    surname: '',
    email: '',
    gender: '',
    languagePreference: '',
  } as UserDetails;

  const userDetails = ref<UserDetails>(defaultUserDetails);
  const loading = ref(false);

  const setEmail = (email: string) => {
    userDetails.value.email = email;
  };

  const setUser = (newUserDetails: UserDetails) => {
    userDetails.value = newUserDetails;
  };

  const loadUserDetails = async () => {
    const { getUserDetails } = useApiUser();
    loading.value = true;
    const newUserDetails = await getUserDetails();
    if (newUserDetails) {
      userDetails.value = newUserDetails;
    }
    loading.value = false;
  };

  const clearUser = () => {
    userDetails.value = defaultUserDetails;
  };

  return {
    userDetails,
    loading,
    setEmail,
    loadUserDetails,
    clearUser,
    setUser,
  };
});
