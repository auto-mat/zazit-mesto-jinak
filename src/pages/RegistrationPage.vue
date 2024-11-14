<template>
  <q-page class="column items-center">
    <p>{{ $t('header.siteTitle')}}</p>
    <form-field-text v-model="formData.name" name="name" label="Name" />
    <form-field-email v-model="formData.email"/>
    <form-field-phone v-model="formData.phone" />
    <form-field-password v-model="formData.password" />
    <form-field-password-confirm v-model="formData.passwordConfirm" :compare-value="formData.password" /> 
    <form-field-checkbox v-model="formData.isChecked" validation-message="validationMessage" required>Checkbox</form-field-checkbox>
    <form-field-radio-group v-model="formData.radio" :options="options" />
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormFieldEmail from 'src/components/form/FormFieldEmail.vue';
import FormFieldPassword from 'src/components/form/FormFieldPassword.vue';
import FormFieldPasswordConfirm from 'src/components/form/FormFieldPasswordConfirm.vue';
import FormFieldPhone from 'src/components/form/FormFieldPhone.vue';
import FormFieldText from 'src/components/form/FormFieldText.vue';
import FormFieldCheckbox from 'src/components/form/FormFieldCheckbox.vue';
import FormFieldRadioGroup from 'src/components/form/FormFieldRadioGroup.vue';
import { FormOption } from 'src/components/types/Form';

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
  isChecked: false,
  radio: ''
});

const options: FormOption[] = [
  {
    label: 'First',
    value: '1',
  },
  {
    label: 'Second',
    value: '2'
  }
]

defineOptions({
  name: 'RegistrationPage'
});
</script>