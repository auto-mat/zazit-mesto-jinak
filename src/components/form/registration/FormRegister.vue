<template>
  <q-form class="text-grey-10" @submit="onSubmit" @reset="onReset">
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
    />
  </q-form>
</template>

<script setup lang="ts">
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
