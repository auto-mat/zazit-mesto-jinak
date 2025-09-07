<script lang="ts">
/**
 * FormFieldTextarea Component
 *
 * The `FormFieldTextarea` displays textarea input.
 *
 * @description * Use this component to render textarea input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 * - `name` (string, required): The name used for id and test selectors.
 * - `label` (string, required): The translation key for the label.
 * - `required` (boolean, default: false): Whether the input is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-textarea v-model="value" label="" name="" />
 */

// libraries
import { defineComponent, computed } from 'vue';

// composables
import { useValidation } from 'src/composables/useValidation';

export default defineComponent({
  name: 'FormFieldTextarea',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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

    const { isFilled } = useValidation();

    return {
      inputValue,
      isFilled,
    };
  },
});
</script>

<template>
  <div>
    <!-- Label -->
    <label :for="`form-${name}`" class="text-grey-10 text-caption text-bold">
      {{ $t(label) }}
      <span v-if="!required" class="text-grey-6 text-caption">
        {{ ` (${$t('form.labelOptional')})` }}
      </span>
    </label>
    <!-- Input -->
    <q-input
      dense
      outlined
      v-model="inputValue"
      type="textarea"
      lazy-rules
      :rules="[
        (val: string) =>
          !required || 
          isFilled(val) ||
          $t('form.messageFieldRequired', $t(label)),
      ]"
      class="q-mt-sm"
      :id="`form-${name}`"
      :name="name"
    />
  </div>
</template>
