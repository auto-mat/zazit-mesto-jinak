<template>
  <div
    class="bg-white q-pa-md rounded-borders"
    :style="{ maxWidth: zazitMestoJinakConfig.containerFormWidth }"
  >
    <h1>{{ t('verifyEmail.title') }}</h1>
    <p>{{ t('verifyEmail.description', { email: email ?? '' }) }}</p>
    <p>{{ t('verifyEmail.checkSpamFolder') }}</p>
    <q-btn
      :label="t('verifyEmail.resendEmail')"
      type="button"
      unelevated
      rounded
      color="primary"
      class="full-width q-mt-lg"
      @click="registerStore.resendEmail"
    />
    <div class="q-mt-lg">
      <span>{{ t('verifyEmail.wrongEmail') }}</span>
      <a class="register-again-link" @click="registerAgain">{{
        t('verifyEmail.registerAgain')
      }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
// libraries
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { routesConf } from 'src/router/routes_conf';

// stores
import { useRegisterStore } from 'src/stores/register';
import { useLoginStore } from 'src/stores/login';

const { t } = useI18n();
const router = useRouter();

const registerStore = useRegisterStore();
const loginStore = useLoginStore();

const { email } = storeToRefs(registerStore);
const { isUserVerified } = storeToRefs(loginStore);

const registerAgain = () => {
  loginStore.logout();
  router.push(routesConf['signup']['path']);
};

watch(isUserVerified, (newVal) => {
  if (newVal) {
    router.push(routesConf['home']['path']);
  }
});
</script>

<style scoped lang="scss">
.register-again-link {
  color: var(--q-primary);
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
}
</style>
