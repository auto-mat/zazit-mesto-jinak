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
    <!-- Button: submit -->
    <div class="flex justify-end q-mt-lg">
      <q-btn
        rounded
        unelevated
        type="submit"
        color="primary"
        :label="t('profile.buttonUpdate')"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldPhone from 'src/components/form/global/FormFieldPhone.vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/user';
import { storeToRefs } from 'pinia';
import { FormOption } from 'src/types/Form';
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';
import { UserGender } from 'src/enums/userEnums';

const emit = defineEmits(['submit']);

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

const onUpdateLocale = (locale: string) => {
  userDetailsForm.value.languagePreference = locale;
};

const onSubmit = () => {
  userStore.updateUserDetails();
  emit('submit');
};

const onReset = () => {
  // noop
};
</script>
