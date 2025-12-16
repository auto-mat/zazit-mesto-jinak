import { defineStore } from 'pinia';
import { useApiUser } from 'src/composables/api/useApiUser';
import { UserDetails } from 'src/types/User';
import { UserLanguage, UserGender } from 'src/enums/userEnums';
import { ref, watch } from 'vue';
import { cloneDeep } from 'lodash';

export const useUserStore = defineStore('user', () => {
  const { getUserDetails, updateUserDetails: updateUserDetailsApi } =
    useApiUser();

  const defaultUserDetails: UserDetails = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    gender: UserGender.UNKNOWN,
    languagePreference: UserLanguage.CS,
  };

  const userDetails = ref<UserDetails | null>(null);
  const userDetailsForm = ref<UserDetails>(cloneDeep(defaultUserDetails));
  const loading = ref(false);

  watch(userDetails, (newUserDetails) => {
    userDetailsForm.value = cloneDeep(newUserDetails);
  });

  const setEmail = (email: string): void => {
    userDetails.value.email = email;
  };

  const setUser = (newUserDetails: UserDetails): void => {
    userDetails.value = cloneDeep(newUserDetails);
  };

  const resetUserDetailsForm = (): void => {
    userDetailsForm.value = cloneDeep(userDetails.value);
  };

  const loadUserDetails = async (): Promise<void> => {
    loading.value = true;
    const newUserDetails = await getUserDetails();
    if (newUserDetails) {
      setUser(newUserDetails);
    }
    loading.value = false;
  };

  const updateUserDetails = async (): Promise<void> => {
    loading.value = true;
    await updateUserDetailsApi(userDetailsForm.value);
    loadUserDetails();
    loading.value = false;
  };

  const clearUserStore = (): void => {
    userDetails.value = null;
    userDetailsForm.value = cloneDeep(defaultUserDetails);
    loading.value = false;
  };

  return {
    userDetails,
    userDetailsForm,
    loading,
    setEmail,
    loadUserDetails,
    updateUserDetails,
    clearUserStore,
    setUser,
    resetUserDetailsForm,
  };
});
