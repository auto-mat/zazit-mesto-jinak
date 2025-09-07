<template>
  <div class="row q-col-gutter-md">
    <event-organizer-row 
      :label="$t('event.organizers.labelCompanyTitle')" 
      :data="company.title" 
      class="col-12 col-sm-6"
    />
    <event-organizer-row 
      :label="$t('event.organizers.labelBusinessType')" 
      :data="company.businessType" 
      class="col-12 col-sm-6"
    />
    <event-organizer-row 
      :label="$t('event.organizers.labelIco')" 
      :data="company.ico" 
      class="col-12 col-sm-6"
    />
    <event-organizer-row 
      :label="$t('event.organizers.labelDic')" 
      :data="company.dic" 
      class="col-12 col-sm-6"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import EventOrganizerRow from './EventOrganizerRow.vue';
import { EventOrganizerCompanyType } from 'src/types/Event';

defineProps({
  company: {
    type: Object as PropType<EventOrganizerCompanyType>,
    required: true
  }
})
</script>