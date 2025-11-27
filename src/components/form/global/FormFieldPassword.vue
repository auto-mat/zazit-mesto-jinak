<template>
  <div>
    <!-- Label -->
    <label for="form-password" class="text-caption text-bold text-grey-10">
      {{ t('form.labelPassword') }}
    </label>
    <!-- Input -->
    <q-input
      dense
      outlined
      hide-bottom-space
      v-model="password"
      id="form-password"
      :hint="props.hideHint ? '' : t('form.hintPassword')"
      :type="isHiddenPassword ? 'password' : 'text'"
      :rules="validationRules"
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
 * FormFieldPassword Component
 *
 * The `FormFieldPassword` displays password input.
 *
 * @description * Use this component to render password input in forms.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 *   It should be of type `string`.
 * - `bgColor` (string, default: 'transparent'): The background color of the
 *   input.
 * - `hideHint` (boolean, default: false): Whether to show hint or not.
 * - `validated` (boolean, default: false): Whether the password should be validated.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-password v-model="password" />
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
  required: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String as () => 'white' | 'transparent',
    default: 'transparent',
  },
  hideHint: {
    type: Boolean,
    default: false,
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

const password = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const { isFilled, isStrongPassword } = useValidation();

const isHiddenPassword = ref(true);

const validationRules = computed(() => {
  return [
    (val: string) =>
      !props.required ||
      isFilled(val) ||
      t('form.messageFieldRequired', { fieldName: t('form.labelPassword') }),
    (val: string) =>
      !props.validated ||
      isStrongPassword(val) ||
      t('form.messagePasswordStrong'),
  ];
});
</script>
