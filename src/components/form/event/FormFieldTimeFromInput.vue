<script lang="ts">
/**
 * FormFieldTimeFromInput Component
 *
 * The `FormFieldTimeFromInput` displays time input for time from data.
 *
 * @description * Use this component to render time input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 * - `timeTo` (string, default: ''): The time to value.
 * - `required` (boolean, default: false): Whether the input is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-time-from-input v-model="value" :time-to="" />
 */

// libraries
import { defineComponent, computed } from 'vue';

// components
import FormFieldTimeInput from '../global/FormFieldTimeInput.vue';

// composables
import { useValidation } from 'src/composables/useValidation';

export default defineComponent({
  name: 'FormFieldTimeFromInput',
  components: {
    FormFieldTimeInput,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    timeTo: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    const { isFilled, isTimeEarlierThan, isTimeEqualTo } = useValidation();

    return {
      inputValue,
      isFilled,
      isTimeEarlierThan,
      isTimeEqualTo,
    };
  },
});
</script>

<template>
  <div>
    <label for="form-time-from" class="text-caption text-bold text-grey-10">
      {{ $t('form.labelTimeFrom') }}
    </label>
    <form-field-time-input
      v-model="inputValue"
      id="form-time-from"
      :required="required"
      :rules="[
        (val: string) =>
          !required ||
          isFilled(val) ||
          $t('form.messageFieldRequired', {
            fieldName: $t('form.labelTimeFrom'),
          }),
        (val: string) =>
          !timeTo ||
          isTimeEarlierThan(val, timeTo) ||
          $t('form.messageTimeEarlier'),
        (val: string) =>
          !timeTo || !isTimeEqualTo(val, timeTo) || $t('form.messageTimeEqual'),
      ]"
    />
  </div>
</template>
