<template>
  <div class="q-pt-md q-pb-xl">
    <form-event-information :event-information />
    <q-separator spaced="xl"/>
    <h2 class="text-body1 text-weight-bold">
      {{ $t('event.information.titleOtherInformation') }}
    </h2>
    <span class="text-caption">
      {{ $t('event.information.subtitleOtherInformation') }}
    </span>
    <div class="row q-mt-md">
      <event-information-row-dense 
        :label="$t('event.information.labelSpaceType')" 
        :data="eventInformation.spaceType" 
        class="col-12 col-sm-6"
      />
      <event-information-row-dense 
        :label="$t('event.information.labelSpaceArea')" 
        :data="eventInformation.spaceArea" 
        class="col-12 col-sm-6"
      />
    </div>
    <div class="flex justify-center q-mt-lg">
      <q-btn
        rounded
        unelevated
        outline
        color="primary"
        icon="mail"
        :label="$t('event.information.buttonAskForChange')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import FormEventInformation from 'src/components/form/event/FormEventInformation.vue';
import EventInformationRowDense from './EventInformationRowDense.vue';

import { EventInformationType } from 'src/types/Event';

defineProps({
  eventInformation: {
    type: Object as PropType<EventInformationType>,
    required: true
  }
})
</script>