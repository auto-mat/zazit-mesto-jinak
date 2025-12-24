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
        <q-icon size="100px" color="secondary" name="mail" />
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
            @click="updateUserZmjNewsPreferences"
          />
          <q-btn
            v-else
            :label="t('home.news.buttonSubscribe')"
            color="primary"
            rounded
            unelevated
            @click="updateUserZmjNewsPreferences"
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
            @click="updateUserAllNewsPreferences"
          />
          <q-btn
            v-else
            :label="t('home.news.buttonSubscribe')"
            color="primary"
            rounded
            unelevated
            @click="updateUserAllNewsPreferences"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
/**
 * News box component
 * Displays the news box with the news preferences
 *
 * @example
 * <news-box />
 */
// libraries
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

// stores
import { useUserStore } from 'src/stores/user';

// config
import { zazitMestoJinakConfig } from 'src/boot/global_vars';

const { t } = useI18n();

const userStore = useUserStore();
const { userNewsPreferences } = storeToRefs(userStore);

const zmjNewsSubscribed = computed(
  () => userNewsPreferences.value?.onlyOrganizerNews ?? false,
);
const allNewsSubscribed = computed(
  () => userNewsPreferences.value?.allNews ?? false,
);

const updateUserAllNewsPreferences = async (): Promise<void> => {
  userNewsPreferences.value.allNews = !userNewsPreferences.value.allNews;
  await userStore.updateUserNewsPreferences();
};

const updateUserZmjNewsPreferences = async (): Promise<void> => {
  userNewsPreferences.value.onlyOrganizerNews =
    !userNewsPreferences.value.onlyOrganizerNews;
  await userStore.updateUserNewsPreferences();
};
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  padding: 20px;
}
</style>
