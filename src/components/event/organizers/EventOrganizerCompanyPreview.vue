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
/**
 * EventOrganizerCompanyPreview component
 *
 * The `EventOrganizerCompanyPreview` component is used to display the event organizer company preview.
 *
 * @description * Use this component to display the event organizer company preview.
 *
 * @props
 * - `company` (EventOrganizerCompany, required): The event organizer company.
 *   It should be of type `EventOrganizerCompany`.
 *
 * @example
 * <event-organizer-company-preview :company="company" />
 */

// libraries
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import EventOrganizerRow from './EventOrganizerRow.vue';

// types
import { EventOrganizerCompany } from 'src/types/Event';

const { t } = useI18n();

defineProps({
  company: {
    type: Object as PropType<EventOrganizerCompany>,
    required: true,
  },
});
</script>
