<template>
  <div class="file-uploader">
    <div>{{ t('event.guide.agreement.step3.uploadTitle') }}</div>
    <q-file
      dense
      outlined
      clearable
      v-model="model"
      accept=".pdf"
      :max-file-size="maxFileSize"
      class="q-mt-sm"
      id="form-image"
      @rejected="onRejected"
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
/**
 * FileUploader component
 *
 * The `FileUploader` component is used to upload the event PDF file.
 *
 * @description * Use this component to upload the event PDF file.
 *
 * @props
 * - `modelValue` (File | null, required): The file object representing the uploaded file.
 *   It should be of type `File | null`.
 *
 * @events
 * - `uploadFile`: Emitted when the file is uploaded.
 *
 * @example
 * <file-uploader @uploadFile="uploadFile" />
 */

// libraries
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Notify } from 'quasar';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const emit = defineEmits(['uploadFile']);

const { t } = useI18n();

const model = ref<File | null>(null);

const maxFileSize = computed(
  () => zazitMestoJinakConfig.documentMaxFileUploadSizeMegabytes * 1024,
);

const uploadFile = (): void => {
  emit('uploadFile', model.value);
};

const onRejected = (): void => {
  Notify.create({
    message: t('form.messageMaxFileUploadSize'),
    color: 'negative',
  });
};
</script>

<style scoped lang="scss">
.file-uploader {
  height: 100%;
  width: 100%;
}
</style>
