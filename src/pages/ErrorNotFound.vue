<template>
  <q-layout>
    <div class="header">
      <router-link :to="routesConf['home']['path']">
        <q-avatar square size="100px" class="q-my-sm">
          <img src="logo-zmj.svg" />
        </q-avatar>
      </router-link>
      <div class="buttons-container">
        <q-btn
          v-if="isUserLoggedIn"
          class="logout-button"
          flat
          round
          dense
          icon="logout"
          @click="loginStore.logout"
        />
        <language-switcher short-version :value="UserLanguage.CS" />
      </div>
    </div>

    <q-page-container class="page-container">
      <div class="text-center">
        <h1>404</h1>
        <h2>{{ t('error.notFound.title') }}</h2>
        <p>{{ t('error.notFound.description') }}</p>
        <q-btn
          :to="routesConf['home']['path']"
          :label="t('error.notFound.homeButton')"
          color="primary"
          rounded
          unelevated
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
/**
 * Error not found page
 * Displays the error not found page
 */

// libraries
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// stores
import { useLoginStore } from 'src/stores/login';

// enums
import { UserLanguage } from 'src/enums/userEnums';

// components
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';

const { t } = useI18n();

const loginStore = useLoginStore();
const { isUserLoggedIn } = storeToRefs(loginStore);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-right: 20px;
}
</style>
