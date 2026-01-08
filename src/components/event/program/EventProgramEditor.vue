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
    <form-event-program-item @save="onSave" @reset="onReset" />
    <delete-modal
      v-model="deleteModal"
      :is-saving="isEventProgramSaving"
      @confirm="onDelete"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup lang="ts">
// libraries
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { scroll } from 'quasar';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import EventProgramTable from './EventProgramTable.vue';
import FormEventProgramItem from 'src/components/form/event/FormEventProgramItem.vue';
// eslint-disable-next-line no-unused-vars
import DeleteModal from 'src/components/global/DeleteModal.vue';

// types
import { EventProgramItem } from 'src/types/Event';

// stores
import { useEventProgramStore } from 'src/stores/event/program';
import { useEventStore } from 'src/stores/event';

const router = useRouter();

const { t } = useI18n();
const eventStore = useEventStore();
const eventProgramStore = useEventProgramStore();
const { eventProgram, isEventProgramSaving, selectedEventProgramItem } =
  storeToRefs(eventProgramStore);

const deleteModal = ref(false);

const editProgramItem = (item: EventProgramItem): void => {
  eventProgramStore.selectEventProgramItem(item);
};

const deletedProgramItem = ref<EventProgramItem | null>(null);
const deleteProgramItem = async (item: EventProgramItem): Promise<void> => {
  deletedProgramItem.value = item;
  deleteModal.value = true;
};

const onDelete = async (): Promise<void> => {
  await eventProgramStore.deleteProgramItem(deletedProgramItem.value);
  deleteModal.value = false;
};

const onCancel = (): void => {
  deleteModal.value = false;
};

const { setVerticalScrollPosition } = scroll;

const onSave = async (): Promise<void> => {
  await eventProgramStore.addOrUpdateProgramItem();
  setVerticalScrollPosition(window, 0, 300);
};

const onReset = (): void => {
  if (selectedEventProgramItem.value) {
    eventProgramStore.selectEventProgramItem(null);
  } else {
    router.push({
      name: routesConf['event_program']['children']['name'],
      params: { slug: eventStore.slug as string },
    });
  }
};
</script>

<style scoped lang="scss">
.table-wrapper {
  height: 370px;
}
</style>
