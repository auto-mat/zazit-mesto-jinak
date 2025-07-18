import { defineStore } from 'pinia';
import { useApiUser } from 'src/composables/api/useApiUser';
import { UserDetailsType, UserMetaType } from 'src/types/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    userMeta: {} as UserMetaType,
    userDetails: {} as UserDetailsType,
    loading: false,
  }),
  getters: {
    isLoading: (state) => state.loading,
    getUserMeta: (state) => state.userMeta,
    getUserDetails: (state) => state.userDetails,
  },
  actions: {
    async loadUserMeta() {
      const { getUserMeta } = useApiUser();
      this.loading = true;
      const userMeta = await getUserMeta();
      if (userMeta) {
        this.userMeta = userMeta;
      }
      this.loading = false;
    },
    async loadUserDetails() {
      const { getUserDetails } = useApiUser();
      this.loading = true;
      // TODO if user is not logged in
      const userDetails = await getUserDetails(this.getUserMeta.id);
      if (userDetails) {
        this.userDetails = userDetails;
      }
      this.loading = false;
    },
    clearUserDetails() {
      this.userDetails = {} as UserDetailsType;
    },
  },
});