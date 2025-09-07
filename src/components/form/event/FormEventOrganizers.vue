<script lang="ts">
/**
 * FormEventOrganizers Component
 *
 * The `FormEventOrganizers` is used to edit information about organizers.
 *
 * @description * Use this component to display event organizers form.
 *
 * @example
 * <form-event-organizers />
 *
 */

// libraries
import { defineComponent, PropType, reactive } from 'vue';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldEmail from 'src/components/form/global/FormFieldEmail.vue';
import FormFieldPhone from 'src/components/form/global/FormFieldPhone.vue';

// types
import { EventOrganizersType, EventOrganizerType } from 'src/types/Event';



export default defineComponent({
  name: 'FormEventOrganizers',
  components: {
    FormFieldText,
    FormFieldEmail,
    FormFieldPhone
  },
  props: {
    organizers: {
      type: Object as PropType<EventOrganizersType>,
      required: true
    }
  },
  emits: [
    'save'
  ],
  setup(props, { emit }) {
    const formEventOrganizers: EventOrganizersType = reactive(props.organizers);

    const addOrganizer = (): void => {
      const newLink: EventOrganizerType = { 
        name: '', 
        surname: '',
        email: '',
        phone: '',
        role: '' 
      }

      formEventOrganizers.push(newLink)
    }

    const deleteOrganizer = (index: number): void => {
      formEventOrganizers.splice(index, 1)
    }

    const onSubmit = (): void => {  
      // noop
      emit('save')
    };

    const onReset = (): void => {
      // noop
    };

    return {
      formEventOrganizers,
      addOrganizer,
      deleteOrganizer,
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
        <div
          v-for="(organizer, index) in formEventOrganizers"
          :key="index"
        >
          <div class="row q-col-gutter-md q-my-sm">
            <form-field-text
              v-model="organizer.name"
              name="form-name"
              label="event.organizers.labelName"
              class="col-12 col-sm-6"
            />
            <form-field-text
              v-model="organizer.surname"
              name="form-surname"
              label="event.organizers.labelSurname"
              class="col-12 col-sm-6"
            />
            <form-field-email 
              v-model="organizer.email"
              class="col-12 col-sm-6"
            />
            <form-field-phone
              v-model="organizer.phone"
              label="event.organizers.labelPhone"
              class="col-12 col-sm-6"
            />
            <!-- TODO select -->
            <form-field-text
              v-model="organizer.role"
              name="form-role"
              label="event.organizers.labelRole"
              class="col-12 col-sm-6"
            />
            <div class="col-12 col-sm-6 flex justify-end items-center">
              <q-btn
                rounded
                unelevated
                outline
                color="primary"
                icon="delete"
                :label="$t('event.organizers.buttonDeleteOrganizer')"
                @click="deleteOrganizer(index)"
              />
            </div>
           </div>
           <q-separator spaced="md" />
        </div>
        <q-btn
            rounded
            unelevated
            outline
            color="primary"
            icon="add"
            :label="$t('event.organizers.buttonAddOrganizer')"
            class="q-mt-md"
            @click="addOrganizer"
          />
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