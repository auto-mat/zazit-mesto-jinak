<template>
  <q-expansion-item
    switch-toggle-side
    group="locationLinks"
    :content-inset-level="0.5"
    :label="eventName"
    :default-opened="isFirst"
  >
    <q-list class="menu-list">
      <q-item :to="`/event/${eventSlug}/guide`" exact>
        <q-item-section avatar>
          <q-icon name="rule" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ t('menu.guideLink') }}
        </q-item-section>
      </q-item>

      <q-item
        :to="{
          name: routesConf['event_information']['children']['name'],
          params: { slug: eventSlug },
        }"
      >
        <q-item-section avatar>
          <q-icon name="info" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ t('menu.informationLink') }}
        </q-item-section>
      </q-item>

      <q-item
        :to="{
          name: routesConf['event_organizers']['children']['name'],
          params: { slug: eventSlug },
        }"
      >
        <q-item-section avatar>
          <q-icon name="groups" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ t('menu.organizersLink') }}
        </q-item-section>
      </q-item>

      <q-item
        :to="{
          name: routesConf['event_web_content']['children']['name'],
          params: { slug: eventSlug },
        }"
      >
        <q-item-section avatar>
          <q-icon name="language" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ t('menu.contentOnWebLink') }}
        </q-item-section>
      </q-item>

      <q-item
        :to="{
          name: routesConf['event_program']['children']['name'],
          params: { slug: eventSlug },
        }"
      >
        <q-item-section avatar>
          <q-icon name="schedule" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ t('menu.programLink') }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
</template>

<script setup lang="ts">
/**
 * LocationLinks component
 *
 * The `LocationLinks` component is used to display the links of the event.
 *
 * @description * Use this component to display the links of the event.
 *
 * @props
 * - `eventName` (string, required): The name of the event.
 * - `eventSlug` (string, required): The slug of the event.
 * - `isFirst` (boolean, default: false): Whether this is the first event.
 *
 * @example
 * <location-links :eventName="eventName" :eventSlug="eventSlug" :isFirst="isFirst" />
 */

// libraries
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

defineProps({
  eventName: {
    type: String,
    required: true,
  },
  eventSlug: {
    type: String,
    required: true,
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
</script>

<style scoped lang="scss">
.menu-list {
  :deep(.q-router-link--active) {
    color: var(--q-primary);
    font-weight: bold;
  }
}
</style>
