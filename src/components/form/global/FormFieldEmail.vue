<template>
  <div class="col-12 col-sm-6" data-cy="form-email">
    <!-- Label -->
    <label for="form-email" class="text-caption text-bold">
      {{ t('form.labelEmail') }}
      <span v-if="!required" class="text-grey-6 text-caption">
        {{ ` (${t('form.labelOptional')})` }}
      </span>
    </label>
    <!-- Input -->
    <q-input
      dense
      outlined
      v-model="email"
      :rules="[
        (val: string) =>
          !required ||
          isFilled(val) ||
          t('form.messageFieldRequired', {
            fieldName: t('form.labelEmail'),
          }),
        (val: string) => isEmail(val) || t('form.messageEmailInvalid'),
      ]"
      v-bind="$attrs"
      :bg-color="bgColor"
      class="q-mt-sm"
      id="form-email"
      name="email"
      type="email"
      data-cy="form-email-input"
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
 * - `value` (string, required): The object representing user input.
 *   It should be of type `string`.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-email />
 *
 * @see
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

const email = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const { isEmail, isFilled } = useValidation();
</script>
