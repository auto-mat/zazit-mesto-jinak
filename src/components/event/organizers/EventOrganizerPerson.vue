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
/**
 * EventOrganizerPerson component
 *
 * The `EventOrganizerPerson` component is used to display the event organizer person.
 *
 * @description * Use this component to display the event organizer person.
 *
 * @props
 * - `organizer` (EventOrganizer, required): The event organizer.
 *   It should be of type `EventOrganizer`.
 *
 * @example
 * <event-organizer-person :organizer="organizer" />
 */

// libraries
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import EventOrganizerRow from './EventOrganizerRow.vue';

// types
import { EventOrganizer } from 'src/types/Event';

const { t } = useI18n();

defineProps({
  organizer: {
    type: Object as PropType<EventOrganizer>,
    required: true,
  },
});
</script>
