<template>
  <q-dialog v-model="showAgreementGuideModal">
    <div
      class="q-pa-md agreement-guide-modal"
      :style="{ maxWidth: zazitMestoJinakConfig.containerContentWidth }"
    >
      <div class="row items-center">
        <div class="text-h6">{{ t('event.guide.agreement.title') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
      <q-stepper
        :model-value="agreementStep"
        vertical
        flat
        color="primary"
        active-icon="none"
        done-icon="check"
        class="guide-stepper"
      >
        <q-step
          :name="1"
          :title="t('event.guide.agreement.step1.title')"
          prefix="1"
          :done="agreementStep > 1"
        >
          {{ t('event.guide.agreement.step1.description') }}
        </q-step>

        <q-step
          :name="2"
          :title="t('event.guide.agreement.step2.title')"
          prefix="2"
          :done="agreementStep > 2"
        >
        </q-step>

        <q-step
          :name="3"
          :title="t('event.guide.agreement.step3.title')"
          prefix="3"
          :done="agreementStep > 3"
        >
          <template v-if="agreementStatus === EventAgreementStatus.REJECTED">
            {{ t('event.guide.agreement.step3.rejectedDescription') }}
          </template>
          <template v-else>
            {{ t('event.guide.agreement.step3.description') }}
          </template>

          <div class="files-container q-mt-md">
            <file-downloader
              :pdf-url="pdfUrl"
              :text="t('event.guide.agreement.step3.downloadTitle')"
            />
            <file-uploader @uploadFile="uploadFile" />
          </div>
        </q-step>

        <q-step
          :name="4"
          :title="t('event.guide.agreement.step4.title')"
          prefix="4"
          :done="agreementStep > 4"
        >
          {{ t('event.guide.agreement.step4.description') }}
        </q-step>

        <q-step
          :name="5"
          :title="t('event.guide.agreement.step5.title')"
          prefix="5"
          done-icon="check"
          done-color="green"
          :done="agreementStep > 5"
        >
          {{ t('event.guide.agreement.step5.description') }}
          <div class="q-mt-md">
            <file-downloader
              :pdf-url="pdfUrl"
              :text="t('event.guide.agreement.step5.downloadTitle')"
            />
          </div>
        </q-step>
      </q-stepper>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import FileDownloader from './FileDowloader.vue';
import FileUploader from './FileUploader.vue';
import { useEventGuideStore } from 'src/stores/event/guide';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { EventAgreementStatus } from 'src/enums/eventEnums';

const showAgreementGuideModal = defineModel<boolean>('showAgreementGuideModal');

const { t } = useI18n();

const eventGuideStore = useEventGuideStore();
const { agreementStep, agreementStatus, pdfUrl } = storeToRefs(eventGuideStore);

const uploadFile = (pdfFile: File | null): void => {
  if (pdfFile) {
    eventGuideStore.uploadAgreement(pdfFile);
  }
};
</script>

<style scoped lang="scss">
.agreement-guide-modal {
  width: 100%;
  background-color: var(--q-white);
  padding: 30px;
}

.files-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.guide-stepper {
  :deep(.q-stepper__title) {
    font-size: 16px;
  }

  :deep(.q-stepper__tab--active .q-stepper__title) {
    font-weight: 600;
  }
}
</style>
