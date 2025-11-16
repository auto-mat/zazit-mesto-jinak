<template>
  <q-form autofocus @submit="onSubmit" @reset="onReset" class="text-grey-10">
    <div class="row q-col-gutter-md q-mb-sm">
      <!-- Input: first name -->
      <form-field-text
        v-model="userDetails.name"
        name="form-first-name"
        label="form.labelFirstName"
        autocomplete="given-name"
        class="col-12 col-sm-6"
      />
      <!-- Input: last name -->
      <form-field-text
        v-model="userDetails.surname"
        name="form-last-name"
        label="form.labelLastName"
        autocomplete="family-name"
        class="col-12 col-sm-6"
        data-cy="form-register-personal-details-last-name"
      />
      <form-field-phone
        v-model="userDetails.phone"
        name="form-phone"
        label="form.labelPhone"
        autocomplete="tel"
        class="col-12 col-sm-6"
      />
      <div class="col-12 col-sm-6">
        <!-- Label -->
        <label for="form-gender" class="text-grey-10 text-caption text-bold">
          {{ t('form.labelGender') }}
        </label>
        <!-- Options -->
        <q-option-group
          inline
          dense
          id="form-gender"
          v-model="userDetails.gender"
          :options="optionsGender"
          color="primary"
          class="q-mt-sm q-gutter-x-lg"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import FormFieldText from '../form/global/FormFieldText.vue';
import FormFieldPhone from '../form/global/FormFieldPhone.vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/user';
import { storeToRefs } from 'pinia';
import { FormOption } from 'src/types/Form';

const { t } = useI18n();

const userStore = useUserStore();
const { userDetails } = storeToRefs(userStore);

const optionsGender: FormOption[] = [
  {
    label: t('gender.male'),
    value: 'male',
  },
  {
    label: t('gender.female'),
    value: 'female',
  },
  {
    label: t('gender.other'),
    value: 'other',
  },
  {
    label: t('gender.unknown'),
    value: 'unknown',
  },
];

const onSubmit = () => {
  // noop
};

const onReset = () => {
  // noop
};
</script>
