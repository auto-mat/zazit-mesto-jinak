<template>
  <q-dialog v-model="deleteModal">
    <q-card class="q-pa-md text-center">
      <q-card-section>
        <div class="text-h6">{{ t('deleteModal.title') }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">{{ t('deleteModal.description') }}</div>
      </q-card-section>
      <q-card-actions class="row justify-between q-mt-sm actions">
        <q-btn
          rounded
          unelevated
          outline
          color="primary"
          :label="t('deleteModal.buttonCancel')"
          @click="$emit('cancel')"
        />
        <q-btn
          rounded
          unelevated
          color="primary"
          :label="t('deleteModal.buttonConfirm')"
          :loading="isSaving"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps({
  isSaving: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['confirm', 'cancel']);

const deleteModal = defineModel<boolean>('deleteModal');

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
