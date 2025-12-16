<template>
  <q-card
    class="card"
    flat
    bordered
    :style="{ maxWidth: zazitMestoJinakConfig.containerContentWidth }"
  >
    <q-card-section class="q-pb-none text-center">
      <span class="text-h6 text-weight-bold">{{
        t('home.zmjTips.title')
      }}</span>
    </q-card-section>
    <q-card-section class="row">
      <div class="col-12 col-md-10">
        <div class="q-mb-lg">{{ t('home.zmjTips.description') }}</div>
        <div class="row justify-center">
          <q-btn
            :label="t('home.zmjTips.buttonTips')"
            color="primary"
            rounded
            unelevated
            :href="zazitMestoJinakConfig.urlZMJManual"
            target="_blank"
          />
        </div>
      </div>
      <div class="col-12 col-md-2 row justify-center items-center">
        <q-icon size="100px" color="secondary" name="self_improvement" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const { t } = useI18n();
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  padding: 20px;
}
</style>
