import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGuideStore = defineStore(
  'guide',
  () => {
    const agreementStep = ref(3);
    const agreementStepsCount = 5;

    const invoiceStep = ref(1);
    const invoiceStepsCount = 4;

    const meetingStep = ref(0);
    const meetingStepsCount = 2;

    const contentWebStep = ref(1);
    const contentWebStepsCount = 2;
    return {
      agreementStep,
      agreementStepsCount,
      invoiceStep,
      invoiceStepsCount,
      meetingStep,
      meetingStepsCount,
      contentWebStep,
      contentWebStepsCount,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['step'],
    },
  },
);
