<template>
  <q-page class="column items-center">
      <form-register-personal-details />
  </q-page>
</template>

<script setup lang="ts">
import FormRegisterPersonalDetails from 'src/components/form/registration/FormRegisterPersonalDetails.vue';

defineOptions({
  name: 'RegistrationPage'
});
</script>