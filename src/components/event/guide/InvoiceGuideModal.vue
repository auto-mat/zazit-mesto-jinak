<template>
  <q-dialog v-model="showInvoiceGuideModal">
    <div
      class="q-pa-md guide-modal"
      :style="{ maxWidth: zazitMestoJinakConfig.containerContentWidth }"
    >
      <div class="row items-center">
        <div class="text-h6">{{ t('event.guide.invoice.title') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
      <q-stepper
        v-model="invoiceStep"
        vertical
        flat
        color="primary"
        active-icon="none"
        done-icon="check"
        class="guide-stepper"
      >
        <q-step
          :name="1"
          :title="t('event.guide.invoice.step1.title')"
          prefix="1"
          :done="invoiceStep > 1"
        >
          {{ t('event.guide.invoice.step1.description') }}
        </q-step>

        <q-step
          :name="2"
          :title="t('event.guide.invoice.step2.title')"
          prefix="2"
          :done="invoiceStep > 2"
        >
        </q-step>

        <q-step
          :name="3"
          :title="t('event.guide.invoice.step3.title')"
          prefix="3"
          :done="invoiceStep > 3"
        >
          {{ t('event.guide.invoice.step3.description') }}
          <div
            v-if="invoiceStatus === EventInvoiceStatus.REMINDED"
            class="text-orange text-bold q-mt-sm"
          >
            {{ t('event.guide.invoice.step3.remindedDescription') }}
          </div>
          <div
            v-if="invoiceStatus === EventInvoiceStatus.OVERDUE"
            class="text-red text-bold q-mt-sm"
          >
            {{ t('event.guide.invoice.step3.overdueDescription') }}
          </div>

          <div class="files-container q-mt-md">
            <file-downloader
              :pdf-url="invoicePdfUrl"
              :text="t('event.guide.invoice.step3.downloadTitle')"
            />
          </div>
        </q-step>

        <q-step
          :name="4"
          :title="t('event.guide.invoice.step4.title')"
          prefix="4"
          done-icon="check"
          done-color="green"
          :done="invoiceStep > 4"
        >
          {{ t('event.guide.invoice.step4.description') }}
        </q-step>
      </q-stepper>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import FileDownloader from './FileDowloader.vue';
import { useEventGuideStore } from 'src/stores/event/guide';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { EventInvoiceStatus } from 'src/enums/eventEnums';

const showInvoiceGuideModal = defineModel<boolean>('showInvoiceGuideModal');

const { t } = useI18n();

const eventGuideStore = useEventGuideStore();
const { invoiceStep, invoicePdfUrl, invoiceStatus } =
  storeToRefs(eventGuideStore);
</script>

<style scoped lang="scss">
.guide-modal {
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
