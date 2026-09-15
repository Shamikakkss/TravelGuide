<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <!-- Page Header & Search Bar -->
    <div class="space-y-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
            Explore Sri Lanka
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover {{ filteredPlaces.length }} attractions and {{ filteredStays.length }} stays across Sri Lanka.
          </p>
        </div>

        <!-- Mode Toggle (All / Places / Stays) + Map View Switch -->
        <div class="flex items-center gap-3">
          <!-- View type (All / Places / Stays) -->
          <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <button 
              @click="activeTab = 'all'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              :class="activeTab === 'all' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm' : 'text-slate-600 dark:text-slate-400'"
            >
              All ({{ filteredPlaces.length + filteredStays.length }})
            </button>
            <button 
              @click="activeTab = 'places'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              :class="activeTab === 'places' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm' : 'text-slate-600 dark:text-slate-400'"
            >
              Attractions ({{ filteredPlaces.length }})
            </button>
            <button 
              @click="activeTab = 'stays'"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              :class="activeTab === 'stays' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm' : 'text-slate-600 dark:text-slate-400'"
            >
              Stays ({{ filteredStays.length }})
            </button>
          </div>

          <!-- Grid / Map Toggle Button -->
          <button 
            @click="isMapView = !isMapView"
            class="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:border-brand-500"
          >
            <span>{{ isMapView ? '📋 Grid' : '🗺️ Map' }}</span>
          </button>
        </div>
      </div>

      <!-- Quick Search Bar -->
      <div class="relative flex items-center">
        <span class="absolute left-4 text-slate-400 text-lg">🔍</span>
        <input 
          v-model="filters.search" 
          type="text" 
          placeholder="Search by destination name, town, keyword, or villa type (e.g. Ella, Mirissa, Beach, Waterfall)..."
          class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none shadow-subtle transition-all"
        />
        <button 
          v-if="filters.search" 
          @click="filters.search = ''"
          class="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Main Content Area: Sidebar Filters + Listings or Map -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <!-- Left Sidebar Filters -->
      <div class="lg:col-span-1">
        <FilterDrawer :mode="activeTab" />
      </div>

      <!-- Right Main Listings Area -->
      <div class="lg:col-span-3 space-y-8">
        <!-- Active Filter Badges -->
        <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 text-xs">
          <span class="text-slate-400 font-semibold">Active:</span>
          <span v-if="filters.district !== 'All'" class="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1">
            District: {{ filters.district }}
            <button @click="filters.district = 'All'" class="hover:text-brand-800">×</button>
          </span>
          <span v-if="filters.town !== 'All'" class="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1">
            Town: {{ filters.town }}
            <button @click="filters.town = 'All'" class="hover:text-brand-800">×</button>
          </span>
          <span v-if="filters.category && filters.category !== 'All'" class="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1">
            Category: {{ filters.category }}
            <button @click="filters.category = 'All'" class="hover:text-brand-800">×</button>
          </span>
          <span v-if="filters.minRating && filters.minRating > 0" class="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 font-medium flex items-center gap-1">
            Rating: {{ filters.minRating }}★+
            <button @click="filters.minRating = 0" class="hover:text-amber-800">×</button>
          </span>
        </div>

        <!-- Map View -->
        <div v-if="isMapView" class="space-y-4 animate-fadeIn">
          <InteractiveMap 
            :places="activeTab !== 'stays' ? filteredPlaces : []" 
            :stays="activeTab !== 'places' ? filteredStays : []" 
          />
        </div>

        <!-- Grid View -->
        <div v-else class="space-y-10">
          <!-- Places Group (if activeTab is 'all' or 'places') -->
          <div v-if="activeTab !== 'stays' && filteredPlaces.length > 0" class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🏔️ Tourist Attractions</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">{{ filteredPlaces.length }}</span>
              </h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlaceCard 
                v-for="place in filteredPlaces" 
                :key="place.id" 
                :place="place" 
              />
            </div>
          </div>

          <!-- Stays Group (if activeTab is 'all' or 'stays') -->
          <div v-if="activeTab !== 'places' && filteredStays.length > 0" class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🏡 Stays & Villas</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">{{ filteredStays.length }}</span>
              </h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StayCard 
                v-for="stay in filteredStays" 
                :key="stay.id" 
                :stay="stay" 
              />
            </div>
          </div>

          <!-- Empty State -->
          <div 
            v-if="(activeTab === 'all' && filteredPlaces.length === 0 && filteredStays.length === 0) || 
                   (activeTab === 'places' && filteredPlaces.length === 0) || 
                   (activeTab === 'stays' && filteredStays.length === 0)"
            class="text-center py-20 glass-panel rounded-3xl space-y-4"
          >
            <span class="text-5xl">🏝️</span>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">No listings match your search</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your district, town, or category filters to discover more places across Sri Lanka.
            </p>
            <button 
              @click="resetAllFilters"
              class="px-5 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const route = useRoute()
const { places, stays, globalFilter } = useTravelData()

const activeTab = ref<'all' | 'places' | 'stays'>('all')
const isMapView = ref(false)
const filters = globalFilter

// Populate filter from route query if present
if (route.query.q) filters.value.search = String(route.query.q)
if (route.query.district) filters.value.district = String(route.query.district)
if (route.query.town) filters.value.town = String(route.query.town)

const hasActiveFilters = computed(() => {
  return filters.value.district !== 'All' || 
         filters.value.town !== 'All' || 
         (filters.value.category && filters.value.category !== 'All') ||
         (filters.value.minRating && filters.value.minRating > 0)
})

const resetAllFilters = () => {
  filters.value.search = ''
  filters.value.district = 'All'
  filters.value.town = 'All'
  filters.value.category = 'All'
  filters.value.stayType = 'All'
  filters.value.minRating = 0
}

const filteredPlaces = computed(() => {
  return places.value.filter(p => {
    // Search query
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      const matches = p.name.toLowerCase().includes(q) ||
                      p.town.toLowerCase().includes(q) ||
                      p.district.toLowerCase().includes(q) ||
                      p.category.toLowerCase().includes(q) ||
                      p.shortDescription.toLowerCase().includes(q)
      if (!matches) return false
    }

    // District
    if (filters.value.district !== 'All' && p.district.toLowerCase() !== filters.value.district.toLowerCase()) {
      return false
    }

    // Town
    if (filters.value.town !== 'All' && p.town.toLowerCase() !== filters.value.town.toLowerCase()) {
      return false
    }

    // Category
    if (filters.value.category && filters.value.category !== 'All' && p.category !== filters.value.category) {
      return false
    }

    // Rating
    if (filters.value.minRating && p.rating < filters.value.minRating) {
      return false
    }

    return true
  }).sort((a, b) => {
    if (filters.value.sortBy === 'rating') return b.rating - a.rating
    if (filters.value.sortBy === 'popular') return b.likesCount - a.likesCount
    return 0
  })
})

const filteredStays = computed(() => {
  return stays.value.filter(s => {
    // Search query
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      const matches = s.name.toLowerCase().includes(q) ||
                      s.town.toLowerCase().includes(q) ||
                      s.district.toLowerCase().includes(q) ||
                      s.type.toLowerCase().includes(q) ||
                      s.shortDescription.toLowerCase().includes(q)
      if (!matches) return false
    }

    // District
    if (filters.value.district !== 'All' && s.district.toLowerCase() !== filters.value.district.toLowerCase()) {
      return false
    }

    // Town
    if (filters.value.town !== 'All' && s.town.toLowerCase() !== filters.value.town.toLowerCase()) {
      return false
    }

    // Stay Type
    if (filters.value.stayType && filters.value.stayType !== 'All' && s.type !== filters.value.stayType) {
      return false
    }

    // Rating
    if (filters.value.minRating && s.rating < filters.value.minRating) {
      return false
    }

    return true
  }).sort((a, b) => {
    if (filters.value.sortBy === 'rating') return b.rating - a.rating
    if (filters.value.sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight
    if (filters.value.sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight
    if (filters.value.sortBy === 'popular') return b.likesCount - a.likesCount
    return 0
  })
})
</script>
