<template>
  <div class="table-wrapper" :style="{ height: tableHeight + 'px' }">
    <div class="fit">
    <q-table
      flat 
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="table"
    >
    <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-if="editable" auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
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
              icon="edit" />
            <q-btn 
              size="sm" 
              round
              flat
              color="primary"
              icon="delete" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineProps({
  editable: {
    type: Boolean,
    default: false
  }
})
const { t } = useI18n()
const leftAlign = 'left' as const
const centerAlign = 'center' as const

const columns = [
  { name: 'title', required: true, align: leftAlign, label: t('event.program.labelTitle'), field: 'title', sortable: true },
  { name: 'description', align: leftAlign, label: t('event.program.labelDescription'), field: 'description' },
  { name: 'timeFrom', align: centerAlign, label: t('event.program.labelTimeFrom'), field: 'timeFrom', sortable: true },
  { name: 'timeTo', align: centerAlign, label: t('event.program.labelTimeTo'), field: 'timeTo', sortable: true },
  { name: 'categories', align: leftAlign, label: t('event.program.labelCategories'), field: 'categories' },
]

const rows = [
  {
    title: 'Divadlo',
    description: 'Představení dobrovolnického spolku',
    timeFrom: '9:00',
    timeTo: '10:30',
    categories: 'Divadlo, Pro děti'
  },
  {
    title: 'Zpívánky',
    description: 'Zpěv s dětmi',
    timeFrom: '11:00',
    timeTo: '11:30',
    categories: 'Pro děti'
  },
  {
    title: 'Zpívánky',
    description: 'Zpěv s dětmi',
    timeFrom: '11:00',
    timeTo: '11:30',
    categories: 'Pro děti'
  },
  {
    title: 'Zpívánky',
    description: 'Zpěv s dětmi',
    timeFrom: '11:00',
    timeTo: '11:30',
    categories: 'Pro děti'
  },
  {
    title: 'Zpívánky',
    description: 'Zpěv s dětmi',
    timeFrom: '11:00',
    timeTo: '11:30',
    categories: 'Pro děti'
  },
  {
    title: 'Zpívánky',
    description: 'Zpěv s dětmi',
    timeFrom: '11:00',
    timeTo: '11:30',
    categories: 'Pro děti'
  },
  {
    title: 'Zpívánky',
    description: 'Zpěv s dětmi',
    timeFrom: '11:00',
    timeTo: '11:30',
    categories: 'Pro děti'
  },
  {
    title: 'Zpívánky',
    description: 'Zpěv s dětmi',
    timeFrom: '11:00',
    timeTo: '11:30',
    categories: 'Pro děti'
  },
]

const element = ref<HTMLElement>()
const tableHeight = ref(0)

onMounted(() => {
  element.value = document.querySelector('.table') as HTMLElement;
  tableHeight.value = element.value ? element.value.offsetHeight : 0;
})

// watchEffect(() => {
//   tableHeight.value = element.value?.offsetHeight ? element.value.offsetHeight : 0;
// })
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