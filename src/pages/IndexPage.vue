<template>
  <q-page class="column q-pa-xl">
    <div class="full-width row items-center justify-between q-mb-xl">
      <div class="catch-text">{{ t('home.description') }}</div>
      <div class="column items-end justify-start text-white">
        <span class="text-body1">{{ t('home.subtitle') }}</span>
        <h1>{{ t('home.title') }}</h1>
      </div>
    </div>
    <h2 class="q-mb-md">{{ t('home.titleEvents') }}</h2>
    <div class="row q-gutter-lg">
      <event-card
        v-for="event in eventStore.eventList"
        :key="event.slug"
        :event="event"
      />
    </div>
    <div class="row q-mt-xl">
      <news-box />
    </div>
    <div class="row q-mt-xl">
      <zmj-tips-box />
    </div>
    <div class="background-image-container">
      <img class="background-image" src="~assets/automat-background.png" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useEventStore } from 'src/stores/event';
import { useI18n } from 'vue-i18n';
import EventCard from 'src/components/event/EventCard.vue';
import NewsBox from 'src/components/home/NewsBox.vue';
import ZmjTipsBox from 'src/components/home/ZmjTipsBox.vue';

const { t } = useI18n();

const eventStore = useEventStore();

defineOptions({
  name: 'IndexPage',
});
</script>

<style scoped lang="scss">
.catch-text {
  font-size: 20px;
  font-style: italic;
  color: var(--q-secondary);
}

.background-image-container {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  max-height: 100vh;
  z-index: -1;
  overflow: hidden;

  @media (max-width: 1023px) {
    display: none;
  }
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
