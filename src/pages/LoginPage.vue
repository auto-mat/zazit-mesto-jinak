<template>
  <q-page class="q-px-xl q-py-xl">
    <h1>{{ $t('login.title') }}</h1>
    <div class="row q-mt-lg">
      <div class="col-12 col-md-4">
        <form-login />
        <div class="q-mt-xl">
          {{ $t('login.withoutAccount') }}
          <router-link :to="registerLink">
            {{ $t('login.register') }}
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FormLogin from 'src/components/form/login/FormLogin.vue';
import { routesConf } from 'src/router/routes_conf';

const registerLink = routesConf['register']['path'];

defineOptions({
  name: 'LoginPage',
});
</script>
