<script lang="ts">
/**
 * FormRegisterOrganizers Component
 *
 * The `FormRegisterOrganizers` is used to gather information about company and more organizers in registeration.
 *
 * @description * Use this component to display registration form.
 *
 * @example
 * <form-register-organizers />
 *
 */

// libraries
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// components
import FormFieldText from '../global/FormFieldText.vue';
import FormFieldRadioGroup from '../global/FormFieldRadioGroup.vue';
import FormFieldEmail from '../global/FormFieldEmail.vue';
import FormFieldPhone from '../global/FormFieldPhone.vue';

//types
import { FormOption } from 'src/types/Form';

export default defineComponent({
  name: 'FormRegisterOrganizers',
  components: {
    FormFieldText,
    FormFieldRadioGroup,
    FormFieldEmail,
    FormFieldPhone
  },
  setup() {
    const { t } = useI18n()

    const choice = ref('person')

    const formRegisterOrganizers = reactive([
      {
        name: '',
        surname: '',
        email: '',
        phone: ''
      }
    ]);

    const formRegisterCompany = reactive({
      title: '',
      businessType: '',
      ico: '',
      dic: '' 
    })

    const optionsChoiceOrganizers: FormOption[] = [
      {
        label: t('register.organizers.choicePerson'),
        value: 'person'
      },
      {
        label: t('register.organizers.choiceCompany'),
        value: 'company'
      }
    ]

    const addOrganizer = (): void => {
      const newLink = { 
        name: '', 
        surname: '',
        email: '',
        phone: ''
      }

      formRegisterOrganizers.push(newLink)
    }

    const deleteOrganizer = (index: number): void => {
      formRegisterOrganizers.splice(index, 1)
    }

    const onSubmit = (): void => {
      // noop
    };

    const onReset = (): void => {
      // noop
    };

    return {
      choice,
      optionsChoiceOrganizers,
      formRegisterOrganizers,
      formRegisterCompany,
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
    <!-- Form: register event -->
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
        {{ $t('register.organizers.title') }}
      </h2>
      <div class="q-mt-lg">
        <div class="row q-col-gutter-md q-mb-xl">
          <form-field-radio-group 
            v-model="choice" 
            :options="optionsChoiceOrganizers" 
          />
        </div>
        
        <div v-if="choice == 'company'" class="q-mb-md">
          <h3 class="text-body2 text-weight-bold q-mb-md">
            {{ $t('register.organizers.titleCompany') }}
          </h3>
          <div class="row q-col-gutter-md">
            <form-field-text
              v-model="formRegisterCompany.title"
              name="form-title"
              label="event.organizers.labelCompanyTitle"
              required
              class="col-12 col-sm-6"
            />
            <!-- TODO select -->
            <form-field-text
              v-model="formRegisterCompany.businessType"
              name="form-business-type"
              label="event.organizers.labelBusinessType"
              required
              class="col-12 col-sm-6"
            />
            <form-field-text
              v-model="formRegisterCompany.ico"
              name="form-ico"
              label="event.organizers.labelIco"
              required
              class="col-12 col-sm-6"
            />
            <form-field-text
              v-model="formRegisterCompany.dic"
              name="form-dic"
              label="event.organizers.labelDic"
              required
              class="col-12 col-sm-6"
            />
          </div>
        </div>
        
        <div class="column q-mt-lg">
          <h3 class="text-body2 text-weight-bold">
            {{ $t('register.organizers.titleOrganizers') }}
          </h3>
          <span class="text-caption">
            {{ $t('register.organizers.subtitleOrganizers') }}
          </span>
          <div 
            v-for="(organizer, index) in formRegisterOrganizers"
            :key="index"
            class="q-mb-sm"
          >
            <div class="text-right">
              <span class="text-caption">
                {{ $t('register.organizers.titleOrganizer', { number: index + 1 }) }}
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
                required
                class="col-12 col-sm-6"
              />
              <form-field-text
                v-model="organizer.surname"
                name="form-surname"
                label="form.labelLastName"
                required
                class="col-12 col-sm-6"
              />
              <form-field-email 
                v-model="organizer.email"
                required
                class="col-12 col-sm-6"
              />
              <form-field-phone
                v-model="organizer.phone"
                label="form.labelPhone"
                required
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
              :label="$t('register.organizers.buttonAddOrganizer')"
              class="q-mt-md"
              @click="addOrganizer"
            />
          </div>
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
            :label="$t('register.organizers.buttonBack')"
          />
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('register.organizers.buttonSubmit')"
          />
        </div>
    </q-form>
  </div>
</template>