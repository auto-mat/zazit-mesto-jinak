<template>
  <div :style="{ maxWidth: zazitMestoJinakConfig.containerFormWidth }">
    <h1>{{ t('login.title') }}</h1>
    <div class="q-mt-lg">
      <form-login />
      <div class="q-mt-xl">
        {{ t('login.withoutAccount') }}
        <router-link :to="registerLink">
          {{ t('login.register') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormLogin from 'src/components/form/login/FormLogin.vue';
import { routesConf } from 'src/router/routes_conf';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const registerLink = routesConf['register']['path'];

defineOptions({
  name: 'LoginPage',
});
</script>
