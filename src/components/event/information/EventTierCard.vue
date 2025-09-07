<template>
  <q-card flat bordered class="column items-center q-pa-lg">
    <q-card-section class="text-center">
      <span class="text-h5">{{ $t('event.information.titleEventLevel') }}</span>
      <h2 class="text-h4 text-bold">{{ eventType }}</h2>
    </q-card-section>
    <q-card-section class="text-center">
      {{ eventTypeDescription }}
    </q-card-section>
    <q-card-actions>
      <q-btn
        rounded
        unelevated
        outline
        color="primary"
        icon="mail"
        :label="$t('event.information.buttonEventLevel')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
defineProps({
  eventType: {
    type: String,
    required: true
  },
  eventTypeDescription: {
    type: String,
    required: true
  }
})
</script>