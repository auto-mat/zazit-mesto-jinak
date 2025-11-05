<template>
  <q-field
    dense
    borderless
    hide-bottom-space
    :model-value="model"
    :rules="[(val: string) => !required || !!val || validationMessage]"
    data-cy="form-field-checkbox"
  >
    <q-checkbox
      dense
      v-model="model"
      color="primary"
      :true-value="true"
      :false-value="false"
      class="text-grey-10"
      data-cy="form-field-checkbox-input"
    >
      <span data-cy="form-field-checkbox-label">
        <slot />
      </span>
    </q-checkbox>
  </q-field>
</template>

<script setup lang="ts">
/**
 * FormFieldCheckbox Component
 *
 * @description * Use this component to render a checkbox input field.
 *
 * @props
 * - `modelValue` (boolean, required): Value of the checkbox.
 *   It should be of type `boolean`.
 * - `validationMessage` (string, default: false): Validation message of the checkbox.
 *   It should be of type `string`.
 * - `required` (boolean, default: false): Whether the checkbox is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @slots
 * - `default`: Label for the checkbox.
 *
 * @example
 * <form-field-checkbox v-model="isChecked" :validation-message="validationMessage" required >Label</form-field-checkbox>
 *
 * @see [Figma Design](https://www.figma.com/design/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?node-id=6417-29946&t=22yqDCEydrJ2RQgL-1)
 */

// libraries
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  validationMessage: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const model = computed({
  get: (): boolean => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>
