<template>
  <div class="row q-col-gutter-md">
    <event-organizer-row
      :label="t('event.organizers.labelName')"
      :data="organizer.name"
      class="col-12 col-sm-6"
    />
    <event-organizer-row
      :label="t('event.organizers.labelSurname')"
      :data="organizer.surname"
      class="col-12 col-sm-6"
    />
    <event-organizer-row
      :label="t('event.organizers.labelEmail')"
      :data="organizer.email"
      class="col-12 col-sm-6"
    />
    <event-organizer-row
      :label="t('event.organizers.labelPhone')"
      :data="organizer.phone"
      class="col-12 col-sm-6"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import EventOrganizerRow from './EventOrganizerRow.vue';
import { EventOrganizer } from 'src/types/Event';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  organizer: {
    type: Object as PropType<EventOrganizer>,
    required: true,
  },
});
</script>
