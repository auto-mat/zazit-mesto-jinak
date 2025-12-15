<template>
  <div>
    <div class="q-mb-xl">
      <div class="q-mb-sm">
        <h3 class="text-body1 text-bold">
          {{ t('event.content.labelImage') }}
        </h3>
        <span class="text-caption">{{ t('event.content.sublabelImage') }}</span>
      </div>

      <q-img
        :src="imageSrc"
        :alt="t('event.content.altImage')"
        fit="contain"
        class="image"
      />
    </div>

    <div class="q-mb-xl">
      <div class="q-mb-sm">
        <h3 class="text-body1 text-bold">
          {{ t('event.content.labelMainText') }}
        </h3>
        <span class="text-caption">{{
          t('event.content.sublabelMainText')
        }}</span>
      </div>

      <!-- TODO sanitaze HTML -->
      <div
        v-if="eventContent.mainContent"
        class="content"
        v-html="eventContent.mainContent"
      ></div>
      <div v-else>
        <span class="text-caption text-grey-6">{{
          t('event.content.empty')
        }}</span>
      </div>
    </div>

    <div class="q-mb-xl">
      <div class="q-mb-sm">
        <h3 class="text-body1 text-bold">
          {{ t('event.content.labelLinks') }}
        </h3>
      </div>

      <div v-if="eventContent.links.length > 0">
        <div
          v-for="(link, index) in eventContent.links"
          :key="index"
          class="row wrap q-mb-sm"
        >
          <span class="col-12 col-md-2">{{ link.title }}</span>
          <a class="link col-12 col-md-10" :href="link.url">{{ link.url }}</a>
        </div>
      </div>
      <div v-else>
        <span class="text-caption text-grey-6">{{
          t('event.content.empty')
        }}</span>
      </div>
    </div>

    <div class="q-pb-xl">
      <div class="q-mb-sm">
        <h3 class="text-body1 text-bold">
          {{ t('event.content.labelProgram') }}
        </h3>
      </div>

      <event-program-table :rows="eventProgram" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import EventProgramTable from '../program/EventProgramTable.vue';
import { EventContent, EventProgram } from 'src/types/Event';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  eventContent: {
    type: Object as PropType<EventContent>,
    required: true,
  },
  eventProgram: {
    type: Array as PropType<EventProgram[]>,
    required: true,
  },
});

defineEmits(['edit']);

const imageSrc = computed(() => {
  if (props.eventContent.image) {
    return URL.createObjectURL(props.eventContent.image);
  } else {
    return 'image-placeholder.jpg';
  }
});
</script>

<style scoped>
.image {
  width: 100%;
  /* max-width: 800px; */
  max-height: 600px;
}

.links {
  display: grid;
  grid-template-columns: min-content auto;
}

.link {
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
</style>
