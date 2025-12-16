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
        v-model="agreementStep"
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
          {{ t('event.guide.agreement.step3.description') }}

          <div class="files-container q-mt-md">
            <file-downloader />
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
          <!-- stazeni smlouvy -->
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
import { useGuideStore } from 'src/stores/guide';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const showAgreementGuideModal = defineModel<boolean>('showAgreementGuideModal');

const { t } = useI18n();

const guideStore = useGuideStore();
const { agreementStep } = storeToRefs(guideStore);

const uploadFile = (): void => {
  agreementStep.value = 4;
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
