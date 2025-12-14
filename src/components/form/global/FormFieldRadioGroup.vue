<template>
  <q-field
    dense
    borderless
    hide-bottom-space
    :model-value="radioValue"
    :rules="[
      (val: any) =>
        !required || isFilled(val) || t('form.messageOptionRequired'),
    ]"
  >
    <q-option-group
      dense
      v-model="radioValue"
      :options="options"
      :inline="inline"
      color="primary"
      class="text-grey-10 q-gutter-md"
    >
      <template v-slot:label="opt">
        <span class="text-grey-10">{{ opt.label }}</span>
      </template>
    </q-option-group>
  </q-field>
</template>

<script setup lang="ts">
/**
 * FormFieldRadioGroup Component
 *
 * The `FormFieldRadioGroup` displays email input.
 *
 * @description * Use this component to render email input in forms.
 *
 * Used in `FormRegister`, `FormLogin`, `RegisterChallengePayment`.
 *
 * @props
 * - `modelValue` (any, required): The object representing user input.
 *   It can be of any type.
 * - `options` (object, required): The object representing the options.
 *   Should have props:
 * - `inline` (boolean, default: false): Buttons in row layout
 * - `required` (boolean, default: false): Whether the value is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-radio-group v-model="value" :options="options" inline />
 */

// libraries
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// composables
import { useValidation } from 'src/composables/useValidation';

// types
import type { FormOption } from 'src/types/Form';

const props = defineProps({
  modelValue: {
    required: true,
  },
  options: {
    type: Array as () => FormOption[],
    required: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: any];
}>();

const { t } = useI18n();

const radioValue = computed({
  get(): any {
    return props.modelValue;
  },
  set(value: any) {
    emit('update:modelValue', value);
  },
});

const { isFilled } = useValidation();
</script>
