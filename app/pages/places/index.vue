<template>
  <div class="space-y-10 pb-20">
    
    <!-- Hero Banner for Attractions -->
    <section class="relative min-h-[360px] flex items-center justify-center pt-12 pb-12 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          src="/images/sigiriya.jpg" 
          alt="Sri Lanka Attractions" 
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50"></div>
      </div>

      <div class="relative z-10 w-full max-w-[1600px] mx-auto text-center space-y-4">
        <span class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md inline-block">
          Sri Lanka Travel Guide
        </span>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight">
          Explore Iconic Attractions & Wonders
        </h1>
        <p class="max-w-2xl mx-auto text-xs sm:text-sm text-white/70 font-light leading-relaxed">
          From ancient UNESCO World Heritage fortresses and golden stupas to misty tea mountain peaks, rushing waterfalls, and secluded tropical beaches.
        </p>
      </div>
    </section>

    <!-- Main Container -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
      
      <!-- Filter Bar: Search, Category Chips, District & Sort -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-5">
        
        <!-- Search & Dropdown Filters -->
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
          
          <!-- Search input -->
          <div class="sm:col-span-5 relative">
            <span class="absolute left-3.5 top-3.5 text-slate-400 text-sm">🔍</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search by name, town, or feature (e.g. Sigiriya, Waterfall, Tea)..."
              class="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-slate-900 dark:text-white text-xs outline-none"
            />
          </div>

          <!-- District Selector -->
          <div class="sm:col-span-3">
            <select 
              v-model="selectedDistrict" 
              class="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-slate-900 dark:text-white text-xs outline-none cursor-pointer"
            >
              <option value="All">All Districts</option>
              <option v-for="d in districts" :key="d.id" :value="d.name">{{ d.name }}</option>
            </select>
          </div>

          <!-- Sort Selector -->
          <div class="sm:col-span-2">
            <select 
              v-model="sortBy" 
              class="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-slate-900 dark:text-white text-xs outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          <!-- Reset Button -->
          <div class="sm:col-span-2">
            <button 
              @click="resetFilters"
              class="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Quick Category Filter Chips -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button 
            @click="selectedCategory = 'All'"
            class="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            :class="selectedCategory === 'All' ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            All Categories ({{ places.length }})
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.name"
            @click="selectedCategory = cat.name"
            class="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
            :class="selectedCategory === cat.name ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            <span>{{ cat.emoji }}</span>
            <span>{{ cat.name }}</span>
            <span class="text-[10px] opacity-70">({{ getCategoryCount(cat.name) }})</span>
          </button>
        </div>
      </div>

      <!-- Results Header & Counter -->
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing <strong class="text-slate-900 dark:text-white font-bold">{{ displayedPlaces.length }}</strong> destination{{ displayedPlaces.length === 1 ? '' : 's' }}
          <span v-if="selectedCategory !== 'All'"> in <strong>{{ selectedCategory }}</strong></span>
          <span v-if="selectedDistrict !== 'All'"> in <strong>{{ selectedDistrict }} District</strong></span>
        </div>

        <NuxtLink 
          to="/submit?type=place"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all"
        >
          <span>+</span>
          <span>Suggest Attraction</span>
        </NuxtLink>
      </div>

      <!-- Attractions Grid -->
      <div v-if="displayedPlaces.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <PlaceCard 
          v-for="place in displayedPlaces" 
          :key="place.id" 
          :place="place" 
        />
      </div>

      <!-- Empty State -->
      <div 
        v-else 
        class="p-16 text-center glass-panel rounded-3xl space-y-4 max-w-lg mx-auto"
      >
        <span class="text-5xl block">🗺️</span>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">No attractions match your search</h3>
        <p class="text-xs text-slate-500">Try changing your filters or searching for something else.</p>
        <button 
          @click="resetFilters" 
          class="px-5 py-2.5 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-md"
        >
          Reset All Filters
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTravelData } from '~/composables/useTravelData'

const { places, districts } = useTravelData()

const searchQuery = ref('')
const selectedDistrict = ref('All')
const selectedCategory = ref('All')
const sortBy = ref('popular')

const categories = [
  { name: 'Historical', emoji: '🏛️' },
  { name: 'Mountain', emoji: '⛰️' },
  { name: 'Waterfall', emoji: '🌊' },
  { name: 'Beach', emoji: '🏖️' },
  { name: 'Temple', emoji: '🛕' },
  { name: 'Wildlife', emoji: '🐘' },
  { name: 'Viewpoint', emoji: '🌅' },
  { name: 'Nature', emoji: '🌿' }
]

const getCategoryCount = (catName: string) => {
  return places.value.filter(p => p.category === catName).length
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedDistrict.value = 'All'
  selectedCategory.value = 'All'
  sortBy.value = 'popular'
}

const displayedPlaces = computed(() => {
  let result = places.value.filter(p => {
    if (selectedDistrict.value !== 'All' && p.district.toLowerCase() !== selectedDistrict.value.toLowerCase()) {
      return false
    }
    if (selectedCategory.value !== 'All' && p.category !== selectedCategory.value) {
      return false
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchName = p.name.toLowerCase().includes(q)
      const matchTown = p.town.toLowerCase().includes(q)
      const matchDesc = p.shortDescription.toLowerCase().includes(q)
      const matchDistrict = p.district.toLowerCase().includes(q)
      const matchCategory = p.category.toLowerCase().includes(q)
      if (!matchName && !matchTown && !matchDesc && !matchDistrict && !matchCategory) {
        return false
      }
    }
    return true
  })

  // Sort
  if (sortBy.value === 'popular') {
    result = [...result].sort((a, b) => b.likesCount - a.likesCount)
  } else if (sortBy.value === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'reviews') {
    result = [...result].sort((a, b) => b.reviewsCount - a.reviewsCount)
  } else if (sortBy.value === 'name') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
})
</script>
