<template>
  <div>
    <!-- Form: event program item -->
    <q-form
      @submit="emit('save')"
      @reset="emit('reset')"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2 class="q-mt-0 q-mb-sm text-body1 text-weight-bold">
        {{
          selectedEventProgramItem
            ? t('event.program.titleEditProgramItem')
            : t('event.program.titleAddProgramItem')
        }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: program item name -->
          <form-field-text
            v-model="eventProgramForm.name"
            name="form-event-program-item-name"
            label="event.program.labelTitle"
            class="col-12"
            required
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: description -->
          <form-field-textarea
            v-model="eventProgramForm.description"
            name="form-event-program-item-description"
            label="event.program.labelDescription"
            class="col-12"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-12 col-sm-6">
            <form-field-time-from-input
              v-model="eventProgramForm.timeFrom"
              :time-to="eventProgramForm.timeTo"
              required
            />
          </div>
          <div class="col-12 col-sm-6">
            <form-field-time-to-input
              v-model="eventProgramForm.timeTo"
              :time-from="eventProgramForm.timeFrom"
              required
            />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div>
            <label class="text-caption text-bold text-grey-10">
              {{ t('event.program.labelCategories') }}
            </label>
            <div class="row">
              <q-checkbox
                v-for="category in eventCategories"
                :key="category.slug"
                v-model="eventProgramForm.categories"
                :val="category.id"
                :label="t(`event.program.category.${category.slug}`)"
                dense
                color="primary"
                class="col-12 col-sm-4 text-grey-10 q-mt-md"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Buttons -->
      <div class="flex justify-end q-gutter-sm q-mt-lg">
        <q-btn
          rounded
          unelevated
          outline
          type="reset"
          color="primary"
          :label="t('event.program.buttonReset')"
        />
        <q-btn
          rounded
          unelevated
          type="submit"
          color="primary"
          :label="t('event.program.buttonSave')"
          :loading="isEventProgramSaving"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
/**
 * FormEventProgramItem Component
 *
 * The `FormEventProgramItem` is used to gather information about program item in program editor.
 *
 * @description * Use this component to display program item form.
 *
 * @example
 * <form-event-program-item @save="onSave" @reset="onReset" />
 *
 */

// libraries
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldTimeFromInput from 'src/components/form/event/FormFieldTimeFromInput.vue';
import FormFieldTimeToInput from 'src/components/form/event/FormFieldTimeToInput.vue';
import FormFieldTextarea from 'src/components/form/global/FormFieldTextarea.vue';

// stores
import { useEventProgramStore } from 'src/stores/event/program';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['save', 'reset']);
const { t } = useI18n();
const eventProgramStore = useEventProgramStore();
const {
  isEventProgramSaving,
  eventProgramForm,
  eventCategories,
  selectedEventProgramItem,
  isEventProgramFormDirty,
} = storeToRefs(eventProgramStore);

watch(
  eventProgramForm,
  () => {
    isEventProgramFormDirty.value = true;
  },
  { deep: true },
);
</script>
