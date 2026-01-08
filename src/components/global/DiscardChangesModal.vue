<template>
  <q-dialog v-model="discardChangesModal">
    <q-card class="q-pa-md text-center">
      <q-card-section>
        <div class="text-h6">{{ t('discardChanges.title') }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">{{ t('discardChanges.description') }}</div>
      </q-card-section>
      <q-card-actions class="row justify-between q-mt-sm actions">
        <q-btn
          rounded
          unelevated
          outline
          color="primary"
          :label="t('discardChanges.buttonCancel')"
          @click="$emit('cancel')"
        />
        <q-btn
          rounded
          unelevated
          outline
          color="primary"
          :label="t('discardChanges.buttonDiscard')"
          @click="$emit('discardChanges')"
        />
        <q-btn
          rounded
          unelevated
          color="primary"
          :label="t('discardChanges.buttonSave')"
          :loading="isSaving"
          @click="$emit('save')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
/**
 * DiscardChangesModal component
 *
 * The `DiscardChangesModal` component is used to display a discard changes modal.
 *
 * @description * Use this component to display a discard changes modal.
 *
 * @props
 * - `isSaving` (boolean, default: false): Whether the saving is in progress.
 *
 * @events
 * - `discardChanges`: Emitted when the discard changes button is clicked.
 * - `save`: Emitted when the save button is clicked.
 * - `cancel`: Emitted when the cancel button is clicked.
 *
 * @example
 * <discard-changes-modal @discard-changes="onDiscardChanges" @save="onSave" @cancel="onCancel" />
 */

// libraries
import { useI18n } from 'vue-i18n';

defineProps({
  isSaving: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['discardChanges', 'save', 'cancel']);

const discardChangesModal = defineModel<boolean>('discardChangesModal');

const { t } = useI18n();
</script>

<style scoped lang="scss">
.actions {
  gap: 8px;

  :deep(.q-btn--rectangle) {
    padding: 4px 16px;
  }
}
</style>
