<template>
  <div>
    <h1>{{ t('login.title') }}</h1>
    <div class="q-mt-lg">
      <form-login />
      <div class="q-mt-xl">
        {{ t('login.withoutAccount') }}
        <router-link :to="routesConf['signup']['path']">
          {{ t('login.register') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// libraries
import { useI18n } from 'vue-i18n';

// config
import { routesConf } from 'src/router/routes_conf';

// components
import FormLogin from 'src/components/form/login/FormLogin.vue';

const { t } = useI18n();

defineOptions({
  name: 'LoginPage',
});
</script>
