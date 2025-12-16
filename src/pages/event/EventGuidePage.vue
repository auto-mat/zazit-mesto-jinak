<template>
  <q-page class="column q-pa-xl">
    <div class="q-mb-xl">
      <span>{{ eventName }}</span>
      <h1>{{ t('event.titleStatus') }}</h1>
    </div>
    <div class="row items-center q-gutter-lg">
      <guide-card
        :title="t('event.guide.agreement.title')"
        :totalSteps="guideStore.agreementStepsCount"
        :doneSteps="agreementStep"
        @click="showAgreementGuideModal = true"
      />
      <guide-card
        :title="t('event.guide.invoice.title')"
        :totalSteps="guideStore.invoiceStepsCount"
        :doneSteps="invoiceStep"
        @click="showInvoiceGuideModal = true"
      />
      <guide-card
        :title="t('event.guide.meeting.title')"
        :totalSteps="guideStore.meetingStepsCount"
        :doneSteps="meetingStep"
        :disabled="true"
      />
      <guide-card
        :title="t('event.guide.contentWeb.title')"
        :totalSteps="guideStore.contentWebStepsCount"
        :doneSteps="contentWebStep"
        @click="showContentWebGuideModal = true"
      />
    </div>
    <div class="row q-gutter-lg q-mt-xl">
      <h2>{{ t('event.guide.checklist.title') }}</h2>
      <div class="checklist-container">
        <checklist
          :checklist="checklist"
          :editable="false"
          :title="t('event.guide.checklist.titleRecommendedChecklist')"
        />
        <checklist
          :checklist="ownChecklist"
          :editable="true"
          @edit="showEditChecklistModal = true"
          :title="t('event.guide.checklist.titleOwnChecklist')"
        />
      </div>
    </div>
    <agreement-guide-modal v-model="showAgreementGuideModal" />
    <invoice-guide-modal v-model="showInvoiceGuideModal" />
    <content-web-guide-modal v-model="showContentWebGuideModal" />
    <edit-checklist-modal
      v-model="showEditChecklistModal"
      :checklist="ownChecklist"
      @save="saveChecklist"
      @close="showEditChecklistModal = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import AgreementGuideModal from 'src/components/event/guide/AgreementGuideModal.vue';
import InvoiceGuideModal from 'src/components/event/guide/InvoiceGuideModal.vue';
import ContentWebGuideModal from 'src/components/event/guide/ContentWebGuideModal.vue';
import GuideCard from 'src/components/event/guide/GuideCard.vue';
import { useI18n } from 'vue-i18n';
import { useGuideStore } from 'src/stores/guide';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEventStore } from 'src/stores/event';
// eslint-disable-next-line no-unused-vars
import Checklist from 'src/components/event/guide/Checklist.vue';
import EditChecklistModal from 'src/components/event/guide/EditChecklistModal.vue';
import { ChecklistItem } from 'src/types/Event';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);
const eventStore = useEventStore();

const eventName = computed(() => eventStore.getEventName(slug.value));

const guideStore = useGuideStore();
const {
  agreementStep,
  invoiceStep,
  meetingStep,
  contentWebStep,
  checklist,
  ownChecklist,
} = storeToRefs(guideStore);

const showAgreementGuideModal = ref(false);
const showInvoiceGuideModal = ref(false);
const showContentWebGuideModal = ref(false);
const showEditChecklistModal = ref(false);

const saveChecklist = (checklist: ChecklistItem[]) => {
  ownChecklist.value = checklist;
  showEditChecklistModal.value = false;
};
</script>

<style scoped lang="scss">
.checklist-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}
</style>
