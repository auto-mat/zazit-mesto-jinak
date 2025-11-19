<template>
  <label class="text-caption text-bold">
    <slot />
    <span v-if="optional" class="text-grey-6 text-caption">
      {{ ` (${t('form.labelOptional')})` }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps({
  optional: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
</script>
