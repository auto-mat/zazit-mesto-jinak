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
/**
 * ProgressBar component
 *
 * The `ProgressBar` component is used to display a step progress bar.
 *
 * @description * Use this component to display a step progress bar.
 *
 * @props
 * - `totalSteps` (number, required): The total number of steps.
 * - `doneSteps` (number, required): The number of done steps.
 *
 * @example
 * <progress-bar :totalSteps="totalSteps" :doneSteps="doneSteps" />
 */

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
