<template>
  <q-card class="card" @click="navigateToEvent">
    <q-card-section>
      <img src="~assets/image-card-2.png" class="card-image" />
      <span class="card-title">{{ event.name }}</span>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
/**
 * EventCard component
 *
 * The `EventCard` component is used to display the event card.
 *
 * @description * Use this component to display the event card.
 *
 * @props
 * - `event` (EventMeta, required): The event.
 *   It should be of type `EventMeta`.
 *
 * @example
 * <event-card :event="event" />
 */

// libraries
import { PropType } from 'vue';
import { useRouter } from 'vue-router';

// types
import { EventMeta } from 'src/types/Event';

// config
import { routesConf } from 'src/router/routes_conf';

const props = defineProps({
  event: {
    type: Object as PropType<EventMeta>,
    required: true,
  },
});

const router = useRouter();

const navigateToEvent = () => {
  router.push({
    name: routesConf['event_guide']['children']['name'],
    params: { slug: props.event.slug as string },
  });
};
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
