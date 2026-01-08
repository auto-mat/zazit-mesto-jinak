<template>
  <div>
    <!-- Form: event organizers -->
    <q-form
      autofocus
      @submit="emit('save')"
      @reset="emit('reset')"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2 class="q-mt-0 q-mb-sm text-body1 text-weight-bold">
        {{ t('event.organizers.titleEditOrganizers') }}
      </h2>
      <div class="q-mt-lg">
        <div v-for="(organizer, index) in eventOrganizersForm" :key="index">
          <div class="row q-col-gutter-md q-my-sm">
            <!-- Name -->
            <form-field-text
              v-model="organizer.name"
              name="form-name"
              label="event.organizers.labelName"
              class="col-12 col-sm-6"
            />
            <!-- Surname -->
            <form-field-text
              v-model="organizer.surname"
              name="form-surname"
              label="event.organizers.labelSurname"
              class="col-12 col-sm-6"
            />
            <!-- Email -->
            <form-field-email
              v-model="organizer.email"
              class="col-12 col-sm-6"
            />
            <!-- Phone -->
            <form-field-phone
              v-model="organizer.phone"
              label="event.organizers.labelPhone"
              class="col-12 col-sm-6"
            />
            <div class="col-12 flex justify-end items-center">
              <q-btn
                rounded
                unelevated
                outline
                color="primary"
                icon="delete"
                :label="t('event.organizers.buttonDeleteOrganizer')"
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
          :label="t('event.organizers.buttonAddOrganizer')"
          class="q-mt-md"
          @click="addOrganizer"
        />
      </div>
      <!-- Buttons -->
      <div class="flex justify-end q-gutter-sm q-mt-lg">
        <q-btn
          rounded
          unelevated
          outline
          type="reset"
          color="primary"
          :label="t('event.organizers.buttonCancel')"
        />
        <q-btn
          rounded
          unelevated
          type="submit"
          color="primary"
          :label="t('event.organizers.buttonSave')"
          :loading="isEventOrganizersSaving"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
/**
 * FormEventOrganizers Component
 *
 * The `FormEventOrganizers` is used to edit information about organizers.
 *
 * @description * Use this component to display event organizers form.
 *
 * @events
 * - `save`: Emitted when the event organizers are saved.
 * - `reset`: Emitted when the event organizers are reset.
 *
 * @example
 * <form-event-organizers @save="onSave" @reset="onReset" />
 *
 */

// libraries
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormFieldEmail from 'src/components/form/global/FormFieldEmail.vue';
import FormFieldPhone from 'src/components/form/global/FormFieldPhone.vue';

// types
import { EventOrganizer } from 'src/types/Event';

// stores
import { useEventOrganizersStore } from 'src/stores/event/organizers';

const emit = defineEmits(['save', 'reset']);

const { t } = useI18n();
const eventOrganizersStore = useEventOrganizersStore();

const { eventOrganizersForm, isEventOrganizersSaving } =
  storeToRefs(eventOrganizersStore);

const addOrganizer = (): void => {
  const newOrganizer: EventOrganizer = {
    id: null,
    name: '',
    surname: '',
    email: '',
    phone: '',
  };

  eventOrganizersForm.value.push(newOrganizer);
};

const deleteOrganizer = (index: number): void => {
  eventOrganizersForm.value.splice(index, 1);
};
</script>
