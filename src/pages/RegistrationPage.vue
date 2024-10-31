<template>
  <q-page class="column items-center">
    <p>{{ $t('header.siteTitle')}}</p>
    <form-field-text v-model="formData.name" name="name" label="Name" />
    <form-field-email v-model="formData.email"/>
    <form-field-phone v-model="formData.phone" />
    <form-field-password v-model="formData.password" />
    <form-field-password-confirm v-model="formData.passwordConfirm" :compare-value="formData.password" />

    <!-- <p>{{ value }}</p> -->
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormFieldEmail from 'src/components/form/FormFieldEmail.vue';
import FormFieldPassword from 'src/components/form/FormFieldPassword.vue';
import FormFieldPasswordConfirm from 'src/components/form/FormFieldPasswordConfirm.vue';
import FormFieldPhone from 'src/components/form/FormFieldPhone.vue';
import FormFieldText from 'src/components/form/FormFieldText.vue';

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
});

defineOptions({
  name: 'RegistrationPage'
});
</script>