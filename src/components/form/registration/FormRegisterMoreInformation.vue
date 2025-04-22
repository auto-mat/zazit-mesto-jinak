<script lang="ts">
/**
 * FormRegisterMoreInformation Component
 *
 * The `FormRegisterMoreInformation` is used to gather more information in registeration.
 *
 * @description * Use this component to display registration form.
 *
 * @example
 * <form-register-more-information />
 *
 */

// libraries
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import FormFieldRadioGroup from '../global/FormFieldRadioGroup.vue';
import FormFieldTextarea from '../global/FormFieldTextarea.vue';

//types
import { FormOption } from 'src/types/Form';

export default defineComponent({
  name: 'FormRegisterMoreInformation',
  components: {
    FormFieldRadioGroup,
    FormFieldTextarea,
  },
  setup() {
    const { t } = useI18n()

    const formRegisterMoreInformation = reactive({
      organizeReasons: [],
      collaborationSubject: '',
      fundingTypes: [],
      fundingCost: '',
      ownChanges: '',
      otherActivities: ''
    });


    const optionsFundingCost: FormOption[] = [
      {
        label: t('register.moreInformation.fundingCost.low'),
        value: 'low'
      },
      {
        label: t('register.moreInformation.fundingCost.mid'),
        value: 'mid'
      },
      {
        label: t('register.moreInformation.fundingCost.high'),
        value: 'high'
      },
    ]

    const onSubmit = (): void => {
      // noop
    };

    const onReset = (): void => {
      // noop
    };

    return {
      formRegisterMoreInformation,
      optionsFundingCost,
      onReset,
      onSubmit,
    };
  },
});
</script>

<template>
  <div>
    <!-- Form: register event -->
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2
        class="q-mt-0 q-mb-sm text-body1 text-weight-bold"
      >
        {{ $t('register.moreInformation.title') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mt-lg q-mb-sm">
          <!-- TODO organize reason -->
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-textarea 
            v-model="formRegisterMoreInformation.collaborationSubject"
            label="register.moreInformation.labelCollaborationSubject"
            name="collaboration"
            class="col-12"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-xl">
          <!-- TODO funding types (checkboxes) -->
          <div class="col-12 col-sm-4">
            <label
              for="funding-cost"
              class="text-grey-10 text-caption text-bold"
            >
              {{ $t('register.moreInformation.labelFundingCost') }}
            </label>
            <form-field-radio-group 
              v-model="formRegisterMoreInformation.fundingCost" 
              :options="optionsFundingCost" 
              id="funding-cost"
              class="q-mt-md"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-textarea 
            v-model="formRegisterMoreInformation.ownChanges"
            label="register.moreInformation.labelOwnChanges"
            name="own-changes"
            class="col-12"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-textarea 
            v-model="formRegisterMoreInformation.otherActivities"
            label="register.moreInformation.labelOtherActivities"
            name="other-activities"
            class="col-12"
          />
        </div>
      </div>
        <!-- Button: back and submit -->
        <div class="flex justify-end q-gutter-sm q-mt-lg">
          <q-btn
            rounded
            unelevated
            outline
            type="reset"
            color="primary"
            :label="$t('register.moreInformation.buttonBack')"
          />
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('register.moreInformation.buttonSubmit')"
          />
        </div>
    </q-form>
  </div>
</template>