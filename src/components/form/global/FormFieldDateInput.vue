<template>
  <div>
    <template v-if="label">
      <form-label for="date" :optional="!required">
        {{ t(label) }}
      </form-label>
    </template>
    <q-input
      dense
      outlined
      v-model="inputValue"
      name="date"
      class="q-mt-sm"
      :mask="dateFormatMask"
      :rules="[
        (val: string) =>
          !required ||
          isFilled(val) ||
          t('form.messageFieldRequired', {
            fieldName: t('form.labelDate'),
          }),
        (val: string) => isDate(val) || t('form.messageDateInvalid'),
      ]"
      :bg-color="bgColor"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date minimal v-model="inputValue" :mask="dateFormat">
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  :label="t('form.labelClose')"
                  color="primary"
                  flat
                />
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
 * - `label` (string, required): The translation key for the label.
 * - `required` (boolean, default: false): Whether the input is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-date-input v-model="value" label="t('form.labelDate')" />
 */

// libraries
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

// composables
import { useValidation } from 'src/composables/useValidation';

// components
import FormLabel from './FormLabel.vue';

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
  bgColor: {
    type: String as () => 'white' | 'transparent',
    default: 'transparent',
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const { t } = useI18n();
const dateFormat = computed(() => zazitMestoJinakConfig.dateFormat);
const dateFormatMask = computed(() =>
  dateFormat.value.replace(/[A-Za-z]/g, '#'),
);

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
