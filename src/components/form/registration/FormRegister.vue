<template>
  <q-form class="text-grey-10" @submit="onSubmit" @reset="onReset">
    <form-field-email v-model="email" name="form-login-email" required />
    <form-field-password
      v-model="password"
      name="form-login-password"
      required
    />
    <form-field-password-confirm
      v-model="passwordConfirm"
      name="form-login-password-confirm"
      :compare-value="password"
    />

    <q-btn
      :label="t('register.submitRegister')"
      type="submit"
      unelevated
      rounded
      color="primary"
      class="full-width q-mt-lg"
    />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import FormFieldEmail from '../global/FormFieldEmail.vue';
import FormFieldPassword from '../global/FormFieldPassword.vue';
import FormFieldPasswordConfirm from '../global/FormFieldPasswordConfirm.vue';
import { useRegisterStore } from 'src/stores/register';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const registerStore = useRegisterStore();
const { email, password } = storeToRefs(registerStore);
const passwordConfirm = ref('');

const onSubmit = async () => {
  console.log('submit');
  await registerStore.register();
};

const onReset = () => {
  console.log('reset');
};
</script>
