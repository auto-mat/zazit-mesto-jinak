<template>
  <div>
    <!-- table: editable -->
    <div class="q-mb-xl">
      <h2 class="q-mt-0 q-mb-md text-body1 text-weight-bold">
        {{ $t('event.program.titleExistingProgramItems') }}
      </h2>

      <event-program-table 
        :rows="eventProgram"
        editable
        @edit="editProgramItem"
      />
    </div>

    <!-- form: program item -->
    <form-event-program-item :event-program-item="programItem"/>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import EventProgramTable from './EventProgramTable.vue';
import FormEventProgramItem from 'src/components/form/event/FormEventProgramItem.vue';
import { EventProgramItemType, EventProgramType } from 'src/types/Event';

defineProps({
  eventProgram: {
    type: Array as PropType<EventProgramType>,
    required: true
  }
})

const programItem = ref<EventProgramItemType>({
  title: '',
  description: '',
  timeFrom: '',
  timeTo: '',
  categories: []
})

const editProgramItem = (item: EventProgramItemType) => {
  programItem.value = item
}
</script>