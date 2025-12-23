<template>
  <div class="file-downloader">
    <div>{{ text }}</div>
    <q-btn
      round
      unelevated
      outline
      icon="download"
      color="primary"
      :href="url"
      download
    />
  </div>
</template>

<script setup lang="ts">
/**
 * FileDownloader component
 *
 * The `FileDownloader` component is used to download the event PDF file.
 *
 * @description * Use this component to display a button to download the event PDF file.
 *
 * @param {string} pdfUrl - The URL of the event PDF file.
 * @param {string} text - The text to display above the button.
 *
 * @example
 * <file-downloader :pdf-url="pdfUrl" :text="text" />
 *
 */
// libraries
import { computed } from 'vue';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const props = defineProps<{
  pdfUrl: string;
  text: string;
}>();

const url = computed(() => zazitMestoJinakConfig.urlBaseBackend + props.pdfUrl);
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
