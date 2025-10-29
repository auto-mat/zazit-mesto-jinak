<template>
  <q-layout view="hHh lpR ffr">
    <q-avatar square size="100px" class="q-my-sm">
      <img src="logo-zmj.svg" />
    </q-avatar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LoginLayout',
});
</script>
