<template>
  <div>
    <!-- Label -->
    <div class="column q-mb-sm">
      <label for="form-editor" class="text-caption text-bold">
        {{ t('event.content.labelMainText') }}
      </label>
      <span class="text-caption">
        {{ t('event.content.sublabelMainText') }}
      </span>
    </div>
    <!-- Input -->
    <q-editor
      v-model="editor"
      id="form-editor"
      :toolbar="[
        ['bold', 'italic', 'underline', 'link'],
        ['undo', 'redo'],
      ]"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * FormFieldEditor Component
 *
 * The `FormFieldEditor` displays rich text input.
 *
 * @description * Use this component to render rich text input in forms.
 *
 * @props
 * - `modelValue` (string, required): The string representing user input.
 *   It should be of type `string`.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-editor v-model="content" />
 *
 */

// libraries
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const { t } = useI18n();

const editor = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});
</script>
