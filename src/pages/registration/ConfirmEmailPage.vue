<template>
  <div
    class="bg-white q-pa-md rounded-borders"
    :style="{ maxWidth: zazitMestoJinakConfig.containerFormWidth }"
  >
    <h1>{{ t('confirmEmail.title') }}</h1>
    <p>{{ t('confirmEmail.description', { email: email ?? '' }) }}</p>

    <q-btn
      :label="t('confirmEmail.confirm')"
      type="button"
      unelevated
      rounded
      color="primary"
      class="full-width q-mt-lg"
      @click="registerStore.confirmVerification"
    />
  </div>
</template>

<script setup lang="ts">
// libraries
import { useRoute } from 'vue-router';
import { Notify } from 'quasar';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
// import { routesConf } from 'src/router/routes_conf';

//stores
import { useRegisterStore } from 'src/stores/register';

// api
import { postApi } from 'src/api/apiFetch';

defineOptions({
  name: 'ConfirmEmailPage',
});

const route = useRoute();
const { t } = useI18n();
const registerStore = useRegisterStore();

const email = ref('');
const isLoading = ref(false);

onMounted(async () => {
  const key = route.query.key as string;
  email.value = route.query.email as string;

  if (!key) {
    Notify.create({
      message: t('error.invalidConfirmationLink'),
      color: 'negative',
    });
    return;
  }

  isLoading.value = true;

  await postApi(zazitMestoJinakConfig.urlApiConfirmEmail + `${key}/`, {});

  isLoading.value = false;
});
</script>
