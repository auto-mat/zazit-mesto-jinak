<template>
  <q-form autofocus class="text-grey-10" @submit="onSubmit" @reset="onReset">
    <div class="row q-col-gutter-md">
      <form-field-email v-model="email" required class="col-12" />
      <form-field-password v-model="password" required class="col-12" />
      <div class="text-right col-12">
        <router-link :to="routesConf['login']['path']">
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
import { ref } from 'vue';
import { routesConf } from 'src/router/routes_conf';
import { useI18n } from 'vue-i18n';
import FormFieldEmail from '../global/FormFieldEmail.vue';
import FormFieldPassword from '../global/FormFieldPassword.vue';
import { useLoginStore } from 'src/stores/login';

defineOptions({
  name: 'FormLogin',
});

const { t } = useI18n();

const loginStore = useLoginStore();

const email = ref('');
const password = ref('');

const onSubmit = async () => {
  await loginStore.login({
    username: email.value,
    password: password.value,
  });
};

const onReset = () => {
  console.log('reset');
};
</script>
