<template>
  <q-card flat bordered class="column items-center q-pa-lg">
    <q-card-section class="text-center">
      <span class="text-h5">{{ t('event.information.titleEventLevel') }}</span>
      <h2 class="text-h4 text-bold">
        {{ t('event.information.eventTier.smallTitle') }}
      </h2>
    </q-card-section>
    <q-card-section class="text-center">
      {{ t('event.information.eventTier.smallDescription') }}
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
/**
 * EventTierCard component
 *
 * The `EventTierCard` component is used to display the event tier card.
 *
 * @description * Use this component to display the event tier card.
 *
 * @example
 * <event-tier-card />
 */

// libraries
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
