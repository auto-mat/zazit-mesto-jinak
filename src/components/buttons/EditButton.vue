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
/**
 * EditButton component
 *
 * The `EditButton` component is used to display an edit button.
 *
 * @description * Use this component to display an edit button.
 *
 * @events
 * - `edit`: Emitted when the edit button is clicked.
 *
 * @example
 * <edit-button @edit="edit" />
 */
defineEmits(['edit']);
</script>
