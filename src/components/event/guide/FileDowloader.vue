<template>
  <div class="file-downloader">
    <div>{{ t('event.guide.agreement.step3.downloadTitle') }}</div>
    <q-btn
      round
      unelevated
      outline
      icon="download"
      color="primary"
      href="/zmj-smlouva.pdf"
      download
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped lang="scss">
.file-downloader {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
