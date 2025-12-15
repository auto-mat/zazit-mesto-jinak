<template>
  <div>
    <!-- table: editable -->
    <div class="q-mb-xl">
      <h2 class="q-mt-0 q-mb-md text-body1 text-weight-bold">
        {{ t('event.program.titleExistingProgramItems') }}
      </h2>

      <div class="table-wrapper">
        <event-program-table
          :rows="eventProgram"
          editable
          @edit="editProgramItem"
          @delete="deleteProgramItem"
        />
      </div>
    </div>

    <!-- form: program item -->
    <form-event-program-item :event-program-item="programItem" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import EventProgramTable from './EventProgramTable.vue';
import FormEventProgramItem from 'src/components/form/event/FormEventProgramItem.vue';
import { EventProgramItem, EventProgram } from 'src/types/Event';
import { useEventStore } from 'src/stores/event';
import { useI18n } from 'vue-i18n';

defineProps({
  eventProgram: {
    type: Array as PropType<EventProgram>,
    required: true,
  },
});

const eventStore = useEventStore();
const { t } = useI18n();

const programItem = ref<EventProgramItem>({
  title: '',
  description: '',
  timeFrom: '',
  timeTo: '',
  categories: [],
});

const editProgramItem = (item: EventProgramItem) => {
  programItem.value = item;
};

const deleteProgramItem = (item: EventProgramItem) => {
  eventStore.deleteProgramItem(item);
};
</script>

<style scoped lang="scss">
.table-wrapper {
  height: 370px;
}
</style>
