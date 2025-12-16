<template>
  <q-dialog v-model="showContentWebGuideModal">
    <div
      class="q-pa-md guide-modal"
      :style="{ maxWidth: zazitMestoJinakConfig.containerContentWidth }"
    >
      <div class="row items-center">
        <div class="text-h6">{{ t('event.guide.contentWeb.title') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </div>
      <q-stepper
        v-model="contentWebStep"
        vertical
        flat
        color="primary"
        active-icon="none"
        done-icon="check"
        class="guide-stepper"
      >
        <q-step
          :name="1"
          :title="t('event.guide.contentWeb.step1.title')"
          prefix="1"
          :done="contentWebStep > 1"
        >
          <div class="q-mb-md">
            {{ t('event.guide.contentWeb.step1.description') }}
          </div>
          <q-btn
            rounded
            unelevated
            outline
            color="primary"
            :label="t('event.guide.contentWeb.step1.button')"
            :to="{
              name: routesConf['event_web_content']['children']['name'],
              params: { slug: slug },
            }"
          />
        </q-step>

        <q-step
          :name="2"
          :title="t('event.guide.contentWeb.step2.title')"
          prefix="2"
          done-icon="check"
          done-color="green"
          :done="contentWebStep > 2"
        >
          {{ t('event.guide.contentWeb.step2.description') }}
        </q-step>
      </q-stepper>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useGuideStore } from 'src/stores/guide';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { routesConf } from 'src/router/routes_conf';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const showContentWebGuideModal = defineModel<boolean>(
  'showContentWebGuideModal',
);

const { t } = useI18n();

const route = useRoute();
const slug = ref(route.params.slug as string);

const guideStore = useGuideStore();
const { contentWebStep } = storeToRefs(guideStore);
</script>

<style scoped lang="scss">
.guide-modal {
  width: 100%;
  background-color: var(--q-white);
  padding: 30px;
}

.files-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.guide-stepper {
  :deep(.q-stepper__title) {
    font-size: 16px;
  }

  :deep(.q-stepper__tab--active .q-stepper__title) {
    font-weight: 600;
  }
}
</style>
