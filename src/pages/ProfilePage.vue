<template>
  <q-page class="column q-pa-xl">
    <h1 class="q-mb-md">{{ $t('profile.title') }}</h1>
    <h2>{{ $t('profile.subtitle') }}</h2>

    <div class="q-mt-md" style="width: 800px; max-width: 100%;">
      <profile-row @edit="openDialog('name')">
       <span class="name">{{ user.name }}</span>
      </profile-row>
      <profile-row :label="$t('profile.emailLabel')" >
        {{ user.email }}
        <template v-slot:button>
          <q-btn
            rounded
            unelevated
            outline
            color="primary"
            icon="mail"
            :label="$t('profile.buttonAskForChange')"
            @click="openDialog('email')"
          />
        </template>
      </profile-row>
      <profile-row :label="$t('profile.phoneLabel')" @edit="openDialog('phone')">
        {{ user.phone }}
      </profile-row>
      <profile-row :label="$t('profile.genderLabel')" @edit="openDialog('gender')">
        {{ $t(`gender.${user.gender}`) }}
      </profile-row>
      <profile-row :label="$t('profile.languagePrefer')" no-button>
        <language-switcher />
      </profile-row>
    </div>

    <q-dialog v-model="editDialogOpen">
      <div class="bg-white q-px-md q-py-lg" style="width: 600px; max-width: 90vw;">
        <dialog-content-name
          v-if="currentComponent === 'name'"
          :first-name="user.name" 
          :last-name="user.surname"
          @cancel="editDialogOpen = false" 
          @update="updateName"
        />
        <dialog-content-phone
          v-if="currentComponent === 'phone'"
          :phone="user.phone"
          @cancel="editDialogOpen = false"
          @update="updatePhone"
        />
        <dialog-content-gender
          v-if="currentComponent === 'gender'"
          :gender="user.gender"
          @cancel="editDialogOpen = false"
          @update="updateGender"
        />
        <dialog-content-email
          v-if="currentComponent === 'email'"
          @cancel="editDialogOpen = false"
          @update="updateEmail"
        />
      </div>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ProfileRow from 'src/components/profile/ProfileRow.vue';
import LanguageSwitcher from 'src/components/global/LanguageSwitcher.vue';
import DialogContentName from 'src/components/profile/DialogContentName.vue';
import DialogContentPhone from 'src/components/profile/DialogContentPhone.vue';
import DialogContentGender from 'src/components/profile/DialogContentGender.vue';
import DialogContentEmail from 'src/components/profile/DialogContentEmail.vue';
import { useUserStore } from 'src/stores/userStore';

defineOptions({
  name: 'ProfilePage'
});

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUserDetails();
})

// const isLoading = computed(() => userStore.isLoading);
const user = computed(() => userStore.getUserDetails);

const currentComponent = ref('')
const editDialogOpen = ref(false)

const openDialog = (componentKey: string) => {
  currentComponent.value = componentKey
  editDialogOpen.value = true
}

const updateName = (firstName: string, lastName: string) => {
  // TODO
  console.log(firstName, lastName)
  editDialogOpen.value = false
}

const updatePhone = (phone: string) => {
  // TODO
  console.log(phone)
  editDialogOpen.value = false
}

const updateGender = (gender: string) => {
  // TODO
  console.log(gender)
  editDialogOpen.value = false
}

const updateEmail = () => {
  // TODO
  console.log('Email update message')
  editDialogOpen.value = false
}

</script>

<style scoped>
.name {
  font-size: 20pt;
}
</style>