<script lang="ts">
/**
 * FormEventContent Component
 *
 * The `FormEventContent` is used to gather information about event for content on web ZMJ.
 *
 * @description * Use this component to display event content form.
 *
 * @example
 * <form-event-content />
 *
 */

// libraries
import { defineComponent, PropType, reactive } from 'vue';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldEditor from './FormFieldEditor.vue';
import FormFieldImage from './FormFieldImage.vue';

// types
import { EventContentType, LinkType } from 'src/types/Event';



export default defineComponent({
  name: 'FormEventContent',
  components: {
    FormFieldText,
    FormFieldEditor,
    FormFieldImage
  },
  props: {
    eventContent: {
      type: Object as PropType<EventContentType>,
      required: true
    }
  },
  emits: [
    'save'
  ],
  setup(props, { emit }) {
    const formEventContent: EventContentType = reactive({
      image: props.eventContent.image,
      mainContent: props.eventContent.mainContent,
      links: props.eventContent.links,
    });

    const addLink = (): void => {
      const newLink: LinkType = { title: '', url: '' }
      formEventContent.links.push(newLink)
    }

    const deleteLink = (index: number): void => {
      formEventContent.links.splice(index, 1)
    }


    const onSubmit = (): void => {
      // noop
      emit('save')
    };

    const onReset = (): void => {
      // noop
    };

    return {
      formEventContent,
      addLink,
      deleteLink,
      onReset,
      onSubmit,
    };
  },
});
</script>

<template>
  <div>
    <!-- Form: event program item -->
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2
        class="q-mt-0 q-mb-sm text-body1 text-weight-bold"
      >
        {{ $t('event.content.titleEditContent') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-mb-lg">
          <!-- Input: image -->
          <form-field-image
            v-model="formEventContent.image"
            class="col-12 col-md-8"
          />
        </div>
        <div class="row q-col-gutter-md q-mb-lg">
          <!-- Input: main text -->
          <form-field-editor
            v-model="formEventContent.mainContent"
            class="col-12"
          />
        </div>
        <div class="q-mt-md">
          <h3 class="q-mt- q-mb-sm text-body2 text-weight-bold">
            {{ $t('event.content.labelLinks') }}
          </h3>
          <div 
            v-for="(link, index) in formEventContent.links" 
            :key="index"
            class="row items-center q-mb-sm"
            >
            <div class="col-12 col-sm-5 q-pr-md">
              <form-field-text
                v-model="link.title"
                name="link-title"
                :label="$t('event.content.labelLinkTitle')"
                required
              />
            </div>
            <div class="col-10 col-sm-6">
              <form-field-text
                v-model="link.url"
                name="link-url"
                :label="$t('event.content.labelLinkUrl')"
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
            rounded
            unelevated
            outline
            color="primary"
            icon="add"
            :label="$t('event.content.buttonAddLink')"
            @click="addLink"
          />
        </div>
        
      </div>
        <!-- Button: submit -->
        <div class="flex justify-end q-mt-lg">
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('event.program.buttonSave')"
          />
        </div>
    </q-form>
  </div>
</template>