<script lang="ts">
/**
 * FormFieldImage Component
 *
 * The `FormFieldImage` displays image and image input.
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
import { computed, defineComponent, PropType, ref } from 'vue';

// composables
import { useValidation } from 'src/composables/useValidation';

export default defineComponent({
  name: 'FormFieldImage',
  props: {
    modelValue: {
      type: Object as PropType<File | null>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const imageViewSrc = ref('image-placeholder.jpg');

    const image = computed({
      get() {
        return props.modelValue;
      },
      set(value: File | null) {
        if (value) {
          imageViewSrc.value = URL.createObjectURL(value);
        } else {
          imageViewSrc.value = 'image-placeholder.jpg';
        }
        emit('update:modelValue', value);
      },
    });

    const { isFilled } = useValidation();

    return {
      image,
      imageViewSrc,
      isFilled,
    };
  },
});
</script>

<template>
  <div>
    <!-- Label -->
    <div class="column q-mb-sm">
      <label for="form-image" class="text-caption text-bold">
        {{ $t('event.content.labelImage') }}
      </label>
      <span class="text-caption">
        {{ $t('event.content.sublabelImage') }}
      </span>
    </div>
    <div>
      <q-img
        :src="imageViewSrc"
        :alt="$t('event.content.altImage')"
        fit="contain"
        class="image-input"
      />
    </div>
    <!-- Input -->
    <q-file
      dense
      outlined
      clearable
      v-model="image"
      accept=".jpg, image/*"
      class="q-mt-sm"
      id="form-image"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>
    </q-file>
  </div>
</template>

<style scoped>
.image-input {
  max-height: 600px;
}
</style>
