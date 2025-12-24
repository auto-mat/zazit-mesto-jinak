<template>
  <div class="spinner-container">
    <q-spinner color="primary" size="4rem" :thickness="3" class="spinner" />
  </div>
</template>

<script setup lang="ts">
/**
 * Spinner component
 * Displays a spinner
 */
</script>

<style scoped lang="scss">
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
