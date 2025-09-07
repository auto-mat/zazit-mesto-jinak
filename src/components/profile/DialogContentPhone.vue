<template>
  <div>
    <h3>{{ $t('profile.titleEditPhone') }}</h3>
    <q-separator spaced="lg"/>
    <q-form
      autofocus
      @submit="onSubmit"
      @reset="onReset"
      class="text-grey-10"
    >
      <div class="row q-col-gutter-md q-mb-sm">
        <!-- Input: phone-->
        <form-field-phone
          v-model="newPhone"
          class="col-12 col-sm-6"
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
import FormFieldPhone from '../form/global/FormFieldPhone.vue';

const props = defineProps({
  phone: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update', 'cancel'])

const newPhone = ref(props.phone)

const onSubmit = () => {
  emit('update', newPhone.value)
}

const onReset = () => {
  newPhone.value = props.phone
  emit('cancel')
}
</script>