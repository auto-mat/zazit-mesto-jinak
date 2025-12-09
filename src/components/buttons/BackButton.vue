<template>
  <div>
    <q-btn
      class="lt-md"
      round
      flat
      color="primary"
      icon="arrow_back_ios"
      v-bind="$attrs"
      @click="$emit('back')"
    />
    <q-btn
      class="gt-sm"
      rounded
      unelevated
      outline
      color="primary"
      icon="chevron_left"
      v-bind="$attrs"
      :label="t('button.back')"
      @click="$emit('back')"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineEmits(['back']);

const { t } = useI18n();
</script>
