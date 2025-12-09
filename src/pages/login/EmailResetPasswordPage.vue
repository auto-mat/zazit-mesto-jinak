<template>
  <div>
    <template v-if="emailSent">
      <h1>{{ t('resetPassword.emailSent.title') }}</h1>
      <p class="q-mt-md">{{ t('resetPassword.emailSent.description') }}</p>
    </template>
    <template v-else>
      <h1>{{ t('resetPassword.title') }}</h1>
      <p>{{ t('resetPassword.description') }}</p>
      <div class="q-mt-lg">
        <form-email-for-reset-password @submit="onSubmit" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// libraries
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import FormEmailForResetPassword from 'src/components/form/login/FormEmailForResetPassword.vue';

const { t } = useI18n();

const emailSent = ref(false);

const onSubmit = () => {
  emailSent.value = true;
};

defineOptions({
  name: 'EmailResetPasswordPage',
});
</script>
