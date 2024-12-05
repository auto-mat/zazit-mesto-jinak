<template>
  <div class="row items-center">
    <div class="col-2">
       {{ label }}
    </div>
    <div class="col">
      <slot />
    </div>
    <div class="col">
      <q-btn
        rounded
        unelevated
        outline
        color="primary"
        icon="edit"
        :label="$t('profile.editButton')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: ''
  },
})

</script>