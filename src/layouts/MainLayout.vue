<template>
  <q-layout view="lhh lpR lFf">

    <q-drawer v-model="leftDrawerOpen" side="left" overlay class="bg-secondary text-black">

      <DrawerHeader />

      <q-list>
        <q-item-label header class="menu-events-header">
          {{ $t('menu.myEventsHeader') }}
        </q-item-label>

        <LocationLinks event-name="My event 1" />
        <LocationLinks event-name="My event 2" />

        <q-separator inset spaced/>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ $t('menu.profileLink') }}
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ $t('menu.forumLink') }}
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="volunteer_activism" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ $t('menu.donateLink') }}
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section no-wrap>
            {{ $t('menu.logoutButton') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DrawerHeader from 'src/components/menu/DrawerHeader.vue';
import LocationLinks from 'src/components/menu/LocationLinks.vue';

defineOptions({
  name: 'MainLayout'
});


const leftDrawerOpen = ref(true);

// function toggleLeftDrawer () {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>

<style>
.menu-events-header {
  font-size: large;
}
</style>
