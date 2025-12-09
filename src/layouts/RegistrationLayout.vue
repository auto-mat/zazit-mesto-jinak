<template>
  <q-layout>
    <div class="header">
      <q-avatar square size="100px" class="q-my-sm">
        <img src="logo-zmj.svg" />
      </q-avatar>
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useLoginStore } from 'src/stores/login';
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';
import { UserLanguage } from 'src/enums/userEnums';
import { storeToRefs } from 'pinia';

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
