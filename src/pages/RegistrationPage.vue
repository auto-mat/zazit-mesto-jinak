<template>
  <q-page class="column items-center justify-evenly">
    <p>{{ $t('header.siteTitle')}}</p>
    <form-field-email v-model="formData.email"/>

    <!-- <p>{{ value }}</p> -->
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormFieldEmail from '../components/form/FormFieldEmail.vue'

const formData = reactive({
  email: ''
});

defineOptions({
  name: 'RegistrationPage'
});
</script>