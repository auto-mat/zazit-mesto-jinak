<template>
  <div
    class="bg-white q-pa-md rounded-borders"
    :style="{ maxWidth: zazitMestoJinakConfig.containerFormWidth }"
  >
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
import FormRegister from 'src/components/form/registration/FormRegister.vue';
import { useI18n } from 'vue-i18n';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { routesConf } from 'src/router/routes_conf';

const { t } = useI18n();

defineOptions({
  name: 'RegistrationPage',
});
</script>

<style scoped></style>
