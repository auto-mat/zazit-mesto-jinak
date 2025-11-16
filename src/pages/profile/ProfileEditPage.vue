<template>
  <q-page class="column q-pa-xl">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div class="row justify-between items-end q-mb-md">
      <div>
        <h1 class="q-mb-md">{{ t('profile.title') }}</h1>
        <h2>{{ t('profile.subtitle') }}</h2>
      </div>

      <back-button :to="{ name: routesConf['profile']['children']['name'] }" />
    </div>

    <div v-if="userDetails">
      <profile-form />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { routesConf } from 'src/router/routes_conf';

import BackButton from 'src/components/buttons/BackButton.vue';
import ProfileForm from 'src/components/profile/ProfileForm.vue';

import { useUserStore } from 'src/stores/user';

const { t } = useI18n();
const userStore = useUserStore();

onMounted(() => {
  userStore.loadUserDetails();
});

const isLoading = computed(() => userStore.loading);
const userDetails = computed(() => userStore.userDetails);
</script>
