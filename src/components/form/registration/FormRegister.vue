<template>
  <q-form class="text-grey-10" @submit="onSubmit">
    <div class="row q-col-gutter-md">
      <form-field-email v-model="email" required validated class="col-12" />
      <form-field-password
        v-model="password"
        required
        validated
        class="col-12"
      />
      <form-field-password-confirm
        v-model="passwordConfirm"
        :compare-value="password"
        class="col-12"
      />
    </div>

    <q-btn
      :label="t('register.submitRegister')"
      type="submit"
      unelevated
      rounded
      color="primary"
      class="full-width q-mt-lg"
      :loading="registering"
    />
  </q-form>
</template>

<script setup lang="ts">
/**
 * FormRegister Component
 *
 * The `FormRegister` displays the simple register form.
 *
 * @description * Use this component to display the simple register form.
 *
 * @example
 * <form-register  />
 */

// libraries
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// stores
import { useRegisterStore } from 'src/stores/register';

// components
import FormFieldEmail from '../global/FormFieldEmail.vue';
import FormFieldPassword from '../global/FormFieldPassword.vue';
import FormFieldPasswordConfirm from '../global/FormFieldPasswordConfirm.vue';

const { t } = useI18n();
const registering = ref(false);

const registerStore = useRegisterStore();
const { email, password, passwordConfirm } = storeToRefs(registerStore);

const onSubmit = async (): Promise<void> => {
  registering.value = true;
  await registerStore.register();
  registering.value = false;
};
</script>
