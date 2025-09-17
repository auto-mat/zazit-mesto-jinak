<template>
  <div class="q-pt-md">
    <div class="q-mb-xl">
      <event-information-row 
        :label="$t('event.information.labelName')" 
        :data="eventInformation.name" 
      />
      <event-information-row 
        :label="$t('event.information.labelDate')" 
        :data="eventInformation.date" 
      />
      <event-information-row 
        :label="$t('event.information.labelAddress')" 
        :data="eventInformation.address" 
      />
      <event-information-row 
        :label="$t('event.information.labelMunicipalDistrict')" 
        :data="eventInformation.municipalDistrict" 
      />
      <event-information-row 
        :label="$t('event.information.labelLocation')"
      >
        <!-- TODO fix map -->
        <!-- <leaflet-map 
          class="map q-mt-sm" 
          :latitude="eventInformation.coordinates.latitude" 
          :longitude="eventInformation.coordinates.longitude"
          marker
        /> -->
      </event-information-row>
      <event-information-row 
        :label="$t('event.information.labelSpaceType')" 
        :data="eventInformation.spaceType" 
      />
      <event-information-row 
        :label="$t('event.information.labelSpaceArea')" 
        :data="eventInformation.spaceArea" 
      />
    </div>
  
    <event-tier-card 
      :event-type="eventInformation.eventType" 
      :event-type-description="eventInformation.eventTypeDescription"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { EventInformationType } from 'src/types/Event';

import EventInformationRow from './EventInformationRow.vue';
import LeafletMap from 'src/components/global/LeafletMap.vue';
import EventTierCard from './EventTierCard.vue';


defineProps({
  eventInformation: {
    type: Object as PropType<EventInformationType>,
    required: true
  }
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
}
</style>