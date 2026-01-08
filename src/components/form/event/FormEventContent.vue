<template>
  <div>
    <!-- Form: event content -->
    <q-form
      autofocus
      @submit="emit('save')"
      @reset="emit('reset')"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2 class="q-mt-0 q-mb-sm text-body1 text-weight-bold">
        {{ t('event.content.titleEditContent') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-mb-lg">
          <!-- Input: image -->
          <form-field-image
            v-model="eventContentForm.image"
            :default-image="defaultImageSrc"
            class="col-12 col-md-8"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-lg">
          <!-- Input: main text -->
          <form-field-editor
            v-model="eventContentForm.mainContent"
            class="col-12"
          />
        </div>
        <div class="q-mt-md">
          <h3 class="q-mt- q-mb-sm text-body2 text-weight-bold">
            {{ t('event.content.labelLinks') }}
          </h3>
          <div
            v-for="(link, index) in eventContentForm.links"
            :key="index"
            class="row items-center q-mb-sm"
          >
            <div class="col-12 col-sm-5 q-pr-md">
              <form-field-text
                v-model="link.title"
                name="link-title"
                :label="t('event.content.labelLinkTitle')"
                required
              />
            </div>
            <div class="col-10 col-sm-6">
              <form-field-text
                v-model="link.url"
                name="link-url"
                :label="t('event.content.labelLinkUrl')"
                required
              />
            </div>
            <div class="col-2 col-sm-1">
              <q-btn
                round
                flat
                color="primary"
                icon="delete"
                @click="deleteLink(index)"
              />
            </div>
          </div>
          <q-btn
            v-if="eventContentForm.links.length < 3"
            rounded
            unelevated
            outline
            color="primary"
            icon="add"
            :label="t('event.content.buttonAddLink')"
            @click="addLink"
          />
        </div>
      </div>
      <!-- Buttons -->
      <div class="flex justify-end q-mt-lg q-gutter-x-sm">
        <q-btn
          rounded
          unelevated
          outline
          type="reset"
          color="primary"
          :label="t('event.content.buttonReset')"
        />
        <q-btn
          rounded
          unelevated
          type="submit"
          color="primary"
          :label="t('event.content.buttonSave')"
          :loading="isEventContentSaving"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
/**
 * FormEventContent Component
 *
 * The `FormEventContent` is used to gather information about event for content on web ZMJ.
 *
 * @description * Use this component to display event content form.
 *
 * @events
 * - `save`: Emitted when the form is submitted.
 * - `reset`: Emitted when the form is reset.
 *
 * @example
 * <form-event-content @save="save" @reset="reset" />
 *
 */

// libraries
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldEditor from './FormFieldEditor.vue';
import FormFieldImage from './FormFieldImage.vue';

// types
import { Link } from 'src/types/Event';

// stores
import { useEventContentStore } from 'src/stores/event/content';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const emit = defineEmits(['save', 'reset']);

const { t } = useI18n();
const eventContentStore = useEventContentStore();

const {
  eventContentForm,
  eventContent,
  isEventContentSaving,
  isEventContentFormDirty,
} = storeToRefs(eventContentStore);

const defaultImageSrc = computed(() => {
  if (eventContent.value?.image) {
    return zazitMestoJinakConfig.urlBaseBackend + eventContent.value.image;
  }
  return 'image-placeholder.jpg';
});

const addLink = (): void => {
  const newLink: Link = { title: '', url: '' };
  eventContentForm.value.links.push(newLink);
};

const deleteLink = (index: number): void => {
  eventContentForm.value.links.splice(index, 1);
};

watch(
  eventContentForm,
  () => {
    isEventContentFormDirty.value = true;
  },
  { deep: true },
);
</script>
