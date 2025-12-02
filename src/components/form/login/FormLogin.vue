<template>
  <q-form autofocus class="text-grey-10" @submit="onSubmit">
    <div class="row q-col-gutter-md">
      <form-field-email v-model="email" required class="col-12" />
      <form-field-password
        v-model="password"
        required
        hide-hint
        class="col-12"
      />
      <div class="text-right col-12">
        <router-link :to="routesConf['email_reset_password']['path']">
          {{ t('login.forgotPassword') }}
        </router-link>
      </div>
    </div>
    <q-btn
      :label="t('login.submitLogin')"
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

// config
import { routesConf } from 'src/router/routes_conf';

// stores
import { useLoginStore } from 'src/stores/login';

// components
import FormFieldEmail from '../global/FormFieldEmail.vue';
import FormFieldPassword from '../global/FormFieldPassword.vue';

defineOptions({
  name: 'FormLogin',
});

const { t } = useI18n();

const loginStore = useLoginStore();

const email = ref('');
const password = ref('');

const onSubmit = async (): Promise<void> => {
  await loginStore.login({
    username: email.value,
    password: password.value,
  });
};
</script>
