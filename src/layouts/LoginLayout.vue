<template>
  <q-layout class="login-layout">
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

    <div class="background-image-container">
      <img class="background-image" src="~assets/automat-background.png" />
    </div>

    <q-page-container class="q-px-xl q-py-xl page-container">
      <div class="content-wrapper">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from 'src/stores/login';
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';
import { UserLanguage } from 'src/enums/userEnums';

const loginStore = useLoginStore();
const { isUserLoggedIn } = storeToRefs(loginStore);

defineOptions({
  name: 'LoginLayout',
});
</script>

<style scoped lang="scss">
.login-layout {
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
}

.page-container {
  position: relative;
  width: 50%;
  min-height: 100vh;
  background-color: white;
  z-index: 1;
  margin-top: 100px;

  @media (max-width: 1023px) {
    width: 100%;
  }
}

.content-wrapper {
  width: 100%;
  height: 100%;
}

.background-image-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 0;
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

.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 2;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
}

.logout-button {
  background-color: var(--q-white);
  color: var(--q-primary);
}
</style>
