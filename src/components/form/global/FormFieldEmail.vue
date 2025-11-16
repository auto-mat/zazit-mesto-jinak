<template>
  <div>
    <!-- Label -->
    <form-label for="form-email" :optional="!required">
      {{ t('form.labelEmail') }}
    </form-label>
    <!-- Input -->
    <q-input
      dense
      outlined
      v-model="email"
      :rules="validated ? validationRules : []"
      :lazy-rules="validated"
      :bg-color="bgColor"
      class="q-mt-sm"
      id="form-email"
      name="email"
      type="email"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * FormFieldEmail Component
 *
 * The `FormFieldEmail` displays email input.
 *
 * @description * Use this component to render email input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 *   It should be of type `string`.
 * - `required` (boolean, default: false): Whether the input is required.
 * - `bgColor` (string, default: 'transparent'): The background color of the input.
 * - `validated` (boolean, default: false): Whether the email should be validated.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-email v-model="value" />
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
  required: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String as () => 'white' | 'transparent',
    default: 'transparent',
  },
  validated: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const { t } = useI18n();

const email = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const { isEmail, isFilled } = useValidation();

const validationRules = computed(() => {
  return [
    (val: string) =>
      isFilled(val) ||
      t('form.messageFieldRequired', { fieldName: t('form.labelEmail') }),
    (val: string) => isEmail(val) || t('form.messageEmailInvalid'),
  ];
});
</script>
