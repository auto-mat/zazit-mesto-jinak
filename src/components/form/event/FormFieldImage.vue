<template>
  <div>
    <!-- Label -->
    <div class="column q-mb-sm">
      <label for="form-image" class="text-caption text-bold">
        {{ t('event.content.labelImage') }}
      </label>
      <span class="text-caption">
        {{ t('event.content.sublabelImage') }}
      </span>
    </div>
    <div>
      <q-img
        :src="imageViewSrc"
        :alt="t('event.content.altImage')"
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
      :max-file-size="maxFileSize"
      class="q-mt-sm"
      id="form-image"
      @rejected="onRejected"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>
    </q-file>
  </div>
</template>

<script setup lang="ts">
/**
 * FormFieldImage Component
 *
 * The `FormFieldImage` displays image and image input.
 *
 * @description * Use this component to render image input in forms.
 *
 * @props
 * - `modelValue` (File | null, required): The file object representing the image.
 *   It should be of type `File | null`.
 * - `defaultImage` (string, optional): The default image to display if no image is selected.
 *
 * @events
 * - `update:modelValue`: Emitted as a part of v-model structure.
 *
 * @example
 * <form-field-image v-model="imageFile" :default-image="defaultImage" />
 *
 */

// libraries
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Notify } from 'quasar';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const props = defineProps<{
  modelValue: File | null;
  defaultImage?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: File | null];
}>();

const { t } = useI18n();

const imageViewSrc = ref<string | null>(null);

const maxFileSize = computed(
  () => zazitMestoJinakConfig.imageMaxFileUploadSizeMegabytes * 1024,
);

const onRejected = (): void => {
  Notify.create({
    message: t('form.messageMaxFileUploadSize'),
    color: 'negative',
  });
};

const image = computed({
  get() {
    return props.modelValue;
  },
  set(value: File | null) {
    // Clean up previous object URL to prevent memory leaks
    if (imageViewSrc.value && imageViewSrc.value.startsWith('blob:')) {
      URL.revokeObjectURL(imageViewSrc.value);
    }

    if (value) {
      imageViewSrc.value = URL.createObjectURL(value);
    } else if (props.defaultImage) {
      imageViewSrc.value = props.defaultImage;
    } else {
      imageViewSrc.value = 'image-placeholder.jpg';
    }
    emit('update:modelValue', value);
  },
});

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    // Clean up previous object URL to prevent memory leaks
    if (oldValue && imageViewSrc.value.startsWith('blob:')) {
      URL.revokeObjectURL(imageViewSrc.value);
    }

    if (newValue) {
      imageViewSrc.value = URL.createObjectURL(newValue);
    } else if (props.defaultImage) {
      imageViewSrc.value = props.defaultImage;
    } else {
      imageViewSrc.value = 'image-placeholder.jpg';
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.image-input {
  max-height: 600px;
}
</style>
