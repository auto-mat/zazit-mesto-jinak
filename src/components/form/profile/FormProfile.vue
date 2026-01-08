<template>
  <q-form autofocus @submit="onSubmit" @reset="onReset" class="text-grey-10">
    <div class="row q-col-gutter-md q-mb-sm">
      <!-- Input: first name -->
      <form-field-text
        v-model="userDetailsForm.name"
        name="form-first-name"
        label="form.labelFirstName"
        autocomplete="given-name"
        required
        class="col-12 col-sm-6"
      />
      <!-- Input: last name -->
      <form-field-text
        v-model="userDetailsForm.surname"
        name="form-last-name"
        label="form.labelLastName"
        autocomplete="family-name"
        required
        class="col-12 col-sm-6"
        data-cy="form-register-personal-details-last-name"
      />
      <!-- Input: phone -->
      <form-field-phone
        v-model="userDetailsForm.phone"
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
          v-model="userDetailsForm.gender"
          :options="optionsGender"
          color="primary"
          class="q-mt-sm q-gutter-x-lg"
        />
      </div>
      <!-- Input: language -->
      <div class="col-12">
        <label for="form-language" class="text-grey-10 text-caption text-bold">
          {{ t('profile.languagePrefer') }}
        </label>
        <language-switcher
          :value="userDetailsForm.languagePreference"
          @update-locale="onUpdateLocale"
        />
      </div>
    </div>
    <!-- Buttos -->
    <div class="flex justify-end q-mt-lg">
      <q-btn
        rounded
        outline
        unelevated
        type="reset"
        color="primary"
        :label="t('profile.buttonCancel')"
      />
      <q-btn
        rounded
        unelevated
        type="submit"
        color="primary"
        :label="t('profile.buttonUpdate')"
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
/**
 * FormProfile Component
 *
 * The `FormProfile` displays the profile form.
 *
 * @description * Use this component to display the profile form.
 *
 * @events
 * - `submit`: Emitted when the form is submitted.
 * - `reset`: Emitted when the form is reset.
 *
 * @example
 * <form-profile @submit="onSubmit" @reset="onReset" />
 */

// libraries
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// stores
import { useUserStore } from 'src/stores/user';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldPhone from 'src/components/form/global/FormFieldPhone.vue';
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';

// types
import { FormOption } from 'src/types/Form';

// enums
import { UserGender, UserLanguage } from 'src/enums/userEnums';

const emit = defineEmits(['submit', 'reset']);

const { t } = useI18n();

const userStore = useUserStore();
const { userDetailsForm } = storeToRefs(userStore);

const optionsGender: FormOption[] = [
  {
    label: t('gender.male'),
    value: UserGender.MALE,
  },
  {
    label: t('gender.female'),
    value: UserGender.FEMALE,
  },
  {
    label: t('gender.other'),
    value: UserGender.OTHER,
  },
  {
    label: t('gender.unknown'),
    value: UserGender.UNKNOWN,
  },
];

const onUpdateLocale = (locale: UserLanguage): void => {
  userDetailsForm.value.languagePreference = locale;
};

const onSubmit = (): void => {
  emit('submit');
};

const onReset = (): void => {
  emit('reset');
};
</script>
