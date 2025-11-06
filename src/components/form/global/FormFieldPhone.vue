<template>
  <div class="col-12 col-sm-6" data-cy="form-phone">
    <!-- Label -->
    <label for="form-phone" class="text-caption text-bold">
      {{ t(label) }}
      <span v-if="!required" class="text-grey-6 text-caption">
        {{ ` (${t('form.labelOptional')})` }}
      </span>
    </label>
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
      data-cy="form-phone-input"
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
 * - `value` (string, required): The object representing user input.
 *   It should be of type `string`.
 * - `hint` (string, default: ''): The hint text.
 * - `required` (boolean, default: false): Whether the input is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-phone />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6385%3A28510&mode=dev)
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
