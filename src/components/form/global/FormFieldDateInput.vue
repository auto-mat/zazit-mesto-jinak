<template>
  <div>
    <template v-if="label">
      <label for="date" class="text-grey-10 text-caption text-bold">
        {{ t(label) }}
        <span v-if="!required" class="text-grey-6 text-caption">
          {{ ` (${t('form.labelOptional')})` }}
        </span>
      </label>
    </template>
    <q-input
      dense
      outlined
      v-model="inputValue"
      name="date"
      class="q-mt-sm"
      mask="##/##/####"
      :rules="[
        (val: string) =>
          !required ||
          isFilled(val) ||
          t('form.messageFieldRequired', {
            fieldName: t('form.labelDate'),
          }),
        (val: string) => isDate(val) || t('form.messageDateInvalid'),
      ]"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date minimal v-model="inputValue" mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
/**
 * FormFieldDateInput Component
 *
 * The `FormFieldDateInput` displays date input.
 *
 * @description * Use this component to render date input in forms.
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
 * <form-field-date-input v-model="value" label="" />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=4858%3A103756&mode=dev)
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
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
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

const { isFilled, isDate } = useValidation();
</script>
