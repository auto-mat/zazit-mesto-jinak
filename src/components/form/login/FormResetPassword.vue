<template>
  <q-form class="text-grey-10" @submit="onSubmit">
    <div class="row q-col-gutter-md">
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
      :label="t('resetPassword.confirm.submitResetPassword')"
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

const emit = defineEmits(['submit']);
const { t } = useI18n();

const password = ref('');
const passwordConfirm = ref('');

const onSubmit = async () => {
  emit('submit', password.value, passwordConfirm.value);
};
</script>
