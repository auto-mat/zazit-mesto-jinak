<template>
  <q-input
    dense
    outlined
    v-model="inputValue"
    mask="time"
    class="q-mt-sm"
    :bg-color="bgColor"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="inputValue" format24h>
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                :label="t('form.labelClose')"
                color="primary"
                flat
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
/**
 * FormFieldTimeInput Component
 *
 * The `FormFieldTimeInput` displays time input.
 *
 * @description * Use this component to render time input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 * - `required` (boolean, default: false): Whether the input is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-time-input v-model="value" />
 */

// libraries
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

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
</script>
