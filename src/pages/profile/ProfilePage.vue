<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>
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
        <language-switcher />
      </profile-row>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { routesConf } from 'src/router/routes_conf';

import EditButton from 'src/components/buttons/EditButton.vue';
import ProfileRow from 'src/components/profile/ProfileRow.vue';
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';

import { useUserStore } from 'src/stores/user';

const { t } = useI18n();

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUserDetails();
});

const isLoading = computed(() => userStore.loading);
const userDetails = computed(() => userStore.userDetails);
</script>

<style scoped>
.name {
  font-size: 20pt;
}
</style>
