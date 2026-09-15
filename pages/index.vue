<template>
  <div class="space-y-20 pb-20">
    
    <!-- Hero Section -->
    <section class="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Image with Ambient Glow -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=2000&auto=format&fit=crop" 
          alt="Nine Arches Bridge Ella Sri Lanka" 
          class="w-full h-full object-cover object-center transform scale-105"
        />
        <div class="absolute inset-0 hero-gradient-overlay"></div>
      </div>

      <!-- Hero Main Container -->
      <div class="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        <!-- Tagline Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-xs font-semibold tracking-wide border border-white/30 shadow-lg">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>DISCOVER THE PEARL OF THE INDIAN OCEAN 🇱🇰</span>
        </div>

        <!-- Headline & Subtitle -->
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

        <!-- Sleek Single Search Bar -->
        <div class="max-w-2xl mx-auto glass-panel p-2 rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/60 transition-all">
          <div class="flex items-center gap-2">
            <div class="flex-1 flex items-center pl-4">
              <span class="text-slate-400 text-base mr-2.5">🔍</span>
              <input 
                v-model="quickSearchQuery" 
                type="text" 
                placeholder="Search any destination (e.g. Sigiriya, Ella, Mirissa, Beach Villa)..."
                class="w-full py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none font-medium"
                @keyup.enter="handleHeroQuickSearch"
              />
            </div>
            <button 
              @click="handleHeroQuickSearch"
              class="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-sm shadow-md shadow-brand-500/30 flex items-center gap-1.5 transition-all"
            >
              <span>Search</span>
              <span>→</span>
            </button>
          </div>
        </div>

        <!-- Luxury Stat Cards Grid (6 Curated Metric Cards) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto pt-4 text-white">
          
          <!-- Card 1: Districts -->
          <div class="p-3.5 rounded-2xl glass-panel text-center hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
            <span class="text-lg mb-1">🗺️</span>
            <p class="text-2xl font-extrabold text-brand-400 font-sans">25</p>
            <p class="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">Districts Covered</p>
          </div>

          <!-- Card 2: Attractions -->
          <div class="p-3.5 rounded-2xl glass-panel text-center hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
            <span class="text-lg mb-1">🏔️</span>
            <p class="text-2xl font-extrabold text-amber-300 font-sans">{{ places.length }}+</p>
            <p class="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">Top Attractions</p>
          </div>

          <!-- Card 3: Stays -->
          <div class="p-3.5 rounded-2xl glass-panel text-center hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
            <span class="text-lg mb-1">🏡</span>
            <p class="text-2xl font-extrabold text-cyan-300 font-sans">{{ stays.length }}+</p>
            <p class="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">Villas & Cabins</p>
          </div>

          <!-- Card 4: Active Travelers -->
          <div class="p-3.5 rounded-2xl glass-panel text-center hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
            <span class="text-lg mb-1">👥</span>
            <p class="text-2xl font-extrabold text-sky-400 font-sans">1,200+</p>
            <p class="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">Active Travelers</p>
          </div>

          <!-- Card 5: Verified Community -->
          <div class="p-3.5 rounded-2xl glass-panel text-center hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
            <span class="text-lg mb-1">🔒</span>
            <p class="text-2xl font-extrabold text-emerald-400 font-sans">100%</p>
            <p class="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">Verified Stays</p>
          </div>

          <!-- Card 6: Interactive Member Rating Card -->
          <div 
            @click="ratingModalOpen = true"
            class="p-3.5 rounded-2xl glass-panel text-center cursor-pointer hover:border-amber-400 hover:scale-105 transition-all duration-300 flex flex-col justify-center relative group"
            title="Click to rate the platform"
          >
            <span class="text-lg mb-1">⭐</span>
            <p class="text-2xl font-extrabold text-amber-400 font-sans">
              {{ platformRatingStats.average }} <span class="text-xs font-normal text-amber-200">★</span>
            </p>
            <p class="text-[10px] uppercase tracking-wider text-slate-300 font-semibold flex items-center justify-center gap-1">
              <span>Member Rating</span>
              <span class="text-[9px] text-amber-300 group-hover:underline">Rate ✍️</span>
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- Section 2: Interactive Discovery & Filter Engine (Immediately Below Hero) -->
    <section id="explore-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-28">
      <div class="space-y-3 text-center sm:text-left">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          <span>⚡ Live Interactive Discovery</span>
        </div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
          Search & Filter Sri Lanka Places
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          Filter by district, town, category, or stay type with live results below.
        </p>
      </div>

      <!-- Filter Controls Bar -->
      <div class="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
          
          <!-- Search input -->
          <div class="sm:col-span-4 relative">
            <span class="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Filter by keyword (e.g. Sigiriya, Mirissa, Beach)..."
              class="w-full pl-9 pr-3 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-slate-900 dark:text-white text-xs outline-none"
            />
          </div>

          <!-- District -->
          <div class="sm:col-span-3">
            <select 
              v-model="filters.district" 
              class="w-full px-3 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-slate-900 dark:text-white text-xs outline-none cursor-pointer"
            >
              <option value="All">All 25 Districts</option>
              <option v-for="d in districts" :key="d.id" :value="d.name">{{ d.name }}</option>
            </select>
          </div>

          <!-- Town -->
          <div class="sm:col-span-3">
            <select 
              v-model="filters.town" 
              class="w-full px-3 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-slate-900 dark:text-white text-xs outline-none cursor-pointer"
            >
              <option value="All">All Towns</option>
              <option v-for="t in availableTowns" :key="t.id" :value="t.name">{{ t.name }}</option>
            </select>
          </div>

          <!-- Reset button -->
          <div class="sm:col-span-2">
            <button 
              @click="resetSectionFilters"
              class="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Quick Category Chips -->
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          <span class="text-slate-400 font-bold uppercase text-[10px] flex-shrink-0">Quick Filter:</span>
          <button 
            v-for="chip in quickCategoryChips" 
            :key="chip.label"
            @click="toggleCategoryChip(chip.val)"
            class="flex-shrink-0 px-3 py-1 rounded-full font-medium transition-all"
            :class="filters.category === chip.val ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
          >
            {{ chip.emoji }} {{ chip.label }}
          </button>
        </div>
      </div>

      <!-- Live Search Results (Places + Stays) -->
      <div class="space-y-8">
        <div class="flex items-center justify-between text-xs text-slate-500">
          <span class="font-medium">
            Showing <strong>{{ sectionFilteredPlaces.length }}</strong> attractions and <strong>{{ sectionFilteredStays.length }}</strong> stays
          </span>
          <NuxtLink to="/explore" class="text-brand-500 font-bold hover:underline">
            Open Advanced Explorer →
          </NuxtLink>
        </div>

        <!-- Attractions Grid -->
        <div v-if="sectionFilteredPlaces.length > 0" class="space-y-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏔️ Matching Attractions</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{{ sectionFilteredPlaces.length }}</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard 
              v-for="place in sectionFilteredPlaces" 
              :key="place.id" 
              :place="place" 
            />
          </div>
        </div>

        <!-- Stays Grid -->
        <div v-if="sectionFilteredStays.length > 0" class="space-y-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏡 Matching Accommodations</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{{ sectionFilteredStays.length }}</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StayCard 
              v-for="stay in sectionFilteredStays" 
              :key="stay.id" 
              :stay="stay" 
            />
          </div>
        </div>

        <!-- Empty State if no match -->
        <div 
          v-if="sectionFilteredPlaces.length === 0 && sectionFilteredStays.length === 0"
          class="p-12 text-center glass-panel rounded-3xl space-y-3"
        >
          <span class="text-4xl">🏝️</span>
          <h4 class="text-base font-bold text-slate-900 dark:text-white">No places match "{{ filters.search }}"</h4>
          <p class="text-xs text-slate-500">Try searching for Ella, Sigiriya, Galle, Mirissa, Waterfall, or Beach.</p>
          <button 
            @click="resetSectionFilters"
            class="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Top Attractions Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-500">
            <span>✨ Must-Visit Destinations</span>
          </div>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans mt-1">
            Featured Sri Lankan Attractions
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Handpicked gems across Sri Lanka with community ratings & travel tips.
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

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceCard 
          v-for="place in places.slice(0, 6)" 
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
            Boutique Villas & Forest Cabins
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

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StayCard 
          v-for="stay in stays.slice(0, 4)" 
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
            From the cool mist of Central Highlands to southern beaches and the cultural triangle.
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
          Click any location pin to preview attractions and boutique accommodations.
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
            Share your secret waterfall, scenic hike, or boutique villa with travelers from around the world.
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

    <!-- Platform Member Rating Modal -->
    <div v-if="ratingModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-5 border border-slate-200 dark:border-slate-800 text-center">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">Rate TravelGuide LK</h3>
          <button @click="ratingModalOpen = false" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div v-if="!ratingSubmitted" class="space-y-4">
          <p class="text-xs text-slate-500">
            How would you rate your experience exploring Sri Lanka through TravelGuide LK?
          </p>
          
          <div class="flex justify-center gap-3 py-2">
            <button 
              v-for="star in 5" 
              :key="star"
              @click="selectedRating = star"
              class="text-3xl transition-transform hover:scale-125 focus:outline-none"
              :class="star <= selectedRating ? 'text-amber-400 scale-110' : 'text-slate-300 dark:text-slate-700'"
            >
              ★
            </button>
          </div>

          <p class="text-xs font-bold text-amber-500">
            {{ selectedRating === 5 ? 'Exceptional! 🌟' : selectedRating === 4 ? 'Very Good! 😊' : selectedRating === 3 ? 'Good 👍' : 'Thank you!' }}
          </p>

          <button 
            @click="handlePlatformRatingSubmit"
            class="w-full py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all"
          >
            Submit Rating (★ {{ selectedRating }})
          </button>
        </div>

        <div v-else class="py-6 space-y-3">
          <span class="text-4xl">🎉</span>
          <h4 class="font-bold text-slate-900 dark:text-white text-lg">Thank You for Your Rating!</h4>
          <p class="text-xs text-slate-500">
            Your rating helps fellow explorers discover the best of Sri Lanka.
          </p>
          <button 
            @click="ratingModalOpen = false"
            class="px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTravelData } from '~/composables/useTravelData'

const { places, stays, districts, getTownsByDistrict, globalFilter, platformRatingStats, submitPlatformRating } = useTravelData()

const quickSearchQuery = ref('')
const filters = globalFilter

// Rating Modal state
const ratingModalOpen = ref(false)
const selectedRating = ref(5)
const ratingSubmitted = ref(false)

const handlePlatformRatingSubmit = () => {
  submitPlatformRating(selectedRating.value)
  ratingSubmitted.value = true
  setTimeout(() => {
    ratingModalOpen.value = false
    ratingSubmitted.value = false
  }, 2200)
}

// Towns for Section 2
const availableTowns = computed(() => {
  return getTownsByDistrict(filters.value.district)
})

const quickCategoryChips = [
  { label: 'All', val: 'All', emoji: '🌟' },
  { label: 'Beaches', val: 'Beach', emoji: '🏖️' },
  { label: 'Waterfalls', val: 'Waterfall', emoji: '🌊' },
  { label: 'Mountains', val: 'Mountain', emoji: '⛰️' },
  { label: 'Historical', val: 'Historical', emoji: '🏛️' },
  { label: 'Villas', val: 'Villa', emoji: '🏡' },
]

const toggleCategoryChip = (val: string) => {
  if (val === 'Villa') {
    filters.value.stayType = 'Villa'
    filters.value.category = 'All'
  } else {
    filters.value.category = val as any
    filters.value.stayType = 'All'
  }
}

const handleHeroQuickSearch = () => {
  filters.value.search = quickSearchQuery.value
  if (process.client) {
    const el = document.getElementById('explore-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const resetSectionFilters = () => {
  quickSearchQuery.value = ''
  filters.value.search = ''
  filters.value.district = 'All'
  filters.value.town = 'All'
  filters.value.category = 'All'
  filters.value.stayType = 'All'
  filters.value.minRating = 0
}

// Section Filtered Places
const sectionFilteredPlaces = computed(() => {
  return places.value.filter(p => {
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      const matches = p.name.toLowerCase().includes(q) ||
                      p.town.toLowerCase().includes(q) ||
                      p.district.toLowerCase().includes(q) ||
                      p.category.toLowerCase().includes(q)
      if (!matches) return false
    }
    if (filters.value.district !== 'All' && p.district.toLowerCase() !== filters.value.district.toLowerCase()) return false
    if (filters.value.town !== 'All' && p.town.toLowerCase() !== filters.value.town.toLowerCase()) return false
    if (filters.value.category && filters.value.category !== 'All' && p.category !== filters.value.category) return false
    return true
  })
})

// Section Filtered Stays
const sectionFilteredStays = computed(() => {
  return stays.value.filter(s => {
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      const matches = s.name.toLowerCase().includes(q) ||
                      s.town.toLowerCase().includes(q) ||
                      s.district.toLowerCase().includes(q) ||
                      s.type.toLowerCase().includes(q)
      if (!matches) return false
    }
    if (filters.value.district !== 'All' && s.district.toLowerCase() !== filters.value.district.toLowerCase()) return false
    if (filters.value.town !== 'All' && s.town.toLowerCase() !== filters.value.town.toLowerCase()) return false
    if (filters.value.stayType && filters.value.stayType !== 'All' && s.type !== filters.value.stayType) return false
    return true
  })
})
</script>
