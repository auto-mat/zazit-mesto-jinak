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
    <event-program-item-form />
  </div>
</template>

<script setup lang="ts">
import EventProgramTable from './EventProgramTable.vue';
import EventProgramItemForm from './EventProgramItemForm.vue';

</script>