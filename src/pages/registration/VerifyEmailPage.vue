<template>
  <div
    class="bg-white q-pa-md rounded-borders"
    :style="{ maxWidth: zazitMestoJinakConfig.containerFormWidth }"
  >
    <h1>{{ t('verifyEmail.title') }}</h1>
    <p>{{ t('verifyEmail.description', { email: email ?? '' }) }}</p>
    <p>{{ t('verifyEmail.checkSpamFolder') }}</p>
    <!-- <div class="q-mt-lg">
      <h2>{{ t('verifyEmail.emailNotReceived') }}</h2>
      <p>{{ t('verifyEmail.emailNotReceivedDescription') }}</p>
      <q-btn
      :label="t('verifyEmail.resendEmail')"
      type="button"
      unelevated
      rounded
      color="primary"
      class="full-width q-mt-lg"
      @click="registerStore.resendEmail"
    />
    </div> -->
    <div class="q-mt-lg">
      <span>{{ t('verifyEmail.wrongEmail') }}</span>
      <router-link :to="routesConf['signup']['path']">{{
        t('verifyEmail.registerAgain')
      }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// libraries
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { routesConf } from 'src/router/routes_conf';

// stores
import { useRegisterStore } from 'src/stores/register';

const { t } = useI18n();

const registerStore = useRegisterStore();

const { email } = storeToRefs(registerStore);
</script>
