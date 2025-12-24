<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="isLoading" />
    <template v-else>
      <div class="q-mb-xl">
        <span>{{ eventName }}</span>
        <h1>{{ t('event.titleStatus') }}</h1>
      </div>
      <div class="row items-center q-gutter-lg">
        <guide-card
          :title="t('event.guide.agreement.title')"
          :totalSteps="eventGuideStore.agreementStepsCount"
          :doneSteps="agreementStep"
          :disabled="!agreementStatus"
          @click="showAgreementGuideModal = true"
        />
        <guide-card
          :title="t('event.guide.invoice.title')"
          :totalSteps="eventGuideStore.invoiceStepsCount"
          :doneSteps="invoiceStep"
          :disabled="!invoiceStatus"
          @click="showInvoiceGuideModal = true"
        />
        <guide-card
          :title="t('event.guide.meeting.title')"
          :totalSteps="eventGuideStore.meetingStepsCount"
          :doneSteps="meetingStep"
          :disabled="true"
        />
        <guide-card
          :title="t('event.guide.contentWeb.title')"
          :totalSteps="eventGuideStore.contentWebStepsCount"
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
    </template>
  </q-page>
</template>

<script setup lang="ts">
/**
 * Event guide page
 * Displays the event guide page with the guide cards and the checklist
 */

// libraries
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

// stores
import { useEventStore } from 'src/stores/event';
import { useEventGuideStore } from 'src/stores/event/guide';

// components
import Spinner from 'src/components/global/Spinner.vue';
import AgreementGuideModal from 'src/components/event/guide/AgreementGuideModal.vue';
import InvoiceGuideModal from 'src/components/event/guide/InvoiceGuideModal.vue';
import ContentWebGuideModal from 'src/components/event/guide/ContentWebGuideModal.vue';
import GuideCard from 'src/components/event/guide/GuideCard.vue';
// eslint-disable-next-line no-unused-vars
import Checklist from 'src/components/event/guide/Checklist.vue';
import EditChecklistModal from 'src/components/event/guide/EditChecklistModal.vue';

// types
import { ChecklistItem } from 'src/types/Event';

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);
const eventStore = useEventStore();

const eventName = computed(() => eventStore.getEventName(slug.value));

const eventGuideStore = useEventGuideStore();
const {
  agreementStep,
  agreementStatus,
  invoiceStep,
  invoiceStatus,
  meetingStep,
  contentWebStep,
  ownChecklist,
  checklist,
  isLoading,
} = storeToRefs(eventGuideStore);

const showAgreementGuideModal = ref(false);
const showInvoiceGuideModal = ref(false);
const showContentWebGuideModal = ref(false);
const showEditChecklistModal = ref(false);

const saveChecklist = async (checklist: ChecklistItem[]): Promise<void> => {
  const success = await eventGuideStore.updateEventChecklist(checklist);
  if (success) {
    showEditChecklistModal.value = false;
  }
};

// Watch the slug to set the event slug in the store - get new data
watch(
  slug,
  () => {
    eventStore.setSlug(slug.value);
  },
  { immediate: true },
);
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
