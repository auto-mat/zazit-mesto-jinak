<template>
  <q-page class="column items-center">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      style="width: 90%"
    >
      <q-step
        :name="1"
        :title="t('register.personalDetails.title')"
        icon="settings"
        :done="step > 1"
      >
        <form-register-personal-details @submit="step = 2" />
      </q-step>

      <q-step
        :name="2"
        :title="t('register.event.title')"
        icon="create_new_folder"
        :done="step > 2"
      >
        <form-register-event @submit="step = 3" @back="step = 1" />
      </q-step>

      <q-step
        :name="3"
        :title="t('register.organizers.title')"
        icon="assignment"
        :done="step > 3"
      >
        <form-register-organizers @submit="step = 4" @back="step = 2" />
      </q-step>

      <q-step
        :name="4"
        :title="t('register.moreInformation.title')"
        icon="add_comment"
      >
        <form-register-more-information
          @submit="registerStore.registerDone"
          @back="step = 3"
        />
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script setup lang="ts">
import FormRegisterPersonalDetails from 'src/components/form/registration/FormRegisterPersonalDetails.vue';
import FormRegisterEvent from 'src/components/form/registration/FormRegisterEvent.vue';
import FormRegisterOrganizers from 'src/components/form/registration/FormRegisterOrganizers.vue';
import FormRegisterMoreInformation from 'src/components/form/registration/FormRegisterMoreInformation.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRegisterStore } from 'src/stores/register';

defineOptions({
  name: 'RegistrationPage',
});

const step = ref(1);

const { t } = useI18n();

const registerStore = useRegisterStore();
</script>

<style scoped></style>
