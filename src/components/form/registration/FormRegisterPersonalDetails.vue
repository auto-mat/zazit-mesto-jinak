<template>
  <!-- Form: register personal details -->
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md text-grey-10">
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="column">
        <label class="text-caption text-bold q-mb-xs">
          {{ t('form.labelEmail') }}
        </label>
        <span>
          {{ userMeta.email }}
        </span>
      </div>
    </div>
    <div class="row q-col-gutter-md q-mb-sm">
      <!-- Input: first name -->
      <form-field-text
        v-model="registerFormState.personalDetails.firstName"
        name="form-first-name"
        label="form.labelFirstName"
        autocomplete="given-name"
        required
        class="col-12 col-sm-6"
        data-cy="form-register-personal-details-first-name"
      />
      <!-- Input: last name -->
      <form-field-text
        v-model="registerFormState.personalDetails.lastName"
        name="form-last-name"
        label="form.labelLastName"
        autocomplete="family-name"
        required
        class="col-12 col-sm-6"
        data-cy="form-register-personal-details-last-name"
      />
    </div>
    <div class="row q-col-gutter-md q-mb-sm">
      <!-- Input: phone-->
      <form-field-phone
        v-model="registerFormState.personalDetails.phone"
        required
      />
      <!-- Input: gender -->
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
          v-model="registerFormState.personalDetails.gender"
          :options="optionsGender"
          color="primary"
          class="q-mt-sm q-gutter-x-lg"
        />
      </div>
    </div>
    <!-- Input: confirm responsibility -->
    <div class="col-12">
      <label class="text-grey-10 text-caption text-bold">
        {{ t('register.personalDetails.newsTitle') }}
        <span class="text-grey-6 text-caption">
          {{ ` (${t('form.labelOptional')})` }}
        </span>
      </label>
      <form-field-checkbox
        v-model="registerFormState.personalDetails.onlyOrganizerNews"
      >
        {{ t('register.personalDetails.onlyOrganizerNews') }}
      </form-field-checkbox>
      <form-field-checkbox v-model="registerFormState.personalDetails.allNews">
        {{ t('register.personalDetails.allNews') }}
      </form-field-checkbox>
    </div>
    <!-- Input: confirm consent -->
    <div class="col-12 q-mt-xl">
      <!-- Checkbox: terms -->
      <form-field-checkbox
        v-model="registerFormState.personalDetails.terms"
        :validation-message="t('register.personalDetails.messageTermsRequired')"
        required
      >
        {{ t('register.personalDetails.labelPrivacyConsent') }}
        <!-- Link: terms -->
        <!-- TODO: Link to terms page -->
        <a href="#" target="_blank" class="text-primary">
          {{ t('register.personalDetails.linkPrivacyConsent') }} </a
        >.
      </form-field-checkbox>
      <!-- Checkbox: codex -->
      <form-field-checkbox
        v-model="registerFormState.personalDetails.codex"
        :validation-message="t('register.personalDetails.messageTermsRequired')"
        required
      >
        {{ t('register.personalDetails.labelCodexTerms') }}
        <!-- Link: codex -->
        <!-- TODO: Link to codex page -->
        <a href="#" target="_blank" class="text-primary">
          {{ t('register.personalDetails.linkCodexTerms') }} </a
        >.
      </form-field-checkbox>
    </div>
    <!-- Button: submit -->
    <div class="flex justify-end q-mt-lg">
      <q-btn
        rounded
        unelevated
        type="submit"
        color="primary"
        :label="t('register.personalDetails.buttonSubmit')"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
/**
 * FormRegisterPersonalDetails Component
 *
 * The `FormRegisterPersonalDetails` is used to gather personal information in registeration.
 *
 * @description * Use this component to display registration form.
 *
 * @example
 * <form-register-personal-details />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6356%3A25476&mode=dev)
 */

// libraries
import { useI18n } from 'vue-i18n';

// components
import FormFieldText from '../global/FormFieldText.vue';
import FormFieldPhone from '../global/FormFieldPhone.vue';
import FormFieldCheckbox from '../global/FormFieldCheckbox.vue';

// types
import { FormOption } from 'src/types/Form';
import { useRegisterStore } from 'src/stores/register';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user';

const emit = defineEmits(['submit']);

const { t } = useI18n();

const userStore = useUserStore();
const { userMeta } = storeToRefs(userStore);

const registerStore = useRegisterStore();
const { registerFormState } = storeToRefs(registerStore);

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
    label: t('gender.unknown'),
    value: 'unknown',
  },
];

const onSubmit = (): void => {
  emit('submit');
};

const onReset = (): void => {
  // noop
};
</script>
