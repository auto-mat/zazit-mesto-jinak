<template>
  <div>
    <h1>{{ t('resetPassword.confirm.title') }}</h1>
    <p>{{ t('resetPassword.confirm.description') }}</p>
    <div class="q-mt-lg">
      <form-reset-password @submit="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
// libraries
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

// stores
import { useLoginStore } from 'src/stores/login';

// components
import FormResetPassword from 'src/components/form/login/FormResetPassword.vue';

const { t } = useI18n();
const route = useRoute();
const loginStore = useLoginStore();

const uid = ref('');
const token = ref('');

onMounted(() => {
  uid.value = route.query.uid as string;
  token.value = route.query.token as string;
});

const onSubmit = async (password: string, passwordConfirm: string) => {
  await loginStore.resetPasswordConfirm(
    uid.value,
    token.value,
    password,
    passwordConfirm,
  );
};

defineOptions({
  name: 'ResetPasswordPage',
});
</script>
