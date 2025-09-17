<script lang="ts">
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
import { defineComponent, PropType, reactive } from 'vue';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldDateInput from '../global/FormFieldDateInput.vue';
import LeafletMap from 'src/components/global/LeafletMap.vue';

// types
import { EventInformationType, EventInformationFormType } from 'src/types/Event';



export default defineComponent({
  name: 'FormEventInformation',
  components: {
    FormFieldText,
    FormFieldDateInput,
    LeafletMap
  },
  props: {
    eventInformation: {
      type: Object as PropType<EventInformationType>,
      required: true
    }
  },
  emits: [
    'save'
  ],
  setup(props, { emit }) {
    const formEventInformation: EventInformationFormType = reactive({
      name: props.eventInformation.name,
      date: props.eventInformation.date,
      address: props.eventInformation.address,
      municipalDistrict: props.eventInformation.municipalDistrict,
      coordinates: props.eventInformation.coordinates,
    });

    const setCoords = (latitude: number, longitude: number) => {
      formEventInformation.coordinates.latitude = latitude;
      formEventInformation.coordinates.longitude = longitude;
    }

    const onSubmit = (): void => {
      // noop
      emit('save')
    };

    const onReset = (): void => {
      // noop
    };

    return {
      formEventInformation,
      setCoords,
      onReset,
      onSubmit,
    };
  },
});
</script>

<template>
  <div>
    <!-- Form: event program item -->
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
        {{ $t('event.information.titleEditInformation') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-lg">
          <!-- Input: event name -->
          <form-field-text
            v-model="formEventInformation.name"
            :label="$t('event.information.labelName')"
            name="event-name"
            class="col-12 col-sm-6"
          />
          <!-- Input: event date -->
          <form-field-date-input
            v-model="formEventInformation.date"
            :label="$t('event.information.labelDate')"
            class="col-12 col-sm-6"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-lg">
          <!-- Input: event name -->
          <form-field-text
            v-model="formEventInformation.address"
            :label="$t('event.information.labelAddress')"
            name="event-name"
            class="col-12 col-sm-6"
          />
          <!-- Input: event date --><div class="row q-col-gutter-md q-mb-lg"></div>
          <form-field-text
            v-model="formEventInformation.municipalDistrict"
            :label="$t('event.information.labelMunicipalDistrict')"
            name="event-name"
            class="col-12 col-sm-6"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-lg">
          <label class="text-caption text-bold">
            {{ $t('event.information.labelLocation') }}
          </label>
          <!-- TODO fix map -->
          <!-- <leaflet-map
            class="map q-mt-sm q-ml-md" 
            :latitude="formEventInformation.coordinates.latitude"
            :longitude="formEventInformation.coordinates.longitude"
            marker
            editable
            @set-coords="setCoords"
          /> -->
        </div>
      </div>
        <!-- Button: submit -->
        <div class="flex justify-end q-mt-lg">
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('event.program.buttonSave')"
          />
        </div>
    </q-form>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 300px;
}
</style>