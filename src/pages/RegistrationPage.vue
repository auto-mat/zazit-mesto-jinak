<template>
  <q-page class="column items-center">
      <form-register-personal-details class="form" />

      <form-register-event class="form"/>
  </q-page>
</template>

<script setup lang="ts">
import FormRegisterPersonalDetails from 'src/components/form/registration/FormRegisterPersonalDetails.vue';
import FormRegisterEvent from 'src/components/form/registration/FormRegisterEvent.vue';

defineOptions({
  name: 'RegistrationPage'
});
</script>

<style scoped>
.form {
  width: 50%;
}
</style>