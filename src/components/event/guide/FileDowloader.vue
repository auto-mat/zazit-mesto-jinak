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
      target="_blank"
      rel="noopener noreferrer"
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
 * @props
 * - `pdfUrl` (string, required): The URL of the event PDF file.
 * - `text` (string, required): The text to display above the button.
 *
 * @example
 * <file-downloader :pdf-url="pdfUrl" :text="text" />
 *
 */
// libraries
import { computed } from 'vue';

// utils
import { getMultimediaUrl } from 'src/utils/get_multimedia_file_url';

const props = defineProps<{
  pdfUrl: string;
  text: string;
}>();

const url = computed(() => getMultimediaUrl(props.pdfUrl));
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
