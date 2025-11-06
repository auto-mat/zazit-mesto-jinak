import { defineStore } from 'pinia';
import { useApiUser } from 'src/composables/api/useApiUser';
import { UserDetails, UserMeta } from 'src/types/User';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const defaultUserMeta = {
    id: '',
    email: '',
  } as UserMeta;

  const defaultUserDetails = {
    name: '',
    surname: '',
    email: '',
    gender: '',
    languagePreference: '',
  } as UserDetails;

  const userMeta = ref<UserMeta>(defaultUserMeta);
  const userDetails = ref<UserDetails>(defaultUserDetails);
  const loading = ref(false);

  const setEmail = (email: string) => {
    userMeta.value.email = email;
  };

  const loadUserMeta = async () => {
    const { getUserMeta } = useApiUser();
    loading.value = true;
    const newUserMeta = await getUserMeta();
    if (newUserMeta) {
      userMeta.value = newUserMeta;
    }
    loading.value = false;
  };

  const loadUserDetails = async () => {
    const { getUserDetails } = useApiUser();
    loading.value = true;
    // TODO if user is not logged in
    const newUserDetails = await getUserDetails(userMeta.value.id);
    if (newUserDetails) {
      userDetails.value = newUserDetails;
    }
    loading.value = false;
  };
  const clearUserDetails = () => {
    userDetails.value = defaultUserDetails;
  };

  return {
    userMeta,
    userDetails,
    loading,
    setEmail,
    loadUserMeta,
    loadUserDetails,
    clearUserDetails,
  };
});
