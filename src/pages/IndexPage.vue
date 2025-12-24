<template>
  <q-page class="column q-pa-xl">
    <spinner v-if="loading" />
    <template v-else>
      <!-- Header -->
      <div class="full-width row items-center justify-between q-mb-xl header">
        <div class="catch-text">{{ t('home.description') }}</div>
        <div class="column items-end justify-start title-container">
          <span class="text-body1">{{ t('home.subtitle') }}</span>
          <h1>{{ t('home.title') }}</h1>
        </div>
      </div>
      <!-- Events -->
      <h2 class="q-mb-md">{{ t('home.titleEvents') }}</h2>
      <div class="row q-gutter-lg">
        <event-card
          v-for="event in eventStore.eventList"
          :key="event.slug"
          :event="event"
        />
      </div>
      <!-- News -->
      <div class="row q-mt-xl">
        <news-box />
      </div>
      <!-- ZMJ Tips -->
      <div class="row q-mt-xl">
        <zmj-tips-box />
      </div>
      <!-- Background image -->
      <div class="background-image-container">
        <img class="background-image" src="~assets/automat-background.png" />
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
/**
 * Home page component
 * Displays the home page with the events, news and zmj tips
 */

// libraries
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// stores
import { useEventStore } from 'src/stores/event';
import { useUserStore } from 'src/stores/user';

// components
import EventCard from 'src/components/event/EventCard.vue';
import NewsBox from 'src/components/home/NewsBox.vue';
import ZmjTipsBox from 'src/components/home/ZmjTipsBox.vue';
import Spinner from 'src/components/global/Spinner.vue';

const { t } = useI18n();

const eventStore = useEventStore();
const userStore = useUserStore();
const loading = computed(() => eventStore.loading);

onMounted(() => {
  if (!userStore.userDetails) {
    userStore.loadUserDetails();
  }
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

.title-container {
  color: var(--q-white);

  @media (max-width: 1023px) {
    margin-top: 20px;
    color: var(--q-primary);
    margin-left: auto;
    text-align: right;
  }
}
</style>
