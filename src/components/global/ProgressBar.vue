<template>
  <div class="step-progress">
    <div
      v-for="step in totalSteps"
      :key="step"
      class="step"
      :class="{ done: step <= doneSteps }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  totalSteps: {
    type: Number,
    required: true,
  },
  doneSteps: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.step-progress {
  display: flex;
  gap: 8px;
}

.step {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background-color: var(--q-secondary); /* gray */
}

.step.done {
  background-color: var(--q-primary); /* black */
}
</style>
