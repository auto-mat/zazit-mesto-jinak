<template>
  <q-page class="column items-center">
      <form-register-personal-details class="form" email="john.novak@email.cz" />

      <form-register-event class="form" date="22/08/2025"/>

      <form-register-organizers class="form" />

      <form-register-more-information class="form" />
  </q-page>
</template>

<script setup lang="ts">
import FormRegisterPersonalDetails from 'src/components/form/registration/FormRegisterPersonalDetails.vue';
import FormRegisterEvent from 'src/components/form/registration/FormRegisterEvent.vue';
import FormRegisterOrganizers from 'src/components/form/registration/FormRegisterOrganizers.vue';
import FormRegisterMoreInformation from 'src/components/form/registration/FormRegisterMoreInformation.vue';

defineOptions({
  name: 'RegistrationPage'
});
</script>

<style scoped>
.form {
  width: 50%;
}
</style>