<template>
  <div>
    <q-btn
      class="lt-md"
      round
      flat
      color="primary"
      icon="arrow_back_ios"
      @click="$emit('back')"
    />
    <q-btn
      class="gt-sm"
      rounded
      unelevated
      outline
      color="primary"
      icon="chevron_left"
      :label="$t('button.back')"
      @click="$emit('back')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['back'])
</script>