<template>
  <div>
    <!-- Form: event information -->
    <q-form autofocus @submit="onSubmit" class="q-gutter-md text-grey-10">
      <!-- Heading -->
      <h2 class="q-mt-0 q-mb-sm text-body1 text-weight-bold">
        {{ t('event.information.titleEditInformation') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-lg">
          <!-- Input: event name -->
          <form-field-text
            v-model="eventInformationForm.name"
            :label="t('event.information.labelName')"
            required
            name="event-name"
            class="col-12 col-sm-6"
          />
          <!-- Input: event date -->
          <form-field-date-input
            v-model="eventInformationForm.date"
            :label="t('event.information.labelDate')"
            required
            class="col-12 col-sm-6"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-lg">
          <!-- Input: event municipal district -->
          <form-field-text
            v-model="eventInformationForm.place"
            :label="t('event.information.labelMunicipalDistrict')"
            name="event-name"
            class="col-12 col-sm-6"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-lg">
          <label class="text-caption text-bold">
            {{ t('event.information.labelLocation') }}
          </label>
          <leaflet-map
            class="map q-mt-sm q-ml-md"
            :latitude="eventInformationForm.coordinates.latitude"
            :longitude="eventInformationForm.coordinates.longitude"
            marker
            editable
            @set-coords="setCoords"
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
          :label="t('event.program.buttonSave')"
          :loading="isEventInformationSaving"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
/**
 * FormEventInformation Component
 *
 * The `FormEventInformation` is used to gather information about event for Information on web ZMJ.
 *
 * @description * Use this component to display event Information form.
 *
 * @example
 * <form-event-Information />
 *
 */

// libraries
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

// stores
import { useEventStore } from 'src/stores/event';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldDateInput from '../global/FormFieldDateInput.vue';
import LeafletMap from 'src/components/global/LeafletMap.vue';

defineOptions({
  name: 'FormEventInformation',
});

const emit = defineEmits(['save']);

const { t } = useI18n();

const eventStore = useEventStore();
const {
  eventInformationForm,
  isEventInformationFormDirty,
  isEventInformationSaving,
} = storeToRefs(eventStore);

const setCoords = (latitude: number, longitude: number): void => {
  eventInformationForm.value.coordinates.latitude = latitude;
  eventInformationForm.value.coordinates.longitude = longitude;
};

watch(
  eventInformationForm,
  () => {
    isEventInformationFormDirty.value = true;
  },
  { deep: true },
);

const onSubmit = async (): Promise<void> => {
  emit('save');
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
}
</style>
