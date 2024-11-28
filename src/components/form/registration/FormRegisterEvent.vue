<script lang="ts">
/**
 * FormRegisterEvent Component
 *
 * The `FormRegisterEvent` is used to gather information about event in registeration.
 *
 * @description * Use this component to display registration form.
 *
 * @example
 * <form-register-event />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6356%3A25476&mode=dev)
 */

// libraries
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import FormFieldText from '../global/FormFieldText.vue';
import FormFieldRadioGroup from '../global/FormFieldRadioGroup.vue';
import FormFieldDateInput from '../global/FormFieldDateInput.vue';
import FormFieldCheckbox from '../global/FormFieldCheckbox.vue';

//types
import { FormOption } from 'src/components/types/Form';

export default defineComponent({
  name: 'FormRegisterCoordinator',
  components: {
    FormFieldText,
    FormFieldRadioGroup,
    FormFieldDateInput,
    FormFieldCheckbox
  },
  setup() {
    const { t } = useI18n()

    const ZMJdate = '22/09/2025'

    const choice = ref('new') // watch -> get events
    const fromPast = ref('')

    const formRegisterEvent = reactive({
      eventName: '',
      date: ZMJdate,
      gps: '',
      spaceType: false, //option
      size: '', //option
      activities: '', //option
    });

    const optionsChoiceEvent: FormOption[] = [
      {
        label: t('register.event.choiceNew'),
        value: 'new'
      },
      {
        label: t('register.event.choiceFromPast'),
        value: 'past'
      }
    ]

    // mock
    const eventsFromPast = ['Husitská', 'Náměstí Míru', 'Park Stromovka'] 

    const onSubmit = (): void => {
      // noop
    };

    const onReset = (): void => {
      // noop
    };

    return {
      choice,
      fromPast,
      eventsFromPast,
      optionsChoiceEvent,
      formRegisterEvent,
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
        data-cy="register-form-event-title"
      >
        {{ $t('register.event.title') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-radio-group 
            v-model="choice" 
            :options="optionsChoiceEvent" 
          />
        </div>
        
        <div v-if="choice == 'past'" class="row q-col-gutter-md q-mb-sm">
          <div class="col-12">
            <label
              for="event-from-past"
              class="text-grey-10 text-caption text-bold"
            >
              {{ $t('register.event.labelEventFromPast') }}
            </label>
            <q-select 
              outlined
              dense
              id="event-from-past"
              v-model="fromPast" 
              :options="eventsFromPast"
            />
          </div>
        </div>
        
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: event name -->
          <form-field-text
            v-model="formRegisterEvent.eventName"
            name="form-event-name"
            label="register.event.labelEventName"
            autocomplete="given-name"
            class="col-12"
            data-cy="form-register-event-name"
          />
        </div>
        <label
          class="text-grey-10 text-caption text-bold"
        >
           {{ $t('register.event.labelPickDate') }}
        </label>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-12 col-sm-6">
            <form-field-date-input v-model="formRegisterEvent.date" label="date" />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-checkbox v-model="formRegisterEvent.spaceType" />
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