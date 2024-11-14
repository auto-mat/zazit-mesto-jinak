<script lang="ts">
/**
 * FormFieldText Component
 *
 * The `FormFieldText` displays text input.
 *
 * @description * Use this component to render text input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 * - `bgColor` (string, default: 'transparent'): The background color of the
 * - `name` (string, required): The name used for id and test selectors.
 * - `label` (string, required): The translation key for the label.
 * - `required` (boolean, default: false): Whether the input is required.
 * - `autocomplete` (string): The autocomplete attribute.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-text v-model="value" label="" name="" />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=4858%3A103756&mode=dev)
 */

// libraries
import { defineComponent, computed } from 'vue';

// composables
import { useValidation } from 'src/composables/useValidation';

export default defineComponent({
  name: 'FormFieldText',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String as () => 'white' | 'transparent',
      default: 'transparent',
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
    autocomplete: {
      type: String,
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
  <div :data-cy="`form-${name}`">
    <!-- Label -->
    <label :for="`form-${name}`" class="text-grey-10 text-caption text-bold">
      {{ $t(label) }}
    </label>
    <!-- Input -->
    <q-input
      dense
      outlined
      v-model="inputValue"
      lazy-rules
      :rules="[
        (val: string) =>
          !required || 
          isFilled(val) ||
          $t('form.messageFieldRequired', $t(label)),
      ]"
      :bg-color="bgColor"
      class="q-mt-sm"
      :id="`form-${name}`"
      :name="name"
      :autocomplete="autocomplete"
      :data-cy="`form-${name}-input`"
    />
  </div>
</template>
