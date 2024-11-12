<template>
  <q-expansion-item
    switch-toggle-side
    group="locationLinks"
    :content-inset-level="0.5"
    :label="eventName"
  >
    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="rule" />
        </q-item-section>
        <q-item-section no-wrap>
          Guide
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="info" />
        </q-item-section>
        <q-item-section no-wrap>
          Information
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="language" />
        </q-item-section>
        <q-item-section no-wrap>
          Content on web
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="groups" />
        </q-item-section>
        <q-item-section no-wrap>
          Organizers
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
</template>

<script setup lang="ts">

defineProps({
  eventName: {
    type: String,
    required: true
  }
})

</script>

<style>
.q-item__section--avatar {
  min-width: fit-content !important;
}
</style>