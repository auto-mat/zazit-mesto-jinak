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
import { defineComponent, PropType, reactive, ref, watch, nextTick } from 'vue';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldTimeFromInput from 'src/components/form/event/FormFieldTimeFromInput.vue';
import FormFieldTimeToInput from 'src/components/form/event/FormFieldTimeToInput.vue';
import FormFieldTextarea from 'src/components/form/global/FormFieldTextarea.vue';
import { EventProgramItem } from 'src/types/Event';
import { useEventStore } from 'src/stores/event';
import { QForm } from 'quasar';

export default defineComponent({
  name: 'FormProgramItem',
  components: {
    FormFieldText,
    FormFieldTimeFromInput,
    FormFieldTimeToInput,
    FormFieldTextarea,
  },
  props: {
    eventProgramItem: {
      type: Object as PropType<EventProgramItem>,
      required: true,
    },
  },
  setup(props) {
    const eventStore = useEventStore();
    const formRef = ref<InstanceType<typeof QForm>>();
    const formEventProgramItem = reactive({
      title: props.eventProgramItem.title,
      description: props.eventProgramItem.description,
      timeFrom: props.eventProgramItem.timeFrom,
      timeTo: props.eventProgramItem.timeTo,
      categories: props.eventProgramItem.categories,
    });

    const categories = [
      'theater',
      'forchildren',
      'film',
      'workshop',
      'food',
      'music',
      'games',
      'dance',
      'sport',
      'sale',
      'other',
    ];

    const editState = ref(false);

    const setForm = () => {
      editState.value = true;

      formEventProgramItem.title = props.eventProgramItem.title;
      formEventProgramItem.description = props.eventProgramItem.description;
      formEventProgramItem.timeFrom = props.eventProgramItem.timeFrom;
      formEventProgramItem.timeTo = props.eventProgramItem.timeTo;
      formEventProgramItem.categories = props.eventProgramItem.categories;
    };

    const resetForm = () => {
      formEventProgramItem.title = '';
      formEventProgramItem.description = '';
      formEventProgramItem.timeFrom = '';
      formEventProgramItem.timeTo = '';
      formEventProgramItem.categories = [];
    };

    watch(() => props.eventProgramItem, setForm);

    const onSubmit = async (): Promise<void> => {
      eventStore.addProgramItem(formEventProgramItem);
      editState.value = false;
      resetForm();
      await nextTick();
      formRef.value?.resetValidation();
    };

    const onReset = (): void => {
      editState.value = false;
      resetForm();
    };

    return {
      formRef,
      formEventProgramItem,
      categories,
      editState,
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
      ref="formRef"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2 class="q-mt-0 q-mb-sm text-body1 text-weight-bold">
        {{
          editState
            ? $t('event.program.titleEditProgramItem')
            : $t('event.program.titleAddProgramItem')
        }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: program item name -->
          <form-field-text
            v-model="formEventProgramItem.title"
            name="form-event-program-item-name"
            label="event.program.labelTitle"
            class="col-12"
            required
          />
        </div>
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Input: description -->
          <form-field-textarea
            v-model="formEventProgramItem.description"
            name="form-event-program-item-description"
            label="event.program.labelDescription"
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
            <label class="text-caption text-bold text-grey-10">
              {{ $t('event.program.labelCategories') }}
            </label>
            <div class="row">
              <q-checkbox
                v-for="category in categories"
                :key="category"
                v-model="formEventProgramItem.categories"
                :val="category"
                :label="$t(`event.program.category.${category}`)"
                dense
                color="primary"
                class="col-12 col-sm-4 text-grey-10 q-mt-md"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Button: submit -->
      <div class="flex justify-end q-gutter-sm q-mt-lg">
        <q-btn
          rounded
          unelevated
          outline
          type="reset"
          color="primary"
          :label="$t('event.program.buttonReset')"
        />
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
