<script lang="ts">
/**
 * FormEventProgramItem Component
 *
 * The `FormEventProgramItem` is used to gather information about program item in program editor.
 *
 * @description * Use this component to display program item form.
 *
 * @example
 * <form-event-program-item/>
 *
 */

// libraries
import { defineComponent, reactive } from 'vue';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldTimeFromInput from 'src/components/form/event/FormFieldTimeFromInput.vue';
import FormFieldTimeToInput from 'src/components/form/event/FormFieldTimeToInput.vue';


export default defineComponent({
  name: 'FormProgramItem',
  components: {
    FormFieldText,
    FormFieldTimeFromInput,
    FormFieldTimeToInput,
  },
  setup() {

    const formEventProgramItem = reactive({
      itemName: '',
      description: '',
      timeFrom: '',
      timeTo: '',
      categories: [], //checkbox
    });

    const categories = [
      'theather',
      'forchildren',
      'film',
      'workshop',
      'food',
      'music',
      'games',
      'dance',
      'sport',
      'other'
    ]


    const onSubmit = (): void => {
      // noop
    };

    const onReset = (): void => {
      // noop
    };

    return {
      formEventProgramItem,
      categories,
      onReset,
      onSubmit,
    };
  },
});
</script>

<template>
  <div>
    <!-- Form: event program item -->
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2
        class="q-mt-0 q-mb-sm text-body1 text-weight-bold"
      >
        {{ $t('event.program.titleAddProgramItem') }}
      </h2>
      <div class="q-mt-lg">
        
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: event name -->
          <form-field-text
            v-model="formEventProgramItem.itemName"
            name="form-event-program-item-name"
            label="event.program.labelTitle"
            class="col-12"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-12 col-sm-6">
            <form-field-time-from-input 
              v-model="formEventProgramItem.timeFrom" 
              :time-to="formEventProgramItem.timeTo" 
              required 
            />
          </div>
          <div class="col-12 col-sm-6">
            <form-field-time-to-input
              v-model="formEventProgramItem.timeTo"
              :time-from="formEventProgramItem.timeFrom"
              required
            />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div>
            <label
            class="text-caption text-bold text-grey-10"
          >
            {{ $t('event.program.labelCategories') }}
          </label>
          <div class="row">
            <q-checkbox 
              v-for="category in categories"
              :key="category"
              v-model="formEventProgramItem.categories" 
              :val="category"
              :label="category"
              dense
              color="primary"
              class="col-12 col-sm-4 text-grey-10 q-mt-md"
            />
          </div>
          </div>
        </div>
      </div>
        <!-- Button: submit -->
        <div class="flex justify-end q-mt-lg">
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('event.program.buttonSave')"
          />
        </div>
    </q-form>
  </div>
</template>