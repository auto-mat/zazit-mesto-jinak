<template>
  <q-page>
    <h1 class="q-mb-lg">{{ t('register.title') }}</h1>
    <form-register />
  </q-page>
</template>

<script setup lang="ts">
import FormRegister from 'src/components/form/registration/FormRegister.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineOptions({
  name: 'RegistrationPage',
});
</script>

<style scoped></style>
