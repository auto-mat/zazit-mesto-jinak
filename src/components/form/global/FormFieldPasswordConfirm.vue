<script lang="ts">
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
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6385%3A28513&mode=dev)
 */

// libraries
import { computed, defineComponent, ref } from 'vue';

// composables
import { useValidation } from 'src/composables/useValidation';

export default defineComponent({
  name: 'FormFieldPasswordConfirm',
  props: {
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
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const password = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    const { isFilled, isStrongPassword, isIdentical } = useValidation();

    const isHiddenPassword = ref(true);

    return {
      password,
      isHiddenPassword,
      isFilled,
      isIdentical,
      isStrongPassword,
    };
  },
});
</script>

<template>
  <div data-cy="form-password-confirm">
    <!-- Label -->
    <label
      for="form-password-confirm"
      class="text-caption text-bold text-grey-10"
    >
      {{ $t('form.labelPasswordConfirmation') }}
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
          isFilled(val) ||
          $t('form.messageFieldRequired', {
            fieldName: $t('form.labelPassword'),
          }),
        (val : string) => isStrongPassword(val) || $t('form.messagePasswordStrong'),
        (val: string) =>
          isIdentical(val, compareValue) ||
          $t('form.messagePasswordNotIdentical'),
      ]"
      lazy-rules
      class="q-mt-sm"
      data-cy="form-password-confirm-input"
    >
      <!-- Icon: show password -->
      <template v-slot:append>
        <q-icon
          color="primary"
          :name="isHiddenPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          size="18px"
          @click="isHiddenPassword = !isHiddenPassword"
          data-cy="form-password-confirm-icon"
        />
      </template>
    </q-input>
  </div>
</template>
