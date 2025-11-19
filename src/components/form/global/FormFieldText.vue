<template>
  <div>
    <!-- Label -->
    <form-label :for="`form-${name}`" :optional="!required">
      {{ t(label) }}
    </form-label>
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
          t('form.messageFieldRequired', { fieldName: t(label) }),
      ]"
      :bg-color="bgColor"
      class="q-mt-sm"
      :id="`form-${name}`"
      :name="name"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<script setup lang="ts">
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
 * <form-field-text v-model="value" label="t('form.labelText')" name="form-text" />
 */

// libraries
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// composables
import { useValidation } from 'src/composables/useValidation';

// components
import FormLabel from './FormLabel.vue';

const props = defineProps({
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
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const { t } = useI18n();

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const { isFilled } = useValidation();
</script>
