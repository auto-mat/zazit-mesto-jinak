<template>
  <q-form autofocus class="text-grey-10" @submit="onSubmit" @reset="onReset">
    <div class="row q-col-gutter-md">
      <form-field-email v-model="email" required class="col-12" />
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

// stores
import { useLoginStore } from 'src/stores/login';

// components
import FormFieldEmail from '../global/FormFieldEmail.vue';

defineOptions({
  name: 'FormEmailForResetPassword',
});

const emit = defineEmits(['submit']);

const { t } = useI18n();

const loginStore = useLoginStore();

const email = ref('');

const onSubmit = async () => {
  await loginStore.resetPassword(email.value);
  emit('submit');
};

const onReset = () => {
  console.log('reset');
};
</script>
