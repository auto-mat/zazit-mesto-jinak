<template>
  <div>
    <!-- Label -->
    <label :for="`form-${name}`" class="text-grey-10 text-caption text-bold">
      {{ t(label) }}
      <span v-if="!required" class="text-grey-6 text-caption">
        {{ ` (${t('form.labelOptional')})` }}
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
          t('form.messageFieldRequired', { fieldName: t(label) }),
      ]"
      class="q-mt-sm"
      :id="`form-${name}`"
      :name="name"
      :bg-color="bgColor"
    />
  </div>
</template>

<script setup lang="ts">
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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// composables
import { useValidation } from 'src/composables/useValidation';

const props = defineProps({
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
  bgColor: {
    type: String as () => 'white' | 'transparent',
    default: 'transparent',
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
