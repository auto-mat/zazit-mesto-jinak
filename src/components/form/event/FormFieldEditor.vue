<script lang="ts">
/**
 * FormFieldEditor Component
 *
 * The `FormFieldEditor` displays rich text input.
 *
 * @description * Use this component to render rich text input in forms.
 *
 * @props
 * - `value` (string, required): The object representing user input.
 *   It should be of type `string`.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-editor />
 *
 * @see 
 */

// libraries
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FormFieldEditor',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editor = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    return {
      editor,
    };
  },
});
</script>

<template>
  <div>
    <!-- Label -->
    <div class="column q-mb-sm">
      <label for="form-editor" class="text-caption text-bold">
        {{ $t('event.content.labelMainText') }}
      </label>
      <span class="text-caption">
        {{ $t('event.content.sublabelMainText') }}
      </span>
    </div>
    <!-- Input -->
    <q-editor 
      v-model="editor" 
      id="form-editor"
      :toolbar="[
        ['bold', 'italic', 'underline', 'link'],
        ['undo', 'redo']
      ]"
    />
  </div>
</template>
