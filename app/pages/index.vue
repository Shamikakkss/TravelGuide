<template>
  <div class="space-y-20 pb-20">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Hero Image with Slow Zoom Animation -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=2000&auto=format&fit=crop" 
          alt="Nine Arches Bridge Ella Sri Lanka" 
          class="w-full h-full object-cover object-center transform scale-105 animate-pulse duration-1000"
        />
        <div class="absolute inset-0 hero-gradient-overlay"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <!-- Sri Lanka Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-xs font-semibold tracking-wide border border-white/30 shadow-lg">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>DISCOVER THE PEARL OF THE INDIAN OCEAN 🇱🇰</span>
        </div>

        <!-- Hero Headline -->
        <div class="space-y-4">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-serif leading-tight">
            Discover Sri Lanka’s <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-amber-200 to-brand-400">
              Untamed Beauty & Stays
            </span>
          </h1>
          <p class="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
            From misty highland tea hills to pristine southern surf coasts. Discover iconic landmarks, hidden waterfalls, and boutique villas recommended by real travelers.
          </p>
        </div>

        <!-- Dynamic Hero Search Bar -->
        <HeroSearch />

        <!-- Key Metrics Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 text-white">
          <div class="p-3 rounded-2xl glass-panel text-center">
            <p class="text-2xl sm:text-3xl font-extrabold text-brand-400">25</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-300 font-medium">Districts Covered</p>
          </div>
          <div class="p-3 rounded-2xl glass-panel text-center">
            <p class="text-2xl sm:text-3xl font-extrabold text-amber-300">{{ places.length }}+</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-300 font-medium">Top Attractions</p>
          </div>
          <div class="p-3 rounded-2xl glass-panel text-center">
            <p class="text-2xl sm:text-3xl font-extrabold text-cyan-300">{{ stays.length }}+</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-300 font-medium">Villas & Cabins</p>
          </div>
          <div class="p-3 rounded-2xl glass-panel text-center">
            <p class="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-300 font-medium">Verified Community</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Attractions Showcase -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-500">
            <span>✨ Must-Visit Destinations</span>
          </div>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans mt-1">
            Top Rated Attractions
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Handpicked gems across Sri Lanka with community ratings & insider tips.
          </p>
        </div>

        <NuxtLink 
          to="/places" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-900 dark:text-white text-xs font-bold transition-all self-start md:self-auto"
        >
          <span>View All Attractions</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- Places Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceCard 
          v-for="place in featuredPlaces" 
          :key="place.id" 
          :place="place" 
        />
      </div>
    </section>

    <!-- Curated Stays & Villas Showcase -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-500">
            <span>🏡 Unique Accommodations</span>
          </div>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans mt-1">
            Boutique Villas, Cabins & Eco Lodges
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Directly connect with hosts and experience authentic Sri Lankan hospitality.
          </p>
        </div>

        <NuxtLink 
          to="/stays" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-900 dark:text-white text-xs font-bold transition-all self-start md:self-auto"
        >
          <span>View All Stays</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- Stays Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StayCard 
          v-for="stay in featuredStays" 
          :key="stay.id" 
          :stay="stay" 
        />
      </div>
    </section>

    <!-- Explore by District Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-500">
            <span>📍 Regional Discovery</span>
          </div>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans mt-1">
            Explore by District
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            From the cool mist of Central Highlands to the southern beaches and cultural triangle.
          </p>
        </div>

        <NuxtLink 
          to="/districts" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-900 dark:text-white text-xs font-bold transition-all self-start md:self-auto"
        >
          <span>All 25 Districts</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- District Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DistrictCard 
          v-for="district in districts.slice(0, 6)" 
          :key="district.id" 
          :district="district" 
        />
      </div>
    </section>

    <!-- Interactive Map Section Preview -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="text-center space-y-2 max-w-xl mx-auto">
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
          Interactive Sri Lanka Map
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Click any location marker to preview attractions and boutique accommodations.
        </p>
      </div>
      <InteractiveMap :places="places" :stays="stays" />
    </section>

    <!-- Community Contribution CTA Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative rounded-4xl overflow-hidden bg-gradient-to-r from-brand-900 via-brand-700 to-amber-800 p-8 sm:p-12 text-white shadow-2xl">
        <div class="relative z-10 max-w-2xl space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <span>🤝 Community Powered</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold font-serif leading-tight">
            Know a Beautiful Place or Host a Unique Stay?
          </h2>
          <p class="text-sm sm:text-base text-brand-100 leading-relaxed font-light">
            Share your secret waterfall, scenic hike, or boutique villa with travelers from around the world. Every submission is reviewed by our team to maintain top quality.
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            <NuxtLink 
              to="/submit"
              class="px-6 py-3.5 rounded-2xl bg-white hover:bg-brand-50 text-brand-900 font-extrabold text-sm shadow-lg active:scale-95 transition-all"
            >
              + Submit New Place
            </NuxtLink>
            <NuxtLink 
              to="/submit?type=stay"
              class="px-6 py-3.5 rounded-2xl bg-brand-950/60 hover:bg-brand-950 text-white font-bold text-sm border border-white/20 active:scale-95 transition-all"
            >
              🏡 List Accommodation
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTravelData } from '~/composables/useTravelData'

const { places, stays, districts } = useTravelData()

const featuredPlaces = computed(() => {
  return places.value.slice(0, 6)
})

const featuredStays = computed(() => {
  return stays.value.slice(0, 4)
})
</script>
