<template>
  <div>
    <q-btn
      class="lt-md"
      round
      flat
      color="primary"
      icon="edit"
      v-bind="$attrs"
      @click="$emit('edit')"
    />
    <q-btn
      class="gt-sm"
      rounded
      unelevated
      outline
      color="primary"
      icon="edit"
      v-bind="$attrs"
      :label="$t('button.edit')"
      @click="$emit('edit')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['edit'])
</script>