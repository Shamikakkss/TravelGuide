// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  telemetry: false,

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'TravelGuide LK — Discover Sri Lanka Attractions & Boutique Stays',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        {
          name: 'description',
          content: 'Discover pristine beaches, misty mountains, ancient heritage, luxury villas, and authentic stays across Sri Lanka with real traveler reviews and community recommendations.'
        },
        { name: 'theme-color', content: '#c06b52' },
        { property: 'og:title', content: 'TravelGuide LK — Discover Sri Lanka Attractions & Boutique Stays' },
        { property: 'og:description', content: 'Explore 25 districts, hidden waterfalls, iconic landmarks, boutique villas and cabins in Sri Lanka.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        }
      ]
    }
  },

  typescript: {
    strict: true
  }
})
