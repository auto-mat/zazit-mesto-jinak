<template>
  <div>
    <!-- Form: event organizer company -->
    <q-form
      autofocus
      @submit="emit('save')"
      @reset="emit('reset')"
      class="q-gutter-md text-grey-10"
    >
      <!-- Heading -->
      <h2 class="q-mt-0 q-mb-sm text-body1 text-weight-bold">
        {{ t('event.organizers.titleEditCompany') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-sm">
          <!-- Name -->
          <form-field-text
            v-model="eventOrganizerCompanyForm.title"
            name="form-title"
            label="event.organizers.labelCompanyTitle"
            class="col-12 col-sm-6"
          />
          <!-- Business type -->
          <div class="col-12 col-sm-6">
            <form-label for="business-type" optional>
              {{ t('event.organizers.labelBusinessType') }}
            </form-label>
            <q-select
              outlined
              dense
              id="business-type"
              v-model="selectedBusinessType"
              :options="optionsBusinessType"
              class="q-mt-sm"
              clearable
            />
          </div>
          <!-- ICO -->
          <form-field-text
            v-model="eventOrganizerCompanyForm.ico"
            name="form-ico"
            label="event.organizers.labelIco"
            class="col-12 col-sm-6"
          />
          <!-- DIC -->
          <form-field-text
            v-model="eventOrganizerCompanyForm.dic"
            name="form-dic"
            label="event.organizers.labelDic"
            class="col-12 col-sm-6"
          />
        </div>
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
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// components
import FormFieldText from 'src/components/form/global/FormFieldText.vue';
import FormLabel from 'src/components/form/global/FormLabel.vue';

// stores
import { useEventOrganizersStore } from 'src/stores/event/organizers';

// types
import { FormOption } from 'src/types/Form';

const emit = defineEmits(['save', 'reset']);

const { t } = useI18n();
const eventOrganizersStore = useEventOrganizersStore();

const { eventOrganizerCompanyForm, isEventOrganizersSaving, companyTypes } =
  storeToRefs(eventOrganizersStore);

const optionsBusinessType = computed<FormOption[]>(() =>
  companyTypes.value.map((companyType) => ({
    label: companyType.type,
    value: companyType.id,
  })),
);

const selectedBusinessType = ref<FormOption | null>(
  optionsBusinessType.value.find(
    (option) => option.value === eventOrganizerCompanyForm.value.businessType,
  ) ?? null,
);

watch(selectedBusinessType, (newVal: FormOption | null) => {
  eventOrganizerCompanyForm.value.businessType = newVal?.value ?? null;
});
</script>
