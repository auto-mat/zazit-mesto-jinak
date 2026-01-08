<template>
  <q-layout view="lhr lpR fFf">
    <q-header v-if="isMobile" class="header">
      <router-link :to="routesConf['home']['path']">
        <q-avatar square size="80px" class="q-my-sm">
          <img src="logo-zmj.svg" />
        </q-avatar>
      </router-link>
      <div class="flex justify-between items-center q-pr-md q-pt-md gap-16">
        <div class="flex items-center gap-4">
          <q-btn dense round flat icon="help" color="primary" />
          <q-btn dense round flat icon="notifications" color="primary">
            <q-badge color="red" floating rounded />
          </q-btn>
        </div>
        <q-btn
          dense
          flat
          round
          icon="menu"
          color="primary"
          size="large"
          @click="drawerOpen = !drawerOpen"
        />
      </div>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      :side="isMobile ? 'right' : 'left'"
      class="bg-secondary text-black"
    >
      <drawer-header v-if="!isMobile" />
      <div v-else class="flex justify-end items-center q-pr-md q-pt-md">
        <q-btn
          dense
          flat
          round
          icon="close"
          color="primary"
          size="large"
          @click="drawerOpen = false"
        />
      </div>

      <q-list class="menu-list">
        <q-item-label header class="menu-events-header">
          {{ t('menu.myEventsHeader') }}
        </q-item-label>

        <LocationLinks
          v-for="(event, index) in eventStore.eventList"
          :key="event.slug"
          :event-name="event.name"
          :event-slug="event.slug"
          :is-first="index === 0"
        />

        <q-separator inset spaced />

        <q-item :to="{ name: routesConf['profile']['children']['name'] }">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ t('menu.profileLink') }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          :href="zazitMestoJinakConfig.urlZMJManual"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ t('menu.manualLink') }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          :href="zazitMestoJinakConfig.urlDonate"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="volunteer_activism" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ t('menu.donateLink') }}
          </q-item-section>
        </q-item>

        <q-item clickable @click="loginStore.logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ t('menu.logoutButton') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// libraries
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

// stores
import { useEventStore } from 'src/stores/event';
import { useLoginStore } from 'src/stores/login';
import { useUserStore } from 'src/stores/user';

// components
import DrawerHeader from 'src/components/menu/DrawerHeader.vue';
import LocationLinks from 'src/components/menu/LocationLinks.vue';

// config
import { routesConf } from 'src/router/routes_conf';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

defineOptions({
  name: 'MainLayout',
});

const { t } = useI18n();
const drawerOpen = ref(true);
const eventStore = useEventStore();
const loginStore = useLoginStore();
const userStore = useUserStore();

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.md);

onMounted(async () => {
  if (eventStore.eventList.length === 0) {
    await eventStore.loadEventList();
  }
  if (!userStore.userDetails) {
    await userStore.loadUserDetails();
  }
});
</script>

<style scoped lang="scss">
.header {
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.menu-events-header {
  font-size: large;
}

.menu-list {
  :deep(.q-router-link--active, .q-router-link--exact-active) {
    color: var(--q-primary);
    font-weight: bold;
  }
}

.page-container {
  overflow-y: auto;
}
</style>
