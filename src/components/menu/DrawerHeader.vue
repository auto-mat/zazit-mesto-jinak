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
        <q-btn dense round flat icon="notifications" color="primary">
          <q-badge color="red" floating rounded />
        </q-btn>
      </div>
      <p>{{ userDetails?.email ?? '' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/user';
import { routesConf } from 'src/router/routes_conf';

const userStore = useUserStore();
const { userDetails } = storeToRefs(userStore);
</script>
