import { defineStore } from 'pinia';
import { useApiUser } from 'src/composables/api/useApiUser';
import { UserDetailsForm, UserNewsPreferences } from 'src/types/User';
import { UserLanguage, UserGender } from 'src/enums/userEnums';
import { ref, watch } from 'vue';
import { cloneDeep } from 'lodash';
import { i18n } from 'src/boot/i18n.js';
import { Notify } from 'quasar';

export const useUserStore = defineStore('user', () => {
  const {
    getUserDetailsApi,
    updateUserDetailsApi,
    updateUserNewsPreferencesApi,
  } = useApiUser();

  // User details
  const userDetails = ref<UserDetailsForm | null>(null);
  const userNewsPreferences = ref<UserNewsPreferences | null>(null);
  const loading = ref(false);

  const setUser = (newUserDetails: UserDetailsForm): void => {
    userDetails.value = cloneDeep(newUserDetails);
  };

  const loadUserDetails = async (): Promise<void> => {
    loading.value = true;
    const userDetailsResponse = await getUserDetailsApi();
    if (userDetailsResponse) {
      setUser({
        name: userDetailsResponse.name,
        surname: userDetailsResponse.surname,
        email: userDetailsResponse.email,
        phone: userDetailsResponse.phone,
        gender: userDetailsResponse.gender,
        languagePreference: userDetailsResponse.languagePreference,
      });

      userNewsPreferences.value = {
        onlyOrganizerNews: userDetailsResponse.onlyOrganizerNews,
        allNews: userDetailsResponse.allNews,
      } as UserNewsPreferences;
    }
    loading.value = false;
  };

  // User details form
  const defaultUserDetails: UserDetailsForm = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    gender: UserGender.UNKNOWN,
    languagePreference: UserLanguage.CS,
  };

  const userDetailsForm = ref<UserDetailsForm>(cloneDeep(defaultUserDetails));

  const resetUserDetailsForm = (): void => {
    userDetailsForm.value = cloneDeep(userDetails.value);
  };

  watch(userDetails, (newUserDetails) => {
    userDetailsForm.value = cloneDeep(newUserDetails);
  });

  // Update user details
  const updateUserDetails = async (): Promise<void> => {
    loading.value = true;
    await updateUserDetailsApi(userDetailsForm.value);
    loadUserDetails();
    loading.value = false;
  };

  // Update user news preferences
  const updateUserNewsPreferences = async (): Promise<void> => {
    if (userNewsPreferences.value) {
      const success = await updateUserNewsPreferencesApi(
        userNewsPreferences.value,
      );
      if (success) {
        loadUserDetails();
        Notify.create({
          message: i18n.global.t('user.newsPreferencesUpdated'),
          color: 'positive',
        });
      }
    }
  };

  // Clear user store
  const clearUserStore = (): void => {
    userDetails.value = null;
    userDetailsForm.value = cloneDeep(defaultUserDetails);
    loading.value = false;
  };

  return {
    userDetails,
    userDetailsForm,
    loading,
    loadUserDetails,
    updateUserDetails,
    clearUserStore,
    setUser,
    resetUserDetailsForm,
    userNewsPreferences,
    updateUserNewsPreferences,
  };
});
