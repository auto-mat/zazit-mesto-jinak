<script lang="ts">
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
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-password v-model="password" />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6385%3A26514&mode=dev)
 */

// libraries
import { computed, defineComponent, ref } from 'vue';

// composables
import { useValidation } from 'src/composables/useValidation';

export default defineComponent({
  name: 'FormFieldPassword',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String as () => 'white' | 'transparent',
      default: 'transparent',
    },
    hideHint: {
      type: Boolean,
      default: false,
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

    const { isFilled, isStrongPassword } = useValidation();

    const isHiddenPassword = ref(true);

    return {
      password,
      isHiddenPassword,
      isFilled,
      isStrongPassword,
    };
  },
});
</script>

<template>
  <div data-cy="form-password">
    <!-- Label -->
    <label for="form-password" class="text-caption text-bold text-grey-10">
      {{ $t('form.labelPassword') }}
    </label>
    <!-- Input -->
    <q-input
      dense
      outlined
      hide-bottom-space
      v-model="password"
      id="form-password"
      :hint="hideHint ? '' : $t('form.hintPassword')"
      :type="isHiddenPassword ? 'password' : 'text'"
      :rules="[
        (val: string) =>
          isFilled(val) ||
          $t('form.messageFieldRequired', {
            fieldName: $t('form.labelPassword'),
          }),
        (val: string) => isStrongPassword(val) || $t('form.messagePasswordStrong'),
      ]"
      lazy-rules
      class="q-mt-sm"
      data-cy="form-password-input"
    >
      <!-- Icon: show password -->
      <template v-slot:append>
        <q-icon
          color="primary"
          :name="isHiddenPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          size="18px"
          @click="isHiddenPassword = !isHiddenPassword"
          data-cy="form-password-icon"
        />
      </template>
    </q-input>
  </div>
</template>
