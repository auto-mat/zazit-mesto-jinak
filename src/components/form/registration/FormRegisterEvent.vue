<template>
  <div>
    <!-- Form: register event -->
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md text-grey-10"
    >
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
            {{ t('register.event.labelEventFromPast') }}
          </label>
          <q-select
            outlined
            dense
            id="event-from-past"
            v-model="eventFromPast"
            :options="eventsFromPast"
            class="q-mt-sm"
            bg-color="white"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-lg q-mb-sm">
        <!-- Input: event name -->
        <form-field-text
          v-model="registerFormState.eventDetails.eventName"
          name="form-event-name"
          label="register.event.labelEventName"
          required
          class="col-12"
          bg-color="white"
        />
      </div>
      <div class="row q-col-gutter-md q-mb-sm">
        <div class="col-12 col-sm-6">
          <label
            for="date"
            class="text-grey-10 text-caption text-bold row items-center"
          >
            {{ t('register.event.labelPickDate') }}
            <info-button
              class="q-ml-sm"
              :content="
                t('register.event.textInfoDate', {
                  date: registerStore.eventDate,
                })
              "
            />
          </label>
          <form-field-date-input
            v-model="registerFormState.eventDetails.date"
            id="date"
            bg-color="white"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12">
          <label class="text-grey-10 text-caption">
            <span class="text-bold">
              {{ t('register.event.labelLocation') }}
            </span>
            {{ ` (${t('register.event.labelLocationInfo')})` }}
          </label>
          <leaflet-map class="map q-mt-sm" editable @set-coords="setCoords" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <form-field-text
          v-model="registerFormState.eventDetails.place"
          name="form-place"
          label="register.event.labelPlace"
          required
          class="col-12"
          bg-color="white"
        />
      </div>

      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-sm-4">
          <label
            for="space-type"
            class="text-grey-10 text-caption text-bold row items-center"
          >
            {{ t('register.event.labelSpaceType') }}
            <info-button
              class="q-ml-sm"
              :content="t('register.event.textInfoSpaceType')"
            />
          </label>
          <form-field-radio-group
            v-model="registerFormState.eventDetails.spaceType"
            :options="optionsSpaceType"
            id="space-type"
            class="q-mt-md"
          />
        </div>
        <div
          v-if="registerFormState.eventDetails.spaceType !== 'none'"
          class="col-12 col-sm-4"
        >
          <label
            for="space-area"
            class="text-grey-10 text-caption text-bold row items-center"
          >
            {{ t('register.event.labelSpaceArea') }}
            <info-button
              class="q-ml-sm"
              :content="t('register.event.textInfoSpaceArea')"
            />
          </label>
          <form-field-radio-group
            v-model="registerFormState.eventDetails.spaceArea"
            :options="optionsSpaceArea"
            id="space-area"
            class="q-mt-md"
          />
        </div>
        <div
          v-if="registerFormState.eventDetails.spaceType !== 'none'"
          class="col-12 col-sm-4"
        >
          <label
            for="space-area"
            class="text-grey-10 text-caption text-bold row items-center"
          >
            {{ t('register.event.labelSpaceRent') }}
            <info-button
              class="q-ml-sm"
              :content="t('register.event.textInfoSpaceRent')"
            />
          </label>
          <form-field-radio-group
            v-model="registerFormState.eventDetails.spaceRent"
            :options="optionsSpaceRent"
            id="space-area"
            class="q-mt-md"
          />
        </div>
      </div>
      <div class="row q-col-gutter-md q-mb-sm">
        <form-field-textarea
          v-model="registerFormState.eventDetails.activities"
          label="register.event.labelActivities"
          name="activities"
          required
          bg-color="white"
          class="col-12"
        />
      </div>
      <!-- Button: back and submit -->
      <div class="flex justify-end q-gutter-sm q-mt-lg">
        <q-btn
          rounded
          unelevated
          outline
          type="reset"
          color="primary"
          :label="t('register.event.buttonBack')"
        />
        <q-btn
          rounded
          unelevated
          type="submit"
          color="primary"
          :label="t('register.event.buttonSubmit')"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
/**
 * FormRegisterEvent Component
 *
 * The `FormRegisterEvent` is used to gather information about event in registeration.
 *
 * @description * Use this component to display registration form.
 *
 * @example
 * <form-register-event />
 */

// libraries
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// stores
import { useRegisterStore } from 'src/stores/register';

// components
import FormFieldText from '../global/FormFieldText.vue';
import FormFieldRadioGroup from '../global/FormFieldRadioGroup.vue';
import FormFieldDateInput from '../global/FormFieldDateInput.vue';
import FormFieldTextarea from '../global/FormFieldTextarea.vue';
import InfoButton from 'src/components/buttons/InfoButton.vue';
import LeafletMap from 'src/components/global/LeafletMap.vue';

// types
import { FormOption } from 'src/types/Form';
import { EventSpaceArea, EventSpaceType } from 'src/enums/eventEnums';

const emit = defineEmits(['submit', 'back']);

const { t } = useI18n();

const registerStore = useRegisterStore();
const { registerFormState } = storeToRefs(registerStore);

const choice = ref<string>('new'); // watch -> get events
const eventFromPast = ref('');

const optionsChoiceEvent: FormOption[] = [
  {
    label: t('register.event.choiceNew'),
    value: 'new',
  },
  {
    label: t('register.event.choiceFromPast'),
    value: 'past',
    disable: true,
  },
];

const optionsSpaceType: FormOption[] = [
  {
    label: t('event.spaceType.none'),
    value: EventSpaceType.NONE,
  },
  {
    label: t('event.spaceType.park'),
    value: EventSpaceType.PARK,
  },
  {
    label: t('event.spaceType.sidewalk'),
    value: EventSpaceType.SIDEWALK,
  },
  {
    label: t('event.spaceType.roadway'),
    value: EventSpaceType.ROAD,
  },
  {
    label: t('event.spaceType.countryard'),
    value: EventSpaceType.YARD,
  },
];

const optionsSpaceArea: FormOption[] = [
  {
    label: t('event.spaceArea.xs'),
    value: EventSpaceArea.XS,
  },
  {
    label: t('event.spaceArea.sm'),
    value: EventSpaceArea.SM,
  },
  {
    label: t('event.spaceArea.md'),
    value: EventSpaceArea.MD,
  },
  {
    label: t('event.spaceArea.lg'),
    value: EventSpaceArea.LG,
  },
  {
    label: t('event.spaceArea.xl'),
    value: EventSpaceArea.XL,
  },
];

const optionsSpaceRent: FormOption[] = [
  {
    label: t('event.spaceRent.yes'),
    value: true,
  },
  {
    label: t('event.spaceRent.no'),
    value: false,
  },
];

const setCoords = (latitude: number, longitude: number) => {
  registerFormState.value.eventDetails.gps.latitude = latitude;
  registerFormState.value.eventDetails.gps.longitude = longitude;
};

// TODO get events from past
const eventsFromPast = [];

const onSubmit = (): void => {
  emit('submit');
};

const onReset = (): void => {
  emit('back');
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
}
</style>
