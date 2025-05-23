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
import FormFieldTextarea from '../global/FormFieldTextarea.vue';
import InfoButton from 'src/components/buttons/InfoButton.vue';

//types
import { FormOption } from 'src/types/Form';

export default defineComponent({
  name: 'FormRegisterEvent',
  components: {
    FormFieldText,
    FormFieldRadioGroup,
    FormFieldDateInput,
    FormFieldTextarea,
    InfoButton
  },
  props: {
    date: {
      type: String,
      required: true
    },

  },
  setup(props) {
    const { t } = useI18n()

    const choice = ref('new') // watch -> get events
    const fromPast = ref('')

    const formRegisterEvent = reactive({
      eventName: '',
      date: props.date,
      gps: '',
      spaceType: 'none', //option
      spaceArea: 'none', //option
      spaceRent: 'none',
      activities: '',
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


    const optionsSpaceType: FormOption[] = [
      {
        label: t('event.spaceType.none'),
        value: 'none'
      },
      {
        label: t('event.spaceType.park'),
        value: 'park'
      },
      {
        label: t('event.spaceType.sidewalk'),
        value: 'sidewalk'
      },
      {
        label: t('event.spaceType.roadway'),
        value: 'roadway'
      },
      {
        label: t('event.spaceType.countryard'),
        value: 'countryard'
      },
    ]

    const optionsSpaceArea: FormOption[] = [
      {
        label: t('event.spaceArea.xs'),
        value: 'xs'
      },
      {
        label: t('event.spaceArea.sm'),
        value: 'sm'
      },
      {
        label: t('event.spaceArea.md'),
        value: 'md'
      },
      {
        label: t('event.spaceArea.lg'),
        value: 'lg'
      },
      {
        label: t('event.spaceArea.xl'),
        value: 'countryard'
      },
    ]

    const optionsSpaceRent: FormOption[] = [
      {
        label: t('event.spaceRent.yes'),
        value: 'yes'
      },
      {
        label: t('event.spaceRent.no'),
        value: 'no'
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
      optionsSpaceType,
      optionsSpaceArea,
      optionsSpaceRent,
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
        <div class="row q-col-gutter-md q-mb-lg">
          <form-field-radio-group 
            v-model="choice" 
            :options="optionsChoiceEvent" 
          />
        </div>
        
        <div v-if="choice == 'past'" class="row q-col-gutter-md q-mb-md">
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
              class="q-mt-sm"
            />
          </div>
        </div>
        
        <div class="row q-col-gutter-md q-mt-lg q-mb-sm">
          <!-- Input: event name -->
          <form-field-text
            v-model="formRegisterEvent.eventName"
            name="form-event-name"
            label="register.event.labelEventName"
            required
            class="col-12"
            data-cy="form-register-event-name"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-12 col-sm-6">
            <label
              for="date"
              class="text-grey-10 text-caption text-bold row items-center"
            >
              {{ $t('register.event.labelPickDate') }}
              <info-button 
                class="q-ml-sm"
                :content="$t('register.event.textInfoDate', { date: formRegisterEvent.date })"
              />
            </label>
            <form-field-date-input v-model="formRegisterEvent.date" id="date" />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-xl">
          <div class="col-12 col-sm-4">
            <label
              for="space-type"
              class="text-grey-10 text-caption text-bold row items-center"
            >
              {{ $t('register.event.labelSpaceType') }}
              <info-button 
                class="q-ml-sm"
                :content="$t('register.event.textInfoSpaceType')"
              />
            </label>
            <form-field-radio-group 
              v-model="formRegisterEvent.spaceType" 
              :options="optionsSpaceType" 
              id="space-type"
              class="q-mt-md"
            />
          </div>
          <div 
            v-if="formRegisterEvent.spaceType !== 'none'" 
            class="col-12 col-sm-4"
          >
            <label
              for="space-area"
              class="text-grey-10 text-caption text-bold row items-center"
            >
              {{ $t('register.event.labelSpaceArea') }}
              <info-button 
                class="q-ml-sm"
                :content="$t('register.event.textInfoSpaceArea')"
              />
            </label>
            <form-field-radio-group 
              v-model="formRegisterEvent.spaceArea" 
              :options="optionsSpaceArea" 
              id="space-area"
              class="q-mt-md"
            />
          </div>
          <div 
            v-if="formRegisterEvent.spaceType !== 'none'" 
            class="col-12 col-sm-4"
          >
            <label
              for="space-area"
              class="text-grey-10 text-caption text-bold row items-center"
            >
              {{ $t('register.event.labelSpaceRent') }}
              <info-button 
                class="q-ml-sm"
                :content="$t('register.event.textInfoSpaceRent')"
              />
            </label>
            <form-field-radio-group 
              v-model="formRegisterEvent.spaceRent" 
              :options="optionsSpaceRent" 
              id="space-area"
              class="q-mt-md"
            />
          </div>
        </div>
        <!-- TODO inside space -->
         <!-- TODO sales -->
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-textarea 
            v-model="formRegisterEvent.activities"
            label="register.event.labelActivities"
            name="activities"
            required
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
            :label="$t('register.event.buttonBack')"
          />
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('register.event.buttonSubmit')"
          />
        </div>
    </q-form>
  </div>
</template>