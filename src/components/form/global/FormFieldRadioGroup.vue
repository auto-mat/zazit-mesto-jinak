<script lang="ts">
/**
 * FormFieldRadioGroup Component
 *
 * The `FormFieldRadioGroup` displays email input.
 *
 * @description * Use this component to render email input in forms.
 *
 * Used in `FormRegister`, `FormLogin`, `RegisterChallengePayment`.
 *
 * @props
 * - `modelValue` (string, required): The object representing user input.
 *   It should be of type `string`.
 * - `options` (object, required): The object representing the options.
 *   Should have props:
 *   - label (string)
 *   - value (string)
 * - `inline` (boolean, default: false): Buttons in row layout
 * - `required` (boolean, default: false): Whether the value is required.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-radio-group />
 *
 * @see [Figma Design](https://www.figma.com/file/L8dVREySVXxh3X12TcFDdR/Do-pr%C3%A1ce-na-kole?type=design&node-id=6385%3A26514&mode=dev)
 */

// libraries
import { computed, defineComponent } from 'vue';

// composables
import { useValidation } from 'src/composables/useValidation';

// types
import type { FormOption } from 'src/components/types/Form';

export default defineComponent({
  name: 'FormFieldRadioRequired',
  props: {
    modelValue: {
      type: String as () => string | null,
      required: true,
    },
    options: {
      type: Array as () => FormOption[],
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const radioValue = computed({
      get(): string | null {
        return props.modelValue;
      },
      set(value: string | null) {
        emit('update:modelValue', value);
      },
    });

    const { isFilled } = useValidation();

    return {
      radioValue,
      isFilled,
    };
  },
});
</script>

<template>
  <q-field
    dense
    borderless
    hide-bottom-space
    :model-value="radioValue"
    :rules="[
      (val: string) => !required || isFilled(val) || $t('form.messageOptionRequired'),
    ]"
  >
    <q-option-group
      dense
      v-model="radioValue"
      :options="options"
      :inline="inline"
      color="primary"
      class="text-grey-10 q-gutter-md"
      data-cy="form-field-radio"
    >
      <template v-slot:label="opt">
        <span :data-cy="`radio-option-${opt.value}`" class="text-grey-10">{{
          opt.label
        }}</span>
      </template>
    </q-option-group>
  </q-field>
</template>
