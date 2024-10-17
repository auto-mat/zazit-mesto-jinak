<template>
  <div class="user-button column items-center" data-cy="user-button">
    <q-btn rounded outline content-class="transparent" class="q-px-md q-py-md">
      <q-avatar size="40px" data-cy="avatar">
          <q-img
            :src="user.image.src"
            :alt="user.image.alt"
            size="40px"
            data-cy="avatar-image"
          />
        </q-avatar>
        <!-- User name -->
        <div class="col text-left q-ml-md ellipsis">
          {{ user.name }}
        </div>
    </q-btn>
  </div>
</template>

<script setup lang="ts">

const user = {
  image: {
    src: 'https://picsum.photos/300/300',
    alt: 'John Novak photo'
  },
  name: 'Jonh Novak'
}
</script>