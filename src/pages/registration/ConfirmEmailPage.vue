<template>
  <div>
    <h1>{{ t('confirmEmail.title') }}</h1>
    <p>{{ t('confirmEmail.description', { email: email ?? '' }) }}</p>

    <q-btn
      :label="t('confirmEmail.confirm')"
      type="button"
      unelevated
      rounded
      color="primary"
      class="full-width q-mt-lg"
      @click="registerStore.confirmVerification(key)"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Verify email page
 * Displays the verify email page with the confirm button
 * Redirected from email verification link
 */

// libraries
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

//stores
import { useRegisterStore } from 'src/stores/register';

const route = useRoute();
const { t } = useI18n();
const registerStore = useRegisterStore();

const email = ref('');
const key = ref('');

onMounted(async () => {
  key.value = route.query.key as string;
  email.value = route.query.email as string;
});
</script>
