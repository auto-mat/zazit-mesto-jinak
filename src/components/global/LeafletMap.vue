<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import leaflet from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const props = defineProps({
  latitude: {
    type: Number,
    default: 50.073658, // Prague
  },
  longitude: {
    type: Number,
    default: 14.41854, // Prague
  },
  marker: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['setCoords']);

let map: leaflet.Map;
let eventMarker: leaflet.Marker;

const zoom = computed(() => (props.marker ? 17 : 12));

let defaultIcon = leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

onMounted(() => {
  leaflet.Marker.prototype.options.icon = defaultIcon;

  map = leaflet
    .map('map')
    .setView([props.latitude, props.longitude], zoom.value);

  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  if (eventMarker) map.removeLayer(eventMarker);

  if (props.marker) {
    eventMarker = leaflet.marker([props.latitude, props.longitude]).addTo(map);
  }

  if (props.editable) {
    map.addEventListener('click', (e) => {
      if (eventMarker) map.removeLayer(eventMarker);

      const { lat, lng } = e.latlng;
      eventMarker = leaflet.marker([lat, lng]).addTo(map);
      emits('setCoords', lat, lng);
    });
  }
});
</script>

<style scoped></style>
