<template>
  <ul class="language-list flex">
    <!-- Language switcher items -->
    <li
      v-for="item in localeOptions"
      :key="item.value"
      class="text-uppercase"
      :data-cy="'switcher-' + item.value"
    >
      <q-btn
        unelevated
        rounded
        @click.prevent="setLocale(item.value)"
        :class="{ 'bg-dark text-white': isActive(item.value) }"
        size="13px"
      >
        {{ shortVersion ? item.value : item.label }}
      </q-btn>
    </li>
  </ul>
</template>

<script setup lang="ts">
/**
 * LanguageSwitcher Component
 *
 * The `LanguageSwitcher` component provides an interface for users to switch
 * between different languages available in the application.
 *
 * @description
 * This component renders a list of available languages and allows users to
 * switch their preferred language. It uses the `i18n` to
 * manage and retrieve the current language and available translations.
 *
 * @props
 * - `shortVariant`: Enable short variant of language in text.
 *
 * @example
 * <language-switcher />
 */

// libraries
import { useI18n } from 'vue-i18n';

defineProps<{
  shortVersion?: boolean;
}>();

const { locale, t } = useI18n({ useScope: 'global' });

const localeOptions = [
  { value: 'en', label: t('locale.en') },
  { value: 'cs', label: t('locale.cz') },
];

const setLocale = (item: string) => {
  locale.value = item;
};

const isActive = (item: string): boolean => {
  return locale.value === item;
};
</script>

<style scoped>
.language-list {
  list-style: none;
  border: 1px solid black;
  border-radius: 999px;
  width: fit-content;
  padding: 1px;
}
</style>
