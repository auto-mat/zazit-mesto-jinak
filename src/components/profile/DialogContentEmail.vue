<template>
  <div>
    <h3>{{ $t('profile.editNameDialogTitle') }}</h3>
    <q-separator spaced="lg"/>
    <div>
      <p>{{ $t('profile.textEmailChange') }}</p>
    </div>
    <div class="flex justify-end q-mt-lg q-gutter-sm">
      <q-btn
        rounded
        unelevated
        outline
        color="primary"
        :label="$t('profile.buttonCancel')"
        @click="$emit('cancel')"
      />  
      <q-btn
        rounded
        unelevated
        color="primary"
        :label="$t('profile.buttonYes')"
        @click="$emit('update')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['update', 'cancel'])

</script>