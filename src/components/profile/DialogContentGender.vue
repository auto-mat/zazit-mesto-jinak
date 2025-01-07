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
        <!-- Input: gender -->
        <div class="col-12">
          <!-- Label -->
          <label
            for="form-gender"
            class="text-grey-10 text-caption text-bold"
          >
            {{ $t('form.labelGender') }}
          </label>
          <!-- Options -->
          <q-option-group
            inline
            dense
            id="form-gender"
            v-model="newGender"
            :options="optionsGender"
            color="primary"
            class="q-mt-sm q-gutter-x-lg"
          />
          </div>
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
import { useI18n } from 'vue-i18n';
import { FormOption } from '../types/Form';

const { t } = useI18n()

const props = defineProps({
  gender: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update', 'cancel'])

const newGender = ref(props.gender)

// TODO also at registration, to one component
const optionsGender: FormOption[] = [
      {
        label: t('gender.male'),
        value: 'male',
      },
      {
        label: t('gender.female'),
        value: 'female',
      },
      {
        label: t('gender.other'),
        value: 'other'
      },
      {
        label: t('gender.unknown'),
        value: 'unknown',
      },
    ];

const onSubmit = () => {
  emit('update', newGender.value)
}

const onReset = () => {
  newGender.value = props.gender
  emit('cancel')
}
</script>