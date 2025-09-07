<template>
  <div class="row items-center fit q-my-sm">
    <div class="col-3">
       {{ label }}
    </div>
    <div class="col">
      <slot />
    </div>
    <div class="col text-right">
      <slot name="button">
        <q-btn
          v-if="!noButton"
          rounded
          unelevated
          outline
          color="primary"
          icon="edit"
          :label="$t('profile.buttonEdit')"
          @click="$emit('edit')"
        />
      </slot>
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

defineEmits(['edit'])

</script>