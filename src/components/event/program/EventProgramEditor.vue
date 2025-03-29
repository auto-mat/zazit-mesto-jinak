<template>
  <div>
    <!-- table: editable -->
    <div class="q-mb-xl">
      <h2 class="q-mt-0 q-mb-md text-body1 text-weight-bold">
        {{ $t('event.program.titleExistingProgramItems') }}
      </h2>

      <event-program-table editable />
    </div>

    <!-- form: program item -->
    <form-event-program-item />
  </div>
</template>

<script setup lang="ts">
import EventProgramTable from './EventProgramTable.vue';
import FormEventProgramItem from 'src/components/form/event/FormEventProgramItem.vue';

</script>