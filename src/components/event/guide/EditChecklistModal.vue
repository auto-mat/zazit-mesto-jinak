<template>
  <q-dialog v-model="checklistModal">
    <div class="q-pa-lg bg-white">
      <div class="row justify-between items-center">
        <span class="text-body1 text-weight-bold">{{
          t('event.guide.checklist.title')
        }}</span>
        <q-btn round flat icon="close" color="primary" @click="emit('close')" />
      </div>
      <div class="column">
        <div
          v-for="item in editChecklist"
          :key="item.title"
          class="row items-center q-mt-sm"
        >
          <q-btn
            round
            flat
            icon="delete"
            color="primary"
            @click="deleteItem(item)"
          />
          <span class="q-ml-sm">{{ item.title }}</span>
        </div>
        <div class="row items-center q-mt-sm">
          <q-btn round flat icon="add" color="primary" @click="addItem" />
          <q-input
            outlined
            v-model="newItem"
            :placeholder="t('event.guide.checklist.addItemPlaceholder')"
            dense
          />
        </div>
      </div>
      <div class="row justify-end q-mt-lg q-gutter-sm">
        <q-btn
          color="primary"
          rounded
          outline
          :label="t('event.guide.checklist.cancel')"
          @click="emit('close')"
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
import { ChecklistItem } from 'src/types/Event';
import { PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { cloneDeep } from 'lodash';

const checklistModal = defineModel<boolean>('checklistModal');

const props = defineProps({
  checklist: {
    type: Array as PropType<ChecklistItem[]>,
    required: true,
  },
});

const emit = defineEmits(['close', 'save']);

const { t } = useI18n();

const editChecklist = ref<ChecklistItem[]>(cloneDeep(props.checklist));
const newItem = ref<string>('');

const addItem = () => {
  editChecklist.value.push({ title: newItem.value, completed: false });
  newItem.value = '';
};

const deleteItem = (item: ChecklistItem) => {
  editChecklist.value = editChecklist.value.filter(
    (i) => i.title !== item.title,
  );
};

const saveChecklist = () => {
  emit('save', editChecklist.value);
};
</script>
