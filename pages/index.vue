<template>
  <div class="space-y-20 pb-20">
    
    <!-- Hero Section -->
    <section class="relative min-h-[88vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <!-- Background Image with Ambient Glow -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=2200&auto=format&fit=crop" 
          alt="Nine Arches Bridge Ella Sri Lanka" 
          class="w-full h-full object-cover object-center transform scale-105"
        />
        <div class="absolute inset-0 hero-gradient-overlay"></div>
      </div>

      <!-- Hero Main Container (Wider max-w-6xl) -->
      <div class="relative z-10 w-full max-w-[1400px] mx-auto text-center space-y-8">
        
        <!-- Top Sleek Search Bar (Minimalist, No heavy grey background) -->
        <div class="max-w-2xl mx-auto backdrop-blur-md bg-black/25 dark:bg-black/40 p-1.5 rounded-full border border-white/30 shadow-2xl transition-all">
          <div class="flex items-center gap-2">
            <div class="flex-1 flex items-center pl-4 sm:pl-5">
              <span class="text-amber-300 text-base mr-2.5">🔍</span>
              <input 
                v-model="quickSearchQuery" 
                type="text" 
                placeholder="Search destinations, villas, towns (e.g. Sigiriya, Ella, Mirissa)..."
                class="w-full py-2.5 bg-transparent text-white placeholder-slate-300 text-xs sm:text-sm outline-none font-medium selection:bg-brand-500"
                @keyup.enter="handleHeroQuickSearch"
              />
            </div>
            <button 
              @click="handleHeroQuickSearch"
              class="px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/40 flex items-center gap-1.5 transition-all"
            >
              <span>Explore</span>
              <span>→</span>
            </button>
          </div>
        </div>

        <!-- Grand Main Headline & Slogan -->
        <div class="space-y-4 max-w-5xl mx-auto">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-serif leading-tight uppercase drop-shadow-md">
            Discover the Pearl <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-brand-300 to-amber-300 font-serif">
              of the Indian Ocean
            </span>
          </h1>
          <p class="text-base sm:text-xl text-slate-200 font-sans font-medium tracking-wide">
            Discover Sri Lanka’s Untamed Beauty & Stays
          </p>
          <p class="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            From misty highland tea hills to pristine southern surf coasts. Find iconic landmarks, hidden waterfalls, and boutique stays.
          </p>
        </div>

        <!-- 5 Wider, Transparent Frameless Stat Cards (Screen-wide layout) -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 w-full max-w-5xl mx-auto pt-4 text-white">
          
          <!-- Card 1: Districts -->
          <div class="p-4 rounded-3xl backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 shadow-lg text-center hover:bg-white/15 transition-all duration-300 flex flex-col justify-center">
            <span class="text-xl mb-1">🗺️</span>
            <p class="text-3xl font-extrabold text-brand-300 font-sans">25</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-200 font-bold mt-0.5">Districts</p>
          </div>

          <!-- Card 2: Attractions -->
          <div class="p-4 rounded-3xl backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 shadow-lg text-center hover:bg-white/15 transition-all duration-300 flex flex-col justify-center">
            <span class="text-xl mb-1">🏔️</span>
            <p class="text-3xl font-extrabold text-amber-300 font-sans">{{ places.length }}+</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-200 font-bold mt-0.5">Attractions</p>
          </div>

          <!-- Card 3: Stays -->
          <div class="p-4 rounded-3xl backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 shadow-lg text-center hover:bg-white/15 transition-all duration-300 flex flex-col justify-center">
            <span class="text-xl mb-1">🏡</span>
            <p class="text-3xl font-extrabold text-cyan-300 font-sans">{{ stays.length }}+</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-200 font-bold mt-0.5">Villas & Stays</p>
          </div>

          <!-- Card 4: Active Travelers -->
          <div class="p-4 rounded-3xl backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 shadow-lg text-center hover:bg-white/15 transition-all duration-300 flex flex-col justify-center">
            <span class="text-xl mb-1">👥</span>
            <p class="text-3xl font-extrabold text-emerald-400 font-sans">1.2k+</p>
            <p class="text-[11px] uppercase tracking-wider text-slate-200 font-bold mt-0.5">Travelers</p>
          </div>

          <!-- Card 5: Interactive Member Rating Card -->
          <div 
            @click="handleRatingCardClick"
            class="col-span-2 sm:col-span-1 p-4 rounded-3xl backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 shadow-lg text-center cursor-pointer hover:border-amber-400 hover:bg-white/20 transition-all duration-300 flex flex-col justify-center relative group"
            title="Click to rate the platform"
          >
            <span class="text-xl mb-1">⭐</span>
            <p class="text-3xl font-extrabold text-amber-400 font-sans">
              ★ {{ platformRatingStats.average }}
            </p>
            <p class="text-[11px] uppercase tracking-wider text-slate-200 font-bold mt-0.5 flex items-center justify-center gap-1">
              <span>Rating</span>
              <span v-if="!hasUserRatedPlatform" class="text-[10px] text-amber-300 group-hover:underline">Rate ✍️</span>
              <span v-else class="text-[10px] text-emerald-300">✓ Rated</span>
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- Section 2: Interactive Discovery & Filter Engine (Immediately Below Hero) -->
    <section id="explore-section" class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6 scroll-mt-24">
      <div class="space-y-1 text-center sm:text-left">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
          Search & Filter Places
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Filter by district, town, or category with instant live results.
        </p>
      </div>

      <!-- Filter Controls Bar -->
      <div class="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
          
          <!-- Search input -->
          <div class="sm:col-span-4 relative">
            <span class="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Filter by keyword (e.g. Sigiriya, Beach)..."
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
              class="w-full py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Quick Category Chips -->
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
          <span class="text-slate-400 font-bold uppercase text-[9px] flex-shrink-0">Category:</span>
          <button 
            v-for="chip in quickCategoryChips" 
            :key="chip.label"
            @click="toggleCategoryChip(chip.val)"
            class="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all"
            :class="filters.category === chip.val ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
          >
            {{ chip.emoji }} {{ chip.label }}
          </button>
        </div>
      </div>

      <!-- Live Search Results (Places + Stays) -->
      <div class="space-y-8">
        <div class="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong>{{ sectionFilteredPlaces.length }}</strong> attractions and <strong>{{ sectionFilteredStays.length }}</strong> stays
          </span>
          <NuxtLink to="/explore" class="text-brand-500 font-bold hover:underline">
            All Listings & Map →
          </NuxtLink>
        </div>

        <!-- Attractions Grid -->
        <div v-if="sectionFilteredPlaces.length > 0" class="space-y-4">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏔️ Tourist Attractions</span>
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
            <span>🏡 Boutique Stays</span>
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
          <p class="text-xs text-slate-500">Try searching for Sigiriya, Ella, Galle, or Waterfall.</p>
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
    <section class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
            Featured Attractions
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">Top rated places across Sri Lanka</p>
        </div>

        <NuxtLink 
          to="/places" 
          class="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white text-slate-900 dark:text-white text-xs font-bold transition-all"
        >
          View All →
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

    <!-- Curated Stays Showcase -->
    <section class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
            Boutique Villas & Stays
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">Direct host contact with zero commissions</p>
        </div>

        <NuxtLink 
          to="/stays" 
          class="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white text-slate-900 dark:text-white text-xs font-bold transition-all"
        >
          View All →
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
    <section class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
            Explore by District
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">Explore Sri Lanka region by region</p>
        </div>

        <NuxtLink 
          to="/districts" 
          class="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white text-slate-900 dark:text-white text-xs font-bold transition-all"
        >
          All 25 Districts →
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
    <section class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 space-y-4">
      <div class="text-center space-y-1 max-w-xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
          Interactive Sri Lanka Map
        </h2>
        <p class="text-xs text-slate-500">
          Click any pin to discover places and boutique stays.
        </p>
      </div>
      <InteractiveMap :places="places" :stays="stays" />
    </section>

    <!-- Community Contribution CTA Banner -->
    <section class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-900 via-brand-700 to-amber-800 p-8 sm:p-12 text-white shadow-xl">
        <div class="relative z-10 max-w-2xl space-y-4">
          <span class="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
            🤝 Community Platform
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold font-serif">
            Know a Beautiful Spot or Host a Villa?
          </h2>
          <p class="text-xs sm:text-sm text-brand-100 font-light leading-relaxed">
            Share your favorite travel discovery with fellow explorers.
          </p>
          <div class="flex flex-wrap gap-3 pt-1">
            <button 
              @click="handleContributePlace"
              class="px-6 py-3 rounded-2xl bg-white hover:bg-brand-50 text-brand-900 font-extrabold text-xs shadow-md"
            >
              + Submit Place
            </button>
            <button 
              @click="handleContributeStay"
              class="px-6 py-3 rounded-2xl bg-brand-950/60 hover:bg-brand-950 text-white font-bold text-xs border border-white/20"
            >
              🏡 List Stay
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Member Rating Modal -->
    <div v-if="ratingModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800 text-center">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">Rate TravelGuide LK</h3>
          <button @click="ratingModalOpen = false" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div v-if="hasUserRatedPlatform" class="py-6 space-y-3">
          <span class="text-4xl">⭐</span>
          <h4 class="font-bold text-slate-900 dark:text-white text-base">You have already rated TravelGuide LK!</h4>
          <p class="text-xs text-slate-500">
            Thank you for being part of our verified community. Each member can submit one platform rating.
          </p>
          <button 
            @click="ratingModalOpen = false"
            class="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300"
          >
            Close
          </button>
        </div>

        <div v-else-if="!ratingSubmitted" class="space-y-4">
          <p class="text-xs text-slate-500">
            How would you rate TravelGuide LK as a member?
          </p>
          
          <div class="flex justify-center gap-3 py-1">
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
            Submit Member Rating (★ {{ selectedRating }})
          </button>
        </div>

        <div v-else class="py-6 space-y-3">
          <span class="text-4xl">🎉</span>
          <h4 class="font-bold text-slate-900 dark:text-white text-base">Thank You for Your Rating!</h4>
          <p class="text-xs text-slate-500">
            Your rating has been recorded and updated the live community score.
          </p>
          <button 
            @click="ratingModalOpen = false"
            class="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300"
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
import { useRouter } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const router = useRouter()
const { 
  places, 
  stays, 
  districts, 
  getTownsByDistrict, 
  globalFilter, 
  currentUser, 
  platformRatingStats, 
  hasUserRatedPlatform, 
  submitPlatformRating, 
  openAuthModal 
} = useTravelData()

const quickSearchQuery = ref('')
const filters = globalFilter

// Rating Modal state
const ratingModalOpen = ref(false)
const selectedRating = ref(5)
const ratingSubmitted = ref(false)

const handleRatingCardClick = () => {
  if (!currentUser.value) {
    openAuthModal('login', 'Please log in to submit your platform rating.')
  } else {
    ratingModalOpen.value = true
  }
}

const handlePlatformRatingSubmit = () => {
  const result = submitPlatformRating(selectedRating.value)
  if (result.success) {
    ratingSubmitted.value = true
    setTimeout(() => {
      ratingModalOpen.value = false
      ratingSubmitted.value = false
    }, 2000)
  }
}

const handleContributePlace = () => {
  if (!currentUser.value) {
    openAuthModal('login', 'Please log in to submit a tourist place.')
  } else {
    router.push('/submit')
  }
}

const handleContributeStay = () => {
  if (!currentUser.value) {
    openAuthModal('login', 'Please log in to list an accommodation.')
  } else {
    router.push('/submit?type=stay')
  }
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
