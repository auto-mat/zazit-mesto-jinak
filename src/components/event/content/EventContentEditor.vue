<template>
  <div class="q-pt-md q-pb-xl">
    <form-event-content :event-content @save="$emit('save')" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import FormEventContent from 'src/components/form/event/FormEventContent.vue';

import { EventContent } from 'src/types/Event';

defineProps({
  eventContent: {
    type: Object as PropType<EventContent>,
    required: true,
  },
});

defineEmits(['save']);
</script>
