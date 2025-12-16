<template>
  <div class="full-width flex justify-between q-py-sm">
    <router-link :to="routesConf['home']['path']">
      <q-avatar square size="100px" class="q-my-sm">
        <img src="logo-zmj.svg" />
      </q-avatar>
    </router-link>

    <div class="flex column justify-between items-end q-pr-md q-pt-md">
      <div>
        <q-btn dense round flat icon="help" color="primary" />
        <q-btn dense round flat icon="notifications" color="primary"> </q-btn>
      </div>
      <div class="flex column items-end">
        <span class="text-grey-6 login-as-text">{{
          t('menu.loginAsText')
        }}</span>
        <span
          >{{ userDetails?.name ?? '' }} {{ userDetails?.surname ?? '' }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user';
import { routesConf } from 'src/router/routes_conf';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const { userDetails } = storeToRefs(userStore);
const { t } = useI18n();
</script>

<style scoped lang="scss">
.login-as-text {
  font-size: 11px;
}
</style>
