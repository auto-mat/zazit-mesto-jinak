<template>
  <div class="q-pt-md">
    <div class="q-mb-xl">
      <event-information-row
        :label="t('event.information.labelName')"
        :data="eventInformation.name"
      />
      <event-information-row
        :label="t('event.information.labelDate')"
        :data="eventInformation.date"
      />
      <event-information-row
        :label="t('event.information.labelMunicipalDistrict')"
        :data="eventInformation.place"
      />
      <event-information-row :label="t('event.information.labelLocation')">
        <leaflet-map
          class="map q-mt-sm"
          :latitude="eventInformation.coordinates.latitude"
          :longitude="eventInformation.coordinates.longitude"
          marker
        />
      </event-information-row>
      <event-information-row
        :label="t('event.information.labelSpaceType')"
        :data="getLocalizedSpaceType(eventInformation.spaceType)"
      />
      <event-information-row
        :label="t('event.information.labelSpaceArea')"
        :data="getLocalizedSpaceArea(eventInformation.spaceArea)"
      />
      <event-information-row
        :label="t('event.information.labelSpaceRent')"
        :data="getLocalizedSpaceRent(eventInformation.spaceRent)"
      />
      <event-information-row
        :label="t('event.information.labelActivities')"
        :data="eventInformation.activities"
      />
    </div>

    <event-tier-card />
  </div>
</template>

<script setup lang="ts">
// libraries
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

// types
import { EventInformation } from 'src/types/Event';

// utils
import {
  getLocalizedSpaceType,
  getLocalizedSpaceArea,
  getLocalizedSpaceRent,
} from 'src/utils';

// components
import EventInformationRow from './EventInformationRow.vue';
import LeafletMap from 'src/components/global/LeafletMap.vue';
import EventTierCard from './EventTierCard.vue';

defineProps({
  eventInformation: {
    type: Object as PropType<EventInformation>,
    required: true,
  },
});

const { t } = useI18n();
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
}
</style>
