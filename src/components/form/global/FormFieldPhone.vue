<template>
  <div>
    <!-- Label -->
    <form-label for="form-phone" :optional="!required">
      {{ t(label) }}
    </form-label>
    <!-- Input -->
    <q-input
      dense
      outlined
      reactive-rules
      v-model="phone"
      :rules="[
        (val: string) =>
          !required ||
          isFilled(val) ||
          t('form.messageFieldRequired', {
            fieldName: t('form.labelPhone'),
          }),
        (val: string) => !val || isPhone(val) || t('form.messagePhoneInvalid'),
      ]"
      :hint="hint"
      :bg-color="bgColor"
      class="q-mt-sm"
      id="form-phone"
      name="phone"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * FormFieldPhone Component
 *
 * The `FormFieldPhone` displays phone input.
 *
 * @description * Use this component to render phone input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 *   It should be of type `string`.
 * - `hint` (string, default: ''): The hint text.
 * - `label` (string, required): The translation key for the label.
 * - `required` (boolean, default: false): Whether the input is required.
 * - `bgColor` (string, default: 'transparent'): The background color of the input.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-phone v-model="value" label="t('form.labelPhone')" />
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
  hint: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'form.labelPhone',
  },
  required: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String as () => 'white' | 'transparent',
    default: 'transparent',
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const { t } = useI18n();

const phone = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const { isFilled, isPhone } = useValidation();
</script>
