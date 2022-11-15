// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css:['@/assets/css/styles.css'],
    modules: ['@nuxtjs/tailwindcss'],
    build: { transpile: ['yup', 'lodash', '@vee-validate/rules'] }
})
