<template>
  <q-expansion-item
    switch-toggle-side
    group="locationLinks"
    :content-inset-level="0.5"
    :label="eventName"
  >
    <q-list class="menu-list">
      <q-item :to="`/event/${eventSlug}/guide`" exact>
        <q-item-section avatar>
          <q-icon name="rule" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ $t('menu.guideLink') }}
        </q-item-section>
      </q-item>

      <q-item :to="`/event/${eventSlug}/information`" exact>
        <q-item-section avatar>
          <q-icon name="info" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ $t('menu.informationLink') }}
        </q-item-section>
      </q-item>

      <q-item :to="`/event/${eventSlug}/organizers`" exact>
        <q-item-section avatar>
          <q-icon name="groups" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ $t('menu.organizersLink') }}
        </q-item-section>
      </q-item>

      <q-item :to="`/event/${eventSlug}/web-content`" exact>
        <q-item-section avatar>
          <q-icon name="language" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ $t('menu.contentOnWebLink') }}
        </q-item-section>
      </q-item>

      <q-item :to="`/event/${eventSlug}/program`" exact>
        <q-item-section avatar>
          <q-icon name="schedule" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ $t('menu.programLink') }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
</template>

<script setup lang="ts">
defineProps({
  eventName: {
    type: String,
    required: true,
  },
  eventSlug: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.menu-list {
  :deep(.q-router-link--active) {
    color: var(--q-primary);
    font-weight: bold;
  }
}
</style>
