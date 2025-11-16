<template>
  <div>
    <!-- Label -->
    <label
      for="form-password-confirm"
      class="text-caption text-bold text-grey-10"
    >
      {{ t('form.labelPasswordConfirmation') }}
    </label>
    <!-- Input -->
    <q-input
      dense
      outlined
      hide-bottom-space
      v-model="password"
      id="form-password-confirm"
      :type="isHiddenPassword ? 'password' : 'text'"
      :rules="[
        (val: string) =>
          isIdentical(val, props.compareValue) ||
          t('form.messagePasswordNotIdentical'),
      ]"
      lazy-rules
      :bg-color="bgColor"
      class="q-mt-sm"
    >
      <!-- Icon: show password -->
      <template v-slot:append>
        <q-icon
          color="primary"
          :name="isHiddenPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          size="18px"
          @click="isHiddenPassword = !isHiddenPassword"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
/**
 * FormFieldPasswordConfirm Component
 *
 * The `FormFieldPasswordConfirm` displays password confirm input.
 *
 * @description * Use this component to render password confirm input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 *   It should be of type `string`.
 * - `compareValue` (string, required): The object representing password value
 *   to be compared with the `modelValue`.
 * - `bgColor` (string, default: 'transparent'): The background color of the
 *   input.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-password-confirm v-model="passwordConfirm" />
 */

// libraries
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// composables
import { useValidation } from 'src/composables/useValidation';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  compareValue: {
    type: String,
    required: true,
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

const password = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const { isIdentical } = useValidation();

const isHiddenPassword = ref(true);
</script>
