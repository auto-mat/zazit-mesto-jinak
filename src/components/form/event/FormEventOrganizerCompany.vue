<script lang="ts">
/**
 * FormEventOrganizerCompany Component
 *
 * The `FormEventOrganizerCompany` is used to edit information about company.
 *
 * @description * Use this component to display event organizer company form.
 *
 * @example
 * <form-event-organizer-company />
 *
 */

// libraries
import { defineComponent, PropType, reactive } from 'vue';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';

// types
import { EventOrganizerCompanyType } from 'src/types/Event';



export default defineComponent({
  name: 'FormEventOrganizerCompany',
  components: {
    FormFieldText
  },
  props: {
    company: {
      type: Object as PropType<EventOrganizerCompanyType>,
      required: true
    }
  },
  emits: [
    'save'
  ],
  setup(props, { emit }) {
    const formEventOrganizerCompany: EventOrganizerCompanyType = reactive({
      title: props.company.title,
      businessType: props.company.businessType,
      ico: props.company.ico,
      dic: props.company.dic
    });

    const onSubmit = (): void => {
      // noop
      emit('save')
    };

    const onReset = (): void => {
      // noop
    };

    return {
      formEventOrganizerCompany,
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
        {{ $t('event.organizers.titleEditCompany') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-sm">
          <form-field-text
            v-model="formEventOrganizerCompany.title"
            name="form-title"
            label="event.organizers.labelCompanyTitle"
            class="col-12 col-sm-6"
          />
          <form-field-text
            v-model="formEventOrganizerCompany.businessType"
            disabled
            name="form-business-type"
            label="event.organizers.labelBusinessType"
            class="col-12 col-sm-6"
          />
          <form-field-text
            v-model="formEventOrganizerCompany.ico"
            name="form-ico"
            label="event.organizers.labelIco"
            class="col-12 col-sm-6"
          />
          <form-field-text
            v-model="formEventOrganizerCompany.dic"
            name="form-dic"
            label="event.organizers.labelDic"
            class="col-12 col-sm-6"
          />
        </div>
      </div>
        <!-- Button: submit -->
        <div class="flex justify-end q-gutter-sm q-mt-lg">
          <q-btn
            rounded
            unelevated
            outline
            type="reset"
            color="primary"
            :label="$t('event.organizers.buttonCancel')"
          />
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('event.organizers.buttonSave')"
          />
        </div>
    </q-form>
  </div>
</template>