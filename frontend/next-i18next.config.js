/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeDetection: true,
  },
  defaultNS: 'common',
  localePath: 'public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
