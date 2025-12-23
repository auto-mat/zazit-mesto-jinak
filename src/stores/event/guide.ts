import { defineStore } from 'pinia';
import { ChecklistItem } from 'src/types/Event';
import { EventAgreementStatus, EventInvoiceStatus } from 'src/enums/eventEnums';
import { computed, ref, watch } from 'vue';
import { useEventStore } from '../event';
import { useApiEventGuide } from 'src/composables/api/event/useApiEventGuide';
import { Notify } from 'quasar';
import { i18n } from 'src/boot/i18n';

export const agreementSteps = {
  [EventAgreementStatus.DRAFT]: 1,
  [EventAgreementStatus.SENT]: 3,
  [EventAgreementStatus.REJECTED]: 3,
  [EventAgreementStatus.SIGNED]: 4,
  [EventAgreementStatus.COMPLETED]: 5,
} as const;

export const invoiceSteps = {
  [EventInvoiceStatus.DRAFT]: 1,
  [EventInvoiceStatus.SENT]: 3,
  [EventInvoiceStatus.REMINDED]: 3,
  [EventInvoiceStatus.OVERDUE]: 3,
  [EventInvoiceStatus.PAID]: 4,
} as const;

export const useEventGuideStore = defineStore(
  'eventGuide',
  () => {
    const eventStore = useEventStore();
    const {
      getEventAgreementApi,
      updateEventAgreementApi,
      getEventInvoiceApi,
      getEventContentPublicApi,
      getEventChecklistApi,
      updateEventChecklistApi,
      updateEventChecklistItemApi,
    } = useApiEventGuide();

    // Agreement
    const agreementStatus = ref<EventAgreementStatus | null>(null);
    const agreementStepsCount = 5;
    const pdfUrl = ref<string | null>(null);

    const agreementStep = computed(() =>
      agreementStatus.value ? agreementSteps[agreementStatus.value] : 0,
    );

    const isEventAgreementLoading = ref(false);

    const loadEventAgreement = async (): Promise<void> => {
      if (!eventStore.slug) {
        return;
      }
      isEventAgreementLoading.value = true;
      const eventAgreement = await getEventAgreementApi(eventStore.slug);
      if (eventAgreement.status) {
        agreementStatus.value = eventAgreement.status;
      }
      if (eventAgreement.pdfUrl || eventAgreement.pdfUrlCompleted) {
        pdfUrl.value = eventAgreement.pdfUrlCompleted || eventAgreement.pdfUrl;
      }
      isEventAgreementLoading.value = false;
    };

    const uploadAgreement = async (pdfFile: File): Promise<void> => {
      if (!eventStore.slug) {
        return;
      }
      const success = await updateEventAgreementApi(eventStore.slug, {
        pdfFile,
      });
      if (success) {
        await loadEventAgreement();
        Notify.create({
          message: i18n.global.t('event.guide.agreement.successUpload'),
          color: 'positive',
        });
      }
    };

    // Invoice
    const invoiceStatus = ref<EventInvoiceStatus | null>(null);
    const invoiceStepsCount = 4;
    const invoicePdfUrl = ref<string | null>(null);

    const invoiceStep = computed(() =>
      invoiceStatus.value ? invoiceSteps[invoiceStatus.value] : 0,
    );

    const isEventInvoiceLoading = ref(false);

    const loadEventInvoice = async (): Promise<void> => {
      if (!eventStore.slug) {
        return;
      }
      isEventInvoiceLoading.value = true;
      const eventInvoice = await getEventInvoiceApi(eventStore.slug);
      if (eventInvoice.status) {
        invoiceStatus.value = eventInvoice.status;
      }
      if (eventInvoice.pdfUrl) {
        invoicePdfUrl.value = eventInvoice.pdfUrl;
      }
      isEventInvoiceLoading.value = false;
    };

    // Meeting TODO
    const meetingStep = ref(0);
    const meetingStepsCount = 2;

    // Content Web
    const contentWebStep = ref(1);
    const contentWebStepsCount = 2;

    const isEventContentPublicLoading = ref(false);

    const loadEventContentPublic = async (): Promise<void> => {
      if (!eventStore.slug) {
        return;
      }
      isEventContentPublicLoading.value = true;
      const eventContentPublic = await getEventContentPublicApi(
        eventStore.slug,
      );
      if (eventContentPublic) {
        contentWebStep.value = 2;
      }
      isEventContentPublicLoading.value = false;
    };

    // Checklist
    const checklist = ref<ChecklistItem[]>([]);
    const ownChecklist = ref<ChecklistItem[]>([]);

    const isEventChecklistLoading = ref(false);

    const loadEventChecklist = async (): Promise<void> => {
      if (!eventStore.slug) {
        return;
      }
      isEventChecklistLoading.value = true;
      const eventChecklist = await getEventChecklistApi(eventStore.slug);
      if (eventChecklist) {
        checklist.value = eventChecklist.predefined;
        ownChecklist.value = eventChecklist.custom;
      }
      isEventChecklistLoading.value = false;
    };

    const isEventChecklistSaving = ref(false);

    const updateEventChecklist = async (
      eventChecklist: ChecklistItem[],
    ): Promise<boolean> => {
      if (isEventChecklistSaving.value || !eventStore.slug) {
        return false;
      }
      isEventChecklistSaving.value = true;
      const success = await updateEventChecklistApi(
        eventStore.slug,
        eventChecklist,
      );
      if (success) {
        await loadEventChecklist();
        isEventChecklistSaving.value = false;
        return true;
      }
      isEventChecklistSaving.value = false;
      return false;
    };

    const toogleEventChecklistItem = async (
      eventChecklistItem: ChecklistItem,
    ): Promise<boolean> => {
      if (!eventStore.slug) {
        return false;
      }
      const success = await updateEventChecklistItemApi(
        eventStore.slug,
        eventChecklistItem,
      );
      if (success) {
        return true;
      }
      return false;
    };

    // Watch change of event
    watch(
      () => eventStore.slug,
      async (newSlug) => {
        if (newSlug) {
          clearEventGuideStore();
          await loadEventAgreement();
          await loadEventInvoice();
          await loadEventContentPublic();
          await loadEventChecklist();
        }
      },
      { immediate: true },
    );

    const clearEventGuideStore = (): void => {
      agreementStatus.value = null;
      pdfUrl.value = null;
      invoiceStatus.value = null;
      invoicePdfUrl.value = null;
      meetingStep.value = 0;
      contentWebStep.value = 1;
      checklist.value = [];
      ownChecklist.value = [];
    };

    const isLoading = computed(
      () =>
        isEventAgreementLoading.value ||
        isEventInvoiceLoading.value ||
        isEventContentPublicLoading.value ||
        isEventChecklistLoading.value,
    );

    return {
      agreementStep,
      agreementStatus,
      pdfUrl,
      agreementStepsCount,
      loadEventAgreement,
      uploadAgreement,
      invoiceStep,
      invoiceStatus,
      invoiceStepsCount,
      invoicePdfUrl,
      loadEventInvoice,
      meetingStep,
      meetingStepsCount,
      contentWebStep,
      contentWebStepsCount,
      checklist,
      ownChecklist,
      updateEventChecklist,
      isEventChecklistSaving,
      toogleEventChecklistItem,
      clearEventGuideStore,
      isLoading,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: [
        'agreementStep',
        'invoiceStep',
        'meetingStep',
        'contentWebStep',
        'checklist',
        'ownChecklist',
      ],
    },
  },
);
