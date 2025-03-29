<script lang="ts">
/**
 * FormFieldTimeToInput Component
 *
 * The `FormFieldTimeToInput` displays time input for time to data.
 *
 * @description * Use this component to render time input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 * - `required` (boolean, default: false): Whether the input is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-time-to-input v-model="value" :time-from="" />
 */

// libraries
import { defineComponent, computed } from 'vue';

// components
import FormFieldTimeInput from '../global/FormFieldTimeInput.vue';

// composables
import { useValidation } from 'src/composables/useValidation';

export default defineComponent({
  name: 'FormFieldTimeToInput',
  components: {
    FormFieldTimeInput
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    timeFrom: {
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

    const { isFilled, isTimeLaterThan, isTimeEqualTo } = useValidation();
    
    return {
      inputValue,
      isFilled,
      isTimeLaterThan,
      isTimeEqualTo,
    };
  },
});
</script>

<template>
  <div>
    <label
      for="form-time-from"
      class="text-caption text-bold text-grey-10"
    >
      {{ $t('form.labelTimeTo') }}
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
            fieldName: $t('form.labelTimeTo')
          }),
        (val: string) => 
          !timeFrom ||
          isTimeLaterThan(val, timeFrom) ||
          $t('form.messageTimeLater'),
        (val: string) => 
          !timeFrom ||
          !isTimeEqualTo(val, timeFrom) ||
          $t('form.messageTimeEqual'),
      ]"
    />
  </div>
</template>