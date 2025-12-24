<template>
  <div>
    <h1>{{ t('verifyEmail.title') }}</h1>
    <p>
      {{ t('verifyEmail.description', { email: loginStore.userEmail ?? '' }) }}
    </p>
    <p>{{ t('verifyEmail.checkSpamFolder') }}</p>
    <q-btn
      :label="
        cooldownSeconds > 0
          ? t('verifyEmail.resendEmail') + ` (${cooldownSeconds}s)`
          : t('verifyEmail.resendEmail')
      "
      type="button"
      unelevated
      rounded
      color="primary"
      class="full-width q-mt-lg"
      :disable="cooldownSeconds > 0"
      :loading="isResending"
      @click="handleResendEmail"
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
/**
 * Verify email page
 * Displays the verify email page with resend button
 */

// libraries
import { ref, watch, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

// config
import { routesConf } from 'src/router/routes_conf';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

// stores
import { useRegisterStore } from 'src/stores/register';
import { useLoginStore } from 'src/stores/login';

const { t } = useI18n();
const router = useRouter();

const registerStore = useRegisterStore();
const loginStore = useLoginStore();

const { isUserVerified } = storeToRefs(loginStore);

const cooldownSeconds = ref(0);
const isResending = ref(false);
let cooldownInterval: ReturnType<typeof setInterval> | null = null;

const handleResendEmail = async (): Promise<void> => {
  if (cooldownSeconds.value > 0 || isResending.value) {
    return;
  }

  isResending.value = true;
  try {
    await registerStore.resendEmail();
    startCooldown();
  } finally {
    isResending.value = false;
  }
};

// Start the cooldown timer to prevent spamming the resend button
const startCooldown = (): void => {
  cooldownSeconds.value = zazitMestoJinakConfig.checkIsEmailVerifiedInterval;

  if (cooldownInterval) {
    clearInterval(cooldownInterval);
  }

  cooldownInterval = setInterval(() => {
    cooldownSeconds.value--;
    if (cooldownSeconds.value <= 0) {
      if (cooldownInterval) {
        clearInterval(cooldownInterval);
        cooldownInterval = null;
      }
    }
  }, 1000);
};

const registerAgain = () => {
  loginStore.logout();
  router.push(routesConf['signup']['path']);
};

watch(isUserVerified, (newVal) => {
  if (newVal) {
    router.push(routesConf['home']['path']);
  }
});

onUnmounted(() => {
  if (cooldownInterval) {
    clearInterval(cooldownInterval);
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
