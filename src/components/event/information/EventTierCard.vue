<template>
  <q-card flat bordered class="column items-center q-pa-lg">
    <q-card-section class="text-center">
      <span class="text-h5">{{ t('event.information.titleEventLevel') }}</span>
      <h2 class="text-h4 text-bold">Malá slavnost</h2>
    </q-card-section>
    <q-card-section class="text-center">
      Malá slavnost je nejnižší kategorie akcí.
    </q-card-section>
    <q-card-actions>
      <q-btn
        rounded
        unelevated
        outline
        color="primary"
        icon="mail"
        :label="t('event.information.buttonEventLevel')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
// libraries
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
