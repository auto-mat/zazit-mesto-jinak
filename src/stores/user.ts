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
  const userDetailsForm = ref<UserDetails>(defaultUserDetails);
  const loading = ref(false);

  watch(userDetails, (newUserDetails) => {
    userDetailsForm.value = cloneDeep(newUserDetails);
  });

  const setEmail = (email: string) => {
    userDetails.value.email = email;
  };

  const setUser = (newUserDetails: UserDetails) => {
    userDetails.value = cloneDeep(newUserDetails);
  };

  const loadUserDetails = async () => {
    loading.value = true;
    const newUserDetails = await getUserDetails();
    console.log('newUserDetails', newUserDetails);
    if (newUserDetails) {
      setUser(newUserDetails);
    }
    loading.value = false;
  };

  const updateUserDetails = async () => {
    loading.value = true;
    await updateUserDetailsApi(userDetailsForm.value);
    loadUserDetails();
    console.log('userDetails', userDetails.value);
    loading.value = false;
  };

  const clearUser = () => {
    userDetails.value = cloneDeep(defaultUserDetails);
  };

  return {
    userDetails,
    userDetailsForm,
    loading,
    setEmail,
    loadUserDetails,
    updateUserDetails,
    clearUser,
    setUser,
  };
});
