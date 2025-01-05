<template>
  <div>
    <h3>{{ $t('profile.editNameDialogTitle') }}</h3>
    <q-separator spaced="lg"/>
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="text-grey-10"
    >
      <div class="row q-col-gutter-md q-mb-sm">
        <!-- Input: first name -->
        <form-field-text
          v-model="newFirstName"
          name="form-first-name"
          label="form.labelFirstName"
          autocomplete="given-name"
          class="col-12 col-sm-6"
          data-cy="form-register-personal-details-first-name"
        />
        <!-- Input: last name -->
        <form-field-text
          v-model="newLastName"
          name="form-last-name"
          label="form.labelLastName"
          autocomplete="family-name"
          class="col-12 col-sm-6"
          data-cy="form-register-personal-details-last-name"
        />
      </div>
      <div class="flex justify-end q-mt-lg q-gutter-sm">
        <q-btn
            rounded
            unelevated
            outline
            type="reset"
            color="primary"
            :label="$t('profile.buttonCancel')"
          />  
          <q-btn
            rounded
            unelevated
            type="submit"
            color="primary"
            :label="$t('profile.buttonUpdate')"
          />
        </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormFieldText from '../form/global/FormFieldText.vue';

const props = defineProps({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update', 'cancel'])

const newFirstName = ref(props.firstName)
const newLastName = ref(props.lastName)

const onSubmit = () => {
  emit('update', newFirstName.value, newLastName.value)
}

const onReset = () => {
  newFirstName.value = props.firstName
  newLastName.value = props.lastName
  emit('cancel')
}
</script>