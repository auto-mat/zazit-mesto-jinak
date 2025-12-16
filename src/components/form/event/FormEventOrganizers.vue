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
import { EventOrganizers, EventOrganizer } from 'src/types/Event';
import { useEventStore } from 'src/stores/event';
import { useRouter, useRoute } from 'vue-router';
import { routesConf } from 'src/router/routes_conf';

export default defineComponent({
  name: 'FormEventOrganizers',
  components: {
    FormFieldText,
    FormFieldEmail,
    FormFieldPhone,
  },
  props: {
    organizers: {
      type: Object as PropType<EventOrganizers>,
      required: true,
    },
  },
  emits: ['save'],
  setup(props, { emit }) {
    const formEventOrganizers: EventOrganizers = reactive(props.organizers);
    const eventStore = useEventStore();
    const router = useRouter();
    const route = useRoute();
    const addOrganizer = (): void => {
      const newLink: EventOrganizer = {
        name: '',
        surname: '',
        email: '',
        phone: '',
      };

      formEventOrganizers.push(newLink);
    };

    const deleteOrganizer = (index: number): void => {
      formEventOrganizers.splice(index, 1);
    };

    const onSubmit = (): void => {
      eventStore.updateEventOrganizers(
        eventStore.eventOrganizerCompany,
        formEventOrganizers,
      );
      emit('save');
    };

    const onReset = (): void => {
      router.push({
        name: routesConf['event_organizers']['children']['name'],
        params: { slug: route.params.slug as string },
      });
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
      <h2 class="q-mt-0 q-mb-sm text-body1 text-weight-bold">
        {{ $t('event.organizers.titleEditOrganizers') }}
      </h2>
      <div class="q-mt-lg">
        <div v-for="(organizer, index) in formEventOrganizers" :key="index">
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
            <div class="col-12 flex justify-end items-center">
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
