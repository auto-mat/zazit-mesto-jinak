<template>
  <ul class="language-list flex" :class="{ 'bg-white': shortVersion }">
    <!-- Language switcher items -->
    <li v-for="item in localeOptions" :key="item.value" class="text-uppercase">
      <q-btn
        unelevated
        rounded
        @click.prevent="setLocale(item.value)"
        :class="{
          'bg-dark text-white': isActive(item.value),
          'btn--no-hover': readonly,
        }"
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
 * - `value` (UserLanguage, required): The current language.
 * - `shortVersion` (boolean, default: false): Enable short variant of language in text.
 * - `readonly` (boolean, default: false): Whether the language switcher is readonly.
 *
 * @events
 * - `updateLocale`: Emitted when the language is updated.
 *
 * @example
 * <language-switcher :value="UserLanguage.CS" @updateLocale="onUpdateLocale" />
 */

// libraries
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';

// enums
import { UserLanguage } from 'src/enums/userEnums';

const props = defineProps<{
  value: UserLanguage;
  shortVersion?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits(['updateLocale']);

const { locale, t } = useI18n({ useScope: 'global' });

const localeOptions = [
  { value: UserLanguage.EN, label: t('locale.en') },
  { value: UserLanguage.CS, label: t('locale.cz') },
];

watch(
  () => props.value,
  (newVal) => {
    setLocale(newVal);
  },
);

const setLocale = (item: UserLanguage): void => {
  if (props.readonly) {
    return;
  }
  locale.value = item;
  emit('updateLocale', item);
};

const isActive = (item: UserLanguage): boolean => {
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

.btn--no-hover {
  pointer-events: none;
}

:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}
</style>
