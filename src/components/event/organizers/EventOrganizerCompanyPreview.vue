<template>
  <div class="row q-col-gutter-md">
    <event-organizer-row
      :label="t('event.organizers.labelCompanyTitle')"
      :data="company.title"
      class="col-12 col-sm-6"
    />
    <event-organizer-row
      :label="t('event.organizers.labelBusinessType')"
      :data="company.businessTypeName"
      class="col-12 col-sm-6"
    />
    <event-organizer-row
      :label="t('event.organizers.labelIco')"
      :data="company.ico"
      class="col-12 col-sm-6"
    />
    <event-organizer-row
      :label="t('event.organizers.labelDic')"
      :data="company.dic"
      class="col-12 col-sm-6"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import EventOrganizerRow from './EventOrganizerRow.vue';
import { EventOrganizerCompany } from 'src/types/Event';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  company: {
    type: Object as PropType<EventOrganizerCompany>,
    required: true,
  },
});
</script>
