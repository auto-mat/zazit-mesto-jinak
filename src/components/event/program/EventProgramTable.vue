<template>
  <div
    class="table-wrapper"
    :style="tableHeight ? { height: tableHeight + 'px' } : {}"
  >
    <div class="fit">
      <q-table
        ref="tableRef"
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="name"
        class="table"
        :no-data-label="t('event.program.noData')"
        v-bind="$attrs"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-if="editable" auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-if="editable" auto-width>
              <q-btn
                size="sm"
                round
                flat
                color="primary"
                icon="edit"
                @click="$emit('edit', props.row)"
              />
              <q-btn
                size="sm"
                round
                flat
                color="primary"
                icon="delete"
                @click="$emit('delete', props.row)"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
// libraries
import { nextTick, onMounted, PropType, ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { QTable } from 'quasar';

// types
import { EventCategory, EventProgram } from 'src/types/Event';

const props = defineProps({
  rows: {
    type: Array as PropType<EventProgram>,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  rowsPerPage: {
    type: Number,
    default: 5,
  },
});

defineEmits(['edit', 'delete']);

const { t } = useI18n();
const leftAlign = 'left' as const;
const centerAlign = 'center' as const;

const columns = [
  {
    name: 'timeFrom',
    align: centerAlign,
    label: t('event.program.labelTimeFrom'),
    field: 'timeFrom',
    sortable: true,
  },
  {
    name: 'timeTo',
    align: centerAlign,
    label: t('event.program.labelTimeTo'),
    field: 'timeTo',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    align: leftAlign,
    label: t('event.program.labelTitle'),
    field: 'name',
    sortable: true,
  },
  {
    name: 'description',
    align: leftAlign,
    label: t('event.program.labelDescription'),
    field: 'description',
  },
  {
    name: 'categories',
    align: leftAlign,
    label: t('event.program.labelCategories'),
    field: 'categories',
    format: (val: EventCategory[]) => {
      const list = val.map((category) =>
        t(`event.program.category.${category.slug}`),
      );
      return list.join(', ');
    },
  },
];

const tableRef = ref<InstanceType<typeof QTable>>();
const tableHeight = ref<number | null>(null);

const calculateTableHeight = async (): Promise<void> => {
  await nextTick();
  if (tableRef.value?.$el) {
    const tableElement = tableRef.value.$el as HTMLElement;
    const height = tableElement.offsetHeight;
    // Only set height if table has content (more than just header)
    if (height > 100) {
      tableHeight.value = height;
    } else if (props.rows.length === 0) {
      // If no rows, don't set a fixed height
      tableHeight.value = null;
    }
  }
};

// Watch for changes in rows to recalculate height
watch(() => props.rows, calculateTableHeight, { deep: true });

// Calculate height after mount and when table is ready
onMounted(() => {
  calculateTableHeight();
});

// Watch for table element changes
watchEffect(() => {
  if (tableRef.value?.$el) {
    calculateTableHeight();
  }
});
</script>

<style scoped>
.table-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.fit {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
}
</style>
