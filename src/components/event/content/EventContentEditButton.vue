<template>
  <div>
    <q-btn
      class="lt-md"
      round
      flat
      color="primary"
      icon="edit"
      @click="$emit('edit')"
    />
    <q-btn
      class="gt-sm"
      rounded
      unelevated
      outline
      color="primary"
      icon="edit"
      :label="$t('event.content.buttonEdit')"
      @click="$emit('edit')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['edit'])
</script>