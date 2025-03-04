<template>
  <div class="content">
    <div class="q-mb-xl">
      <div class="q-mb-sm flex justify-between items-center no-wrap">
        <div>
          <h3 class="text-body1 text-bold">{{ $t('event.content.labelImage') }}</h3>
          <span class="text-caption">{{ $t('event.content.sublabelImage') }}</span>
        </div>

        <event-content-edit-button />
      </div>
      
      <q-img 
        src="https://picsum.photos/800/500"
        fit="contain"
        class="image"
      />
    </div>

    <div class="q-mb-xl">
      <div class="q-mb-sm flex justify-between items-center no-wrap">
        <div>
          <h3 class="text-body1 text-bold">{{ $t('event.content.labelMainText') }}</h3>
          <span class="text-caption">{{ $t('event.content.sublabelMainText') }}</span>
        </div>

        <event-content-edit-button />
      </div>

      <!-- sanitaze HTML -->
      <div 
        class="content"
        v-html="mainContent"
      ></div>
    </div>

    <div class="q-mb-xl">
      <div class="q-mb-sm flex justify-between items-center">
        <h3 class="text-body1 text-bold">{{ $t('event.content.labelLinks') }}</h3>
        <event-content-edit-button />
      </div>

      <div>
        <div v-for="link in links" :key="link.id" class="row wrap q-mb-sm">
          <span class="col-12 col-md-2">{{ link.urlTitle }}</span>
          <a class="link col-12 col-md-10" :href="link.url">{{  link.url }}</a>
        </div>
      </div>
    </div>

    <div>
      <div class="q-mb-sm">
        <h3 class="text-body1 text-bold">{{ $t('event.content.labelProgram') }}</h3>
      </div>

      <!-- <event-program-table /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EventContentEditButton from './EventContentEditButton.vue';
// import EventProgramTable from '../program/EventProgramTable.vue';

const mainContent = ref('<div>Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. In rutrum metus quis diam luctus tristique. Integer at diam arcu. Sed aliquet tempus tempor. Donec efficitur porta ipsum eu fringilla. <i>Nullam eget risus</i> sed sem vehicula <a href="google.com">semper</a> non ornare nunc. Quisque et tincidunt nisi, nec ultrices nulla.</div> <div>Morbi ullamcorper sapien turpis, accumsan cursus ex tincidunt ac. Cras a tincidunt erat. Donec ac bibendum sapien.</div>')

const links = [
  {
    id: 1,
    urlTitle: 'Facebook událost',
    url: 'https://www.facebook.com/ZazitMestoJinak/',
  },
  {
    id: 2,
    urlTitle: 'Instagram',
    url: 'https://www.instagram.com/zazitmestojinak/',
  },
  {
    id: 3,
    urlTitle: 'Webová stránka',
    url: 'https://zazitmestojinak.cz/'
  }
]
</script>

<style scoped>
.image {
  width: 100%;
  /* max-width: 800px; */
  max-height: 600px;
}

.content {
  width: 100%;
  max-width: 1000px;
}

.links {
  display: grid;
  grid-template-columns: min-content auto;
}

.link {
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
</style>