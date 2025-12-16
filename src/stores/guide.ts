import { defineStore } from 'pinia';
import { ChecklistItem } from 'src/types/Event';
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

    const checklist = ref<ChecklistItem[]>([
      { title: 'Roznést letáčky pro sousedy', completed: false },
      { title: 'Pozvat místní instituce', completed: false },
      { title: 'Domluvit partnerství', completed: false },
      { title: 'Sehnat hlavní hvězdu programu', completed: false },
    ]);

    const ownChecklist = ref<ChecklistItem[]>([]);
    return {
      agreementStep,
      agreementStepsCount,
      invoiceStep,
      invoiceStepsCount,
      meetingStep,
      meetingStepsCount,
      contentWebStep,
      contentWebStepsCount,
      checklist,
      ownChecklist,
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
