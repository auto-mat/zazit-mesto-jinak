<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="isLoading" />
    <template v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <h1 class="q-mb-md">{{ t('profile.title') }}</h1>
          <h2>{{ t('profile.subtitle') }}</h2>
        </div>

        <edit-button
          :to="{ name: routesConf['profile_edit']['children']['name'] }"
        />
      </div>

      <div
        v-if="userDetails"
        class="q-mt-md"
        style="width: 800px; max-width: 100%"
      >
        <profile-row>
          <span class="name">{{
            userDetails.name + ' ' + userDetails.surname
          }}</span>
        </profile-row>
        <profile-row :label="t('profile.emailLabel')">
          {{ userDetails.email }}
        </profile-row>
        <profile-row :label="t('profile.phoneLabel')">
          {{ userDetails.phone }}
        </profile-row>
        <profile-row :label="t('profile.genderLabel')">
          {{ t(`gender.${userDetails.gender}`) }}
        </profile-row>
        <profile-row :label="t('profile.languagePrefer')">
          <language-switcher :value="userDetails.languagePreference" readonly />
        </profile-row>
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
/**
 * Profile page
 * Displays the profile page with the user details
 */

// libraries
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import EditButton from 'src/components/buttons/EditButton.vue';
import ProfileRow from 'src/components/profile/ProfileRow.vue';
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';
import Spinner from 'src/components/global/Spinner.vue';

// stores
import { useUserStore } from 'src/stores/user';

const { t } = useI18n();

const userStore = useUserStore();

const isLoading = computed(() => userStore.loading);
const userDetails = computed(() => userStore.userDetails);

// On mount, load the user details
onMounted(() => {
  if (!userStore.userDetails) {
    userStore.loadUserDetails();
  }
});
</script>

<style scoped>
.name {
  font-size: 20pt;
}
</style>
