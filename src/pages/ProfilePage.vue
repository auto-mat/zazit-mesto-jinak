<template>
  <q-page class="column q-ma-xl">
    <h1 class="q-mb-md">{{ $t('profile.title') }}</h1>
    <h2>{{ $t('profile.subtitle') }}</h2>

    <profile-row>
     <span class="name">{{ data.name }}</span>
    </profile-row>
    <profile-row :label="$t('profile.emailLabel')">
      {{ data.email }}
    </profile-row>
    <profile-page :label="$t('profile.phoneLabel')">
      {{ data.phone }}
    </profile-page>
    <profile-row :label="$t('profile.genderLabel')">
      {{ data.gender }}
    </profile-row>
  </q-page>
</template>

<script setup lang="ts">
import ProfileRow from 'src/components/profile/ProfileRow.vue';

defineOptions({
  name: 'ProfilePage'
});

const data = {
  name: 'John Novak',
  email: 'john.novak@email.com',
  phone: '+420 605 456 123',
  gender: 'Male'
}
</script>

<style scoped>
.name {
  font-size: 20pt;
}
</style>