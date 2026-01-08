<template>
  <div class="q-pt-md q-pb-xl">
    <form-event-information @save="onSave" />
    <q-separator spaced="xl" />
    <h2 class="text-body1 text-weight-bold">
      {{ t('event.information.titleOtherInformation') }}
    </h2>
    <span class="text-caption">
      {{ t('event.information.subtitleOtherInformation') }}
    </span>
    <div class="row q-mt-md">
      <event-information-row-dense
        :label="t('event.information.labelSpaceType')"
        :data="getLocalizedSpaceType(eventInformation.spaceType)"
        class="col-12 col-sm-4"
      />
      <event-information-row-dense
        :label="t('event.information.labelSpaceArea')"
        :data="getLocalizedSpaceArea(eventInformation.spaceArea)"
        class="col-12 col-sm-4"
      />
      <event-information-row-dense
        :label="t('event.information.labelSpaceRent')"
        :data="getLocalizedSpaceRent(eventInformation.spaceRent)"
        class="col-12 col-sm-4"
      />
    </div>
    <div class="row q-mt-md">
      <event-information-row-dense
        :label="t('event.information.labelActivities')"
        :data="eventInformation.activities"
        class="col-12"
      />
    </div>
    <div class="flex justify-center q-mt-lg">
      <q-btn
        rounded
        unelevated
        outline
        color="primary"
        icon="mail"
        :label="t('event.information.buttonAskForChange')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventInformationEditor component
 *
 * The `EventInformationEditor` component is used to display the event information editor.
 *
 * @description * Use this component to display the event information editor.
 *
 * @events
 * - `save`: Emitted when the event information is saved.
 *
 * @example
 * <event-information-editor @save="onSave" />
 */

// libraries
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// stores
import { useEventInformationStore } from 'src/stores/event/information';

// components
import FormEventInformation from 'src/components/form/event/FormEventInformation.vue';
import EventInformationRowDense from './EventInformationRowDense.vue';

// utils
import {
  getLocalizedSpaceType,
  getLocalizedSpaceArea,
  getLocalizedSpaceRent,
} from 'src/utils';

const emit = defineEmits(['save']);

const { t } = useI18n();

const eventInformationStore = useEventInformationStore();
const { eventInformation } = storeToRefs(eventInformationStore);

const onSave = (): void => {
  emit('save');
};
</script>
