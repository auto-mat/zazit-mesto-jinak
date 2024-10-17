<template>
  <q-layout view="lhh lpR lFf">

    <q-drawer v-model="leftDrawerOpen" side="left" overlay class="bg-secondary text-black">
      <q-avatar square size="100px" class="q-my-sm">
        <img src="logo-zmj.svg">
      </q-avatar>
      <q-list>
        <user-button />
        <q-item-label header>
          My Events
        </q-item-label>

        <LocationLinks />
        <LocationLinks />
        <LocationLinks />

        <q-separator />

        <q-item clickable>
          <q-item-section>
            Invite friends
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
import UserButton from 'src/components/menu/UserButton.vue';
import LocationLinks from 'src/components/menu/LocationLinks.vue';

defineOptions({
  name: 'MainLayout'
});


const leftDrawerOpen = ref(true);

// function toggleLeftDrawer () {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>
