<script lang="ts">
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
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'FormFieldTimeInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    return {
      inputValue
    };
  },
});
</script>

<template>
  <q-input 
    dense
    outlined
    v-model="inputValue" 
    mask="time"
    class="q-mt-sm"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy 
          cover 
          transition-show="scale" 
          transition-hide="scale"
        >
          <q-time
            v-model="inputValue"
            format24h
          >
            <div class="row items-center justify-end">
              <q-btn 
                v-close-popup 
                :label="$t('form.labelClose')" 
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