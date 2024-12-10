<template>
  <div class="row items-center fit q-my-sm">
    <div class="col-2">
       {{ label }}
    </div>
    <div class="col-5">
      <slot />
    </div>
    <div class="col-5">
      <q-btn
        v-if="!noButton"
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
  noButton: {
    type: Boolean,
    defaul: false
  }
})

</script>