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
      </div>
    </div>

    <div class="background-image-container">
      <img class="background-image" src="~assets/automat-background.png" />
    </div>

    <q-page-container class="q-px-xl q-py-xl">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from 'src/stores/login';

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
}

.background-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  max-height: 100vh;
}

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
  gap: 10px;
  margin-right: 20px;
}

.logout-button {
  background-color: var(--q-white);
  color: var(--q-primary);
}
</style>
