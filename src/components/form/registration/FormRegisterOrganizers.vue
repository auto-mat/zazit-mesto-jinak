<template>
  <div>
    <!-- Form: register event -->
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md text-grey-10"
    >
      <div class="row q-col-gutter-md q-mb-xl">
        <form-field-radio-group
          v-model="choice"
          :options="optionsChoiceOrganizers"
        />
      </div>

      <div v-if="choice == 'company'" class="q-mb-md">
        <h3 class="text-body2 text-weight-bold q-mb-md">
          {{ t('register.organizers.titleCompany') }}
        </h3>
        <div class="row q-col-gutter-md">
          <form-field-text
            v-model="registerFormState.organizers.company.title"
            name="form-title"
            label="event.organizers.labelCompanyTitle"
            required
            bg-color="white"
            class="col-12 col-sm-6"
          />
          <div class="col-12 col-sm-6">
            <label
              for="business-type"
              class="text-grey-10 text-caption text-bold"
            >
              {{ t('event.organizers.labelBusinessType') }}
            </label>
            <q-select
              outlined
              dense
              id="business-type"
              v-model="selectedBusinessType"
              :options="optionsBusinessType"
              class="q-mt-sm"
              bg-color="white"
            />
          </div>
          <form-field-text
            v-model="registerFormState.organizers.company.ico"
            name="form-ico"
            label="event.organizers.labelIco"
            required
            bg-color="white"
            class="col-12 col-sm-6"
          />
          <form-field-text
            v-model="registerFormState.organizers.company.dic"
            name="form-dic"
            label="event.organizers.labelDic"
            required
            bg-color="white"
            class="col-12 col-sm-6"
          />
        </div>
      </div>

      <div class="column q-mt-lg">
        <h3 class="text-body2 text-weight-bold">
          {{ t('register.organizers.titleOrganizers') }}
        </h3>
        <span class="text-caption">
          {{ t('register.organizers.subtitleOrganizers') }}
        </span>
        <div
          v-for="(organizer, index) in registerFormState.organizers.organizers"
          :key="index"
          class="q-mb-sm"
        >
          <div class="text-right">
            <span class="text-caption">
              {{
                t('register.organizers.titleOrganizer', { number: index + 1 })
              }}
            </span>
            <q-btn
              round
              flat
              color="primary"
              icon="delete"
              @click="deleteOrganizer(index)"
            />
          </div>
          <div class="row q-col-gutter-md">
            <form-field-text
              v-model="organizer.name"
              name="form-name"
              label="form.labelFirstName"
              bg-color="white"
              class="col-12 col-sm-6"
            />
            <form-field-text
              v-model="organizer.surname"
              name="form-surname"
              label="form.labelLastName"
              bg-color="white"
              class="col-12 col-sm-6"
            />
            <form-field-email
              v-model="organizer.email"
              bg-color="white"
              class="col-12 col-sm-6"
            />
            <form-field-phone
              v-model="organizer.phone"
              label="form.labelPhone"
              bg-color="white"
              class="col-12 col-sm-6"
            />
          </div>
          <!-- <q-separator spaced="md" /> -->
        </div>
        <div>
          <q-btn
            rounded
            unelevated
            outline
            color="primary"
            icon="add"
            :label="t('register.organizers.buttonAddOrganizer')"
            class="q-mt-md"
            @click="addOrganizer"
          />
        </div>
      </div>
      <!-- Button: back and submit -->
      <div class="flex justify-end q-gutter-sm q-mt-lg">
        <q-btn
          rounded
          unelevated
          outline
          type="reset"
          color="primary"
          :label="t('register.organizers.buttonBack')"
        />
        <q-btn
          rounded
          unelevated
          type="submit"
          color="primary"
          :label="t('register.organizers.buttonSubmit')"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
/**
 * FormRegisterOrganizers Component
 *
 * The `FormRegisterOrganizers` is used to gather information about company and more organizers in registeration.
 *
 * @description * Use this component to display registration form.
 *
 * @events
 * - `submit`: Emitted when the form is submitted.
 * - `back`: Emitted when the form is reset.
 *
 * @example
 * <form-register-organizers @submit="onSubmit" @back="onBack" />
 */

// libraries
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// stores
import { useRegisterStore } from 'src/stores/register';

// components
import FormFieldText from '../global/FormFieldText.vue';
import FormFieldRadioGroup from '../global/FormFieldRadioGroup.vue';
import FormFieldEmail from '../global/FormFieldEmail.vue';
import FormFieldPhone from '../global/FormFieldPhone.vue';

// types
import { FormOption } from 'src/types/Form';

const emit = defineEmits(['submit', 'back']);

const { t } = useI18n();

const choice = ref('person');

const registerStore = useRegisterStore();
const { registerFormState, companyTypes } = storeToRefs(registerStore);

const optionsChoiceOrganizers: FormOption[] = [
  {
    label: t('register.organizers.choicePerson'),
    value: 'person',
  },
  {
    label: t('register.organizers.choiceCompany'),
    value: 'company',
  },
];

const optionsBusinessType = computed<FormOption[]>(() =>
  companyTypes.value.map((companyType) => ({
    label: companyType.type,
    value: companyType.id,
  })),
);

const selectedBusinessType = ref<FormOption | null>(null);

watch(selectedBusinessType, (newVal: FormOption | null) => {
  registerFormState.value.organizers.company.businessType = newVal?.value;
});

const addOrganizer = (): void => {
  const newLink = {
    name: '',
    surname: '',
    email: '',
    phone: '',
  };

  registerFormState.value.organizers.organizers.push(newLink);
};

const deleteOrganizer = (index: number): void => {
  registerFormState.value.organizers.organizers.splice(index, 1);
};

const onSubmit = (): void => {
  emit('submit');
};

const onReset = (): void => {
  emit('back');
};
</script>
