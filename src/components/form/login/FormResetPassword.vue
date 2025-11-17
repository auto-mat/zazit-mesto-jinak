<template>
  <q-form class="text-grey-10" @submit="onSubmit" @reset="onReset">
    <div class="row q-col-gutter-md">
      <form-field-password v-model="password" required class="col-12" />
      <form-field-password-confirm
        v-model="passwordConfirm"
        :compare-value="password"
        class="col-12"
      />
    </div>

    <q-btn
      :label="t('resetPassword.submitResetPassword')"
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
import { useI18n } from 'vue-i18n';

// components
import FormFieldPassword from '../global/FormFieldPassword.vue';
import FormFieldPasswordConfirm from '../global/FormFieldPasswordConfirm.vue';

const { t } = useI18n();

const password = ref('');
const passwordConfirm = ref('');

const onSubmit = async () => {
  console.log('submit');
};

const onReset = () => {
  console.log('reset');
};
</script>
