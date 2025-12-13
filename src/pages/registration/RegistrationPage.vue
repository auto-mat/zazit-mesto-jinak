<template>
  <q-page
    class="column items-center registration-page"
    :style="{ maxWidth: zazitMestoJinakConfig.containerContentWidth }"
  >
    <h1>{{ t('register.details.title') }}</h1>
    <q-stepper
      class="custom-stepper"
      v-model="step"
      vertical
      color="primary"
      animated
      flat
    >
      <q-step
        :name="1"
        prefix="1."
        :title="t('register.personalDetails.title')"
        :done="step > 1"
      >
        <form-register-personal-details @submit="step = 2" />
      </q-step>

      <q-step
        :name="2"
        prefix="2"
        :title="t('register.event.title')"
        :done="step > 2"
      >
        <form-register-event @submit="step = 3" @back="step = 1" />
      </q-step>

      <q-step
        :name="3"
        prefix="3"
        :title="t('register.organizers.title')"
        :done="step > 3"
      >
        <form-register-organizers @submit="step = 4" @back="step = 2" />
      </q-step>

      <q-step :name="4" prefix="4" :title="t('register.moreInformation.title')">
        <form-register-more-information
          @submit="registerStore.registerComplete"
          @back="step = 3"
        />
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script setup lang="ts">
// libraries
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// stores
import { useRegisterStore } from 'src/stores/register';
import { useUserStore } from 'src/stores/user';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

// components
import FormRegisterPersonalDetails from 'src/components/form/registration/FormRegisterPersonalDetails.vue';
import FormRegisterEvent from 'src/components/form/registration/FormRegisterEvent.vue';
import FormRegisterOrganizers from 'src/components/form/registration/FormRegisterOrganizers.vue';
import FormRegisterMoreInformation from 'src/components/form/registration/FormRegisterMoreInformation.vue';
import { routesConf } from 'src/router/routes_conf';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'RegistrationPage',
});

const step = ref(1);

const { t } = useI18n();

const registerStore = useRegisterStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.loadUserDetails();
  registerStore.checkRegistrationStatus();
  if (registerStore.isRegistratonComplete) {
    router.push(routesConf['home']['path']);
  }
});
</script>

<style scoped lang="scss">
.registration-page {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.custom-stepper {
  width: 100%;
  background-color: transparent;

  :deep(.q-stepper__step) {
    border-radius: 10px;
    background-color: #f3f7ff;
    padding: 2rem;
    margin: 1rem 0;

    @media (max-width: 768px) {
      padding-block: 1rem;
      padding-inline: 0;
    }
  }

  :deep(.q-stepper__line:before) {
    display: none !important;
  }
  :deep(.q-stepper__line:after) {
    display: none !important;
  }

  :deep(.q-stepper__step-inner) {
    padding: 0.5rem 3rem;
  }

  :deep(.q-stepper__title) {
    font-size: 1.25rem;
    font-weight: 600;
  }
}
</style>
