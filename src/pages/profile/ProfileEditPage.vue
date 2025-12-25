<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="isLoading" />
    <template v-else>
      <div class="row justify-between items-end q-mb-md">
        <div>
          <h1 class="q-mb-md">{{ t('profile.title') }}</h1>
          <h2>{{ t('profile.subtitle') }}</h2>
        </div>

        <back-button @back="onReset" />
      </div>

      <div v-if="userDetails">
        <form-profile @submit="onSubmit" @reset="onReset" />
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
/**
 * Profile edit page
 * Displays the profile edit page with the form
 */

// libraries
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

// config
import { routesConf } from 'src/router/routes_conf';

// stores
import { useUserStore } from 'src/stores/user';

// components
import BackButton from 'src/components/buttons/BackButton.vue';
import FormProfile from 'src/components/form/profile/FormProfile.vue';
import Spinner from 'src/components/global/Spinner.vue';

const { t } = useI18n();
const userStore = useUserStore();
const router = useRouter();

const isLoading = computed(() => userStore.loading);
const userDetails = computed(() => userStore.userDetails);

const onSubmit = (): void => {
  router.push({ name: routesConf['profile']['children']['name'] });
};

const onReset = (): void => {
  userStore.resetUserDetailsForm();
  router.push({ name: routesConf['profile']['children']['name'] });
};

// On mount, load the user details
onMounted(() => {
  if (!userStore.userDetails) {
    userStore.loadUserDetails();
  }
});
</script>
