<template>
  <q-dialog v-model="checklistModal" @hide="closeModal">
    <div class="q-pa-lg bg-white checklist-modal">
      <div class="row justify-between items-center">
        <span class="text-body1 text-weight-bold">{{
          t('event.guide.checklist.title')
        }}</span>
        <q-btn round flat icon="close" color="primary" @click="emit('close')" />
      </div>
      <div class="column">
        <div
          v-for="(item, index) in editChecklist"
          :key="item.id"
          class="row items-center q-mt-sm"
        >
          <q-btn
            round
            flat
            icon="delete"
            color="primary"
            @click="deleteItem(index)"
          />
          <span class="q-ml-sm">{{ item.name }}</span>
        </div>
        <div class="row items-center q-mt-sm">
          <q-icon name="add" color="primary" size="24px" class="q-mx-sm" />
          <q-input
            outlined
            v-model="newItem"
            :placeholder="t('event.guide.checklist.addItemPlaceholder')"
            dense
            class="add-item-input q-mr-sm"
          />
          <q-btn
            rounded
            unelevated
            color="primary"
            :label="t('event.guide.checklist.addItem')"
            :disable="newItem.length === 0"
            @click="addItem"
          />
        </div>
      </div>
      <div class="row justify-end q-mt-lg q-gutter-sm">
        <q-btn
          color="primary"
          rounded
          outline
          :label="t('event.guide.checklist.cancel')"
          @click="closeModal"
        />
        <q-btn
          color="primary"
          rounded
          unelevated
          :label="t('event.guide.checklist.save')"
          @click="saveChecklist"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
/**
 * EditChecklistModal component
 *
 * The `EditChecklistModal` component is used to edit the checklist for an event.
 *
 * @description * Use this component to edit the checklist for an event.
 *
 * @props
 * - `checklist` (array, required): The checklist items.
 *
 * @events
 * - `close`: Emitted when the modal is closed.
 * - `save`: Emitted when the checklist is saved.
 *
 * @example
 * <edit-checklist-modal v-model="showEditChecklistModal" :checklist="checklist" @save="saveChecklist" @close="showEditChecklistModal = false" />
 */

// libraries
import { PropType, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { cloneDeep } from 'lodash';

// types
import { ChecklistItem } from 'src/types/Event';

const checklistModal = defineModel<boolean>('checklistModal');

const props = defineProps({
  checklist: {
    type: Array as PropType<ChecklistItem[]>,
    required: true,
  },
});

const emit = defineEmits(['close', 'save']);

watch(props.checklist, (newChecklist) => {
  editChecklist.value = cloneDeep(newChecklist);
});

const { t } = useI18n();

const editChecklist = ref<ChecklistItem[]>(cloneDeep(props.checklist));
const newItem = ref<string>('');

const addItem = (): void => {
  editChecklist.value.push({ id: null, name: newItem.value, checked: false });
  newItem.value = '';
};

const deleteItem = (index: number): void => {
  editChecklist.value.splice(index, 1);
};

const saveChecklist = () => {
  emit('save', editChecklist.value);
};

const closeModal = () => {
  editChecklist.value = cloneDeep(props.checklist);
  newItem.value = '';
  emit('close');
};
</script>

<style scoped lang="scss">
.checklist-modal {
  width: 100%;
  max-width: 500px;
}

.add-item-input {
  flex: 1;
}
</style>
