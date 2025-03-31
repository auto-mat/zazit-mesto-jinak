<script lang="ts">
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
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import FormFieldText from '../global/FormFieldText.vue';
import FormFieldEmail from '../global/FormFieldEmail.vue';
import FormFieldPhone from '../global/FormFieldPhone.vue';
import FormFieldCheckbox from '../global/FormFieldCheckbox.vue';

//types
import { FormOption } from 'src/types/Form';

export default defineComponent({
  name: 'FormRegisterCoordinator',
  components: {
    FormFieldCheckbox,
    FormFieldEmail,
    FormFieldText,
    FormFieldPhone,
  },
  setup() {
    const { t } = useI18n()

    const email = 'john.novak@email.com' // from store

    const formRegisterPersonalDetails = reactive({
      firstName: '',
      lastName: '',
      phone: '',
      gender: 'unknown',
      onlyOrganizerNews: false,
      allNews: false, 
      terms: false,
      codex: false,
    });

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
      // noop
    };

    const onReset = (): void => {
      // noop
    };

    return {
      email,
      formRegisterPersonalDetails,
      optionsGender,
      onReset,
      onSubmit,
    };
  },
});
</script>

<template>
  <div>
    <!-- Form: register personal details -->
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2
        class="q-mt-0 q-mb-sm text-body1 text-weight-bold"
        data-cy="register-form-personal-details-title"
      >
        {{ $t('register.personalDetails.title') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-email 
            v-model="email"
            disabled
            class="col-12 col-sm-6"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: first name -->
          <form-field-text
            v-model="formRegisterPersonalDetails.firstName"
            name="form-first-name"
            label="form.labelFirstName"
            autocomplete="given-name"
            class="col-12 col-sm-6"
            data-cy="form-register-personal-details-first-name"
          />
          <!-- Input: last name -->
          <form-field-text
            v-model="formRegisterPersonalDetails.lastName"
            name="form-last-name"
            label="form.labelLastName"
            autocomplete="family-name"
            class="col-12 col-sm-6"
            data-cy="form-register-personal-details-last-name"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: phone-->
          <form-field-phone
            v-model="formRegisterPersonalDetails.phone"
            data-cy="form-register-personal-details-phone"
          />

          <!-- Input: gender -->
          <div class="col-12 col-sm-6">
            <!-- Label -->
            <label
              for="form-gender"
              class="text-grey-10 text-caption text-bold"
            >
              {{ $t('form.labelGender') }}
            </label>
            <!-- Options -->
            <q-option-group
              inline
              dense
              id="form-gender"
              v-model="formRegisterPersonalDetails.gender"
              :options="optionsGender"
              color="primary"
              class="q-mt-sm q-gutter-x-lg"
            />
          </div>
        </div>
        <!-- Input: confirm responsibility -->
        <div class="col-12">
          <label class="text-grey-10 text-caption text-bold">
            {{ $t('register.personalDetails.newsTitle') }}
          </label>
          <form-field-checkbox 
            v-model="formRegisterPersonalDetails.onlyOrganizerNews"
          >
            {{ $t('register.personalDetails.onlyOrganizerNews') }}
          </form-field-checkbox>
          <form-field-checkbox 
            v-model="formRegisterPersonalDetails.allNews"
          >
            {{ $t('register.personalDetails.allNews') }}
          </form-field-checkbox>
        </div>
        <!-- Input: confirm consent -->
        <div class="col-12 q-mt-xl" data-cy="form-register-personal-details-terms">
          <!-- Checkbox: terms -->
          <form-field-checkbox
            v-model="formRegisterPersonalDetails.terms"
            :validation-message="
                $t('register.personalDetails.messageTermsRequired')
              "
            required
          >
            {{ $t('register.personalDetails.labelPrivacyConsent') }}
            <!-- Link: terms -->
            <!-- TODO: Link to terms page -->
            <a href="#" target="_blank" class="text-primary">
              {{ $t('register.personalDetails.linkPrivacyConsent') }} </a
            >.
          </form-field-checkbox>
          <!-- Checkbox: codex -->
          <form-field-checkbox
            v-model="formRegisterPersonalDetails.codex"
            :validation-message="
                $t('register.personalDetails.messageTermsRequired')
              "
            required
          >
            {{ $t('register.personalDetails.labelCodexTerms') }}
            <!-- Link: codex -->
            <!-- TODO: Link to codex page -->
            <a href="#" target="_blank" class="text-primary">
              {{ $t('register.personalDetails.linkCodexTerms') }} </a
            >.
          </form-field-checkbox>
          </div>
        </div>
        <!-- Button: submit -->
        <div class="flex justify-end q-mt-lg">
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('register.personalDetails.buttonSubmit')"
            data-cy="form-register-coordinator-submit"
          />
        </div>
    </q-form>
  </div>
</template>