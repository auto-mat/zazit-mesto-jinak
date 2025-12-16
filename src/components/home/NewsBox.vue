<template>
  <q-card
    class="card"
    flat
    bordered
    :style="{ maxWidth: zazitMestoJinakConfig.containerContentWidth }"
  >
    <q-card-section class="q-pb-none text-center">
      <span class="text-h6 text-weight-bold">{{ t('home.news.title') }}</span>
    </q-card-section>
    <q-card-section class="row">
      <div class="col-12 col-md-2 row justify-center items-center">
        <q-avatar
          size="100px"
          font-size="100px"
          text-color="secondary"
          icon="mail"
        />
      </div>
      <div class="col-12 col-md-10">
        <div class="q-mb-sm">{{ t('home.news.description') }}</div>
        <div class="row justify-between items-center q-gutter-sm q-py-md">
          <span>{{ t('home.news.zmjNews') }}</span>
          <q-btn
            v-if="zmjNewsSubscribed"
            :label="t('home.news.buttonAlreadySubscribed')"
            color="primary"
            outline
            rounded
            icon="check"
            disable
          />
          <q-btn
            v-else
            :label="t('home.news.buttonSubscribe')"
            color="primary"
            rounded
            unelevated
          />
        </div>
        <q-separator />
        <div class="row justify-between items-center q-gutter-sm q-py-md">
          <span>{{ t('home.news.allNews') }}</span>
          <q-btn
            v-if="allNewsSubscribed"
            :label="t('home.news.buttonAlreadySubscribed')"
            color="primary"
            outline
            rounded
            icon="check"
            disable
          />
          <q-btn
            v-else
            :label="t('home.news.buttonSubscribe')"
            color="primary"
            rounded
            unelevated
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const { t } = useI18n();

const zmjNewsSubscribed = ref(true);
const allNewsSubscribed = ref(false);
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  padding: 20px;
}
</style>
