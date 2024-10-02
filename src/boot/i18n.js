import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { defaultLocale, fallbackLocale } from 'src/i18n/def_locale'

export default ({ app }) => {
  // Create I18n instance
  const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: fallbackLocale,
    globalInjection: true,
    legacy: false, // comment this out if not using Composition API
    messages,
  })

  // Tell app to use the I18n instance
  app.use(i18n)
}