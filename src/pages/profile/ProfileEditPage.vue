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
      <form-profile @submit="onSubmit" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
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

const { t } = useI18n();
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (!userStore.userDetails) {
    userStore.loadUserDetails();
  }
});

const isLoading = computed(() => userStore.loading);
const userDetails = computed(() => userStore.userDetails);

const onSubmit = () => {
  router.push({ name: routesConf['profile']['children']['name'] });
};
</script>
