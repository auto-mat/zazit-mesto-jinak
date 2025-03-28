<template>
  <q-page class="column q-pa-xl">
    <div class="row justify-between items-end q-mb-md">
      <div>
        <span>name</span>
        <h1>{{ $t('event.titleProgram') }}</h1>
      </div>

      <back-button v-if="edit" @back="edit = false" />
      <edit-button v-else @edit="edit = true" />
    </div>

    <event-program-editor v-if="edit"/>

    <event-program-table v-else />
    
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EventProgramTable from 'src/components/event/program/EventProgramTable.vue';
import EventProgramEditor from 'src/components/event/program/EventProgramEditor.vue';
import EditButton from 'src/components/buttons/EditButton.vue';
import BackButton from 'src/components/buttons/BackButton.vue';

const edit = ref(false)
</script>