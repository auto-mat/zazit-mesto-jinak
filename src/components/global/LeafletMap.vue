<template>
   <div id="map"></div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import leaflet from 'leaflet';

const props = defineProps({
   latitude: {
      type: Number,
      default: 50.073658, // Prague
   },
   longitude: {
      type: Number,
      default: 14.418540, // Prague
   },
   marker: {
      type: Boolean,
      default: false,
   },
   editable: {
      type: Boolean,
      default: false,
   }
});

const emits = defineEmits(['getCoords']);

let map: leaflet.Map;
let eventMarker: leaflet.Marker;

const zoom = computed(() => props.marker ? 17 : 12)

onMounted(() => {
   map = leaflet.map('map').setView([props.latitude, props.longitude], zoom.value)

   leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   }).addTo(map);

   if (eventMarker) map.removeLayer(eventMarker);

   if (props.marker) {
      eventMarker = leaflet.marker([props.latitude, props.longitude]).addTo(map);
   }

   if (props.editable) {
      map.addEventListener('click', (e) => {
         if (eventMarker) map.removeLayer(eventMarker);
      
         const { lat, lng } = e.latlng;
         eventMarker = leaflet.marker([lat, lng]).addTo(map);
         emits('getCoords', lat, lng);
      })
   }
})
</script>

<style scoped>
</style>