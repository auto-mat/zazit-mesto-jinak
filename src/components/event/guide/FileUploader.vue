<template>
  <div class="file-uploader">
    <div>{{ t('event.guide.agreement.step3.uploadTitle') }}</div>
    <q-file
      dense
      outlined
      clearable
      v-model="model"
      accept=".pdf"
      class="q-mt-sm"
      id="form-image"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <div class="q-mt-sm row justify-end">
      <q-btn
        rounded
        unelevated
        color="primary"
        :label="t('event.guide.agreement.step3.uploadButton')"
        :disable="!model"
        @click="uploadFile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['uploadFile']);

const { t } = useI18n();

const model = ref<File | null>(null);

const uploadFile = (): void => {
  emit('uploadFile', model.value);
};
</script>

<style scoped lang="scss">
.file-uploader {
  height: 100%;
  width: 100%;
}
</style>
