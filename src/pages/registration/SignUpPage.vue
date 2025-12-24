<template>
  <div>
    <h1 class="q-mb-lg">{{ t('register.title') }}</h1>
    <form-register />
    <div class="q-mt-xl">
      {{ t('register.alreadyHaveAccount') }}
      <router-link :to="routesConf['login']['path']">
        {{ t('register.login') }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Sign up page
 * Displays the sign up page with the form
 * Sign up with email and password
 * Redirect to verify email page after successful sign up
 */

// libraries
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import FormRegister from 'src/components/form/registration/FormRegister.vue';

const { t } = useI18n();
</script>
