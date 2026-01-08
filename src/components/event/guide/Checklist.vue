<template>
  <q-card class="q-pa-md checklist-card" flat>
    <q-card-section>
      <div class="row justify-between q-gutter-sm">
        <span class="text-body1 text-weight-bold">{{ title }}</span>
        <q-btn
          v-if="editable"
          rounded
          outline
          color="primary"
          icon="edit"
          :label="t('event.guide.checklist.edit')"
          @click="$emit('edit')"
        />
      </div>
      <div class="column" v-if="checklist.length > 0">
        <q-checkbox
          v-for="item in checklist"
          :key="item.id"
          v-model="item.checked"
          :val="item.name"
          :label="item.name"
          dense
          color="primary"
          class="col-12 col-sm-4 text-grey-10 q-mt-md"
          @update:model-value="toogleEventChecklistItem(item)"
        />
      </div>
      <div class="column q-mt-md" v-else>
        <span v-if="editable" class="text-grey-6">{{
          t('event.guide.checklist.noItemsEditable')
        }}</span>
        <span v-else class="text-grey-6">{{
          t('event.guide.checklist.noItems')
        }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
/**
 * Checklist component
 *
 * The `Checklist` component is used to display the checklist for an event.
 *
 * @description * Use this component to display the checklist for an event.
 *
 * @props
 * - `title` (string, required): The title of the checklist.
 * - `checklist` (array, required): The checklist items.
 * - `editable` (boolean, default: false): Whether the checklist is editable.
 *
 * @events
 * - `edit`: Emitted when the checklist is edited.
 *
 * @example
 * <checklist
 *   :title="t('event.guide.checklist.titleRecommendedChecklist')"
 *   :checklist="checklist"
 *   :editable="false"
 *   @edit="showEditChecklistModal = true"
 * />
 */

// libraries
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

// stores
import { useEventGuideStore } from 'src/stores/event/guide';

// types
import { ChecklistItem } from 'src/types/Event';

defineProps({
  title: {
    type: String,
    required: true,
  },
  checklist: {
    type: Array as PropType<ChecklistItem[]>,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['edit']);

const { t } = useI18n();

const eventGuideStore = useEventGuideStore();
const { toogleEventChecklistItem } = eventGuideStore;
</script>

<style scoped lang="scss">
.checklist-card {
  width: 100%;
  border: 1px solid var(--q-secondary);
}
</style>
