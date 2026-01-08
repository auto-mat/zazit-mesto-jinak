<template>
  <q-card class="card" :class="{ disabled: disabled }">
    <q-card-section>
      <img src="~assets/image-card-1.png" class="card-image" />
      <span class="card-title">{{ title }}</span>

      <progress-bar :totalSteps="totalSteps" :doneSteps="doneSteps" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
/**
 * GuideCard component
 *
 * The `GuideCard` component is used to display the guide card for an event.
 *
 * @description * Use this component to display the guide card for an event.
 *
 * @example
 * <guide-card :title="title" :totalSteps="totalSteps" :doneSteps="doneSteps" :disabled="disabled" @click="navigateToGuide" />
 */

// components
import ProgressBar from 'src/components/global/ProgressBar.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
  doneSteps: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.card {
  max-width: 300px;
  cursor: pointer;
  transition: transform 0.15s ease-in-out;

  &:hover:not(.disabled) {
    transform: scale(1.05);
  }

  &.disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  display: block;
  margin-block: 20px;
  font-size: 16px;
  font-weight: 600;
}
</style>
