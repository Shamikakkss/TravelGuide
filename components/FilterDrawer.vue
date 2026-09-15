<template>
  <div>
    <!-- Mobile Filter Trigger Button (Floating on Mobile) -->
    <div class="lg:hidden fixed bottom-6 right-6 z-40">
      <button 
        @click="isOpen = true"
        class="flex items-center gap-2 px-5 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-2xl shadow-brand-500/50 active:scale-95 transition-all"
      >
        <span>⚙️</span>
        <span>Filters & Sort</span>
        <span v-if="activeFilterCount > 0" class="w-5 h-5 rounded-full bg-white text-brand-600 text-xs flex items-center justify-center font-extrabold">
          {{ activeFilterCount }}
        </span>
      </button>
    </div>

    <!-- Mobile Drawer Overlay & Bottom Sheet -->
    <div 
      v-if="isOpen" 
      class="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
    >
      <div 
        class="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-6 animate-slideUp border border-slate-200 dark:border-slate-800"
      >
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-xl">🎛️</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Filter & Sort Places</h3>
          </div>
          <button 
            @click="isOpen = false"
            class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full"
          >
            ✕
          </button>
        </div>

        <!-- Filter Controls Inside Modal -->
        <div class="space-y-4">
          <!-- District -->
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              District
            </label>
            <select 
              v-model="filters.district" 
              class="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none"
            >
              <option value="All">All Districts</option>
              <option v-for="d in districts" :key="d.id" :value="d.name">{{ d.name }}</option>
            </select>
          </div>

          <!-- Town -->
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Town
            </label>
            <select 
              v-model="filters.town" 
              class="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none"
            >
              <option value="All">All Towns</option>
              <option v-for="t in availableTowns" :key="t.id" :value="t.name">{{ t.name }}</option>
            </select>
          </div>

          <!-- Category -->
          <div v-if="mode !== 'stays'">
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Attraction Category
            </label>
            <select 
              v-model="filters.category" 
              class="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none"
            >
              <option value="All">All Categories</option>
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <!-- Stay Type -->
          <div v-if="mode !== 'places'">
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Accommodation Type
            </label>
            <select 
              v-model="filters.stayType" 
              class="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none"
            >
              <option value="All">All Stay Types</option>
              <option v-for="s in stayTypes" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <!-- Min Rating -->
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Minimum Star Rating
            </label>
            <div class="flex items-center gap-2">
              <button 
                v-for="star in [0, 3, 4, 4.5]" 
                :key="star"
                @click="filters.minRating = star"
                class="flex-1 py-2 rounded-xl text-xs font-bold border transition-all"
                :class="filters.minRating === star ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent'"
              >
                {{ star === 0 ? 'Any' : `★ ${star}+` }}
              </button>
            </div>
          </div>

          <!-- Sort By -->
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Sort Order
            </label>
            <select 
              v-model="filters.sortBy" 
              class="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none"
            >
              <option value="popular">Most Popular & Likes</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Recently Added</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="pt-4 flex items-center gap-3">
          <button 
            @click="resetFilters" 
            class="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Reset
          </button>
          <button 
            @click="isOpen = false" 
            class="flex-1 py-3 rounded-2xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 shadow-md shadow-brand-500/30"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop Sidebar Filter Layout -->
    <div class="hidden lg:block bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <span class="text-lg">🎛️</span>
          <h3 class="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Filters</h3>
        </div>
        <button 
          @click="resetFilters" 
          class="text-xs font-semibold text-brand-500 hover:text-brand-600"
        >
          Reset All
        </button>
      </div>

      <!-- District Filter -->
      <div>
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">District</label>
        <select 
          v-model="filters.district" 
          class="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
        >
          <option value="All">All 25 Districts</option>
          <option v-for="d in districts" :key="d.id" :value="d.name">{{ d.name }}</option>
        </select>
      </div>

      <!-- Town Filter -->
      <div>
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Town / Area</label>
        <select 
          v-model="filters.town" 
          class="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
        >
          <option value="All">All Towns</option>
          <option v-for="t in availableTowns" :key="t.id" :value="t.name">{{ t.name }}</option>
        </select>
      </div>

      <!-- Category Filter -->
      <div v-if="mode !== 'stays'">
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Category</label>
        <select 
          v-model="filters.category" 
          class="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <!-- Stay Type Filter -->
      <div v-if="mode !== 'places'">
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Stay Type</label>
        <select 
          v-model="filters.stayType" 
          class="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
        >
          <option value="All">All Stay Types</option>
          <option v-for="s in stayTypes" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Minimum Rating -->
      <div>
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Minimum Rating</label>
        <div class="grid grid-cols-2 gap-1.5">
          <button 
            v-for="star in [0, 4.0, 4.5, 4.8]" 
            :key="star"
            @click="filters.minRating = star"
            class="py-1.5 px-2 rounded-lg text-xs font-bold border transition-all text-center"
            :class="filters.minRating === star ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            {{ star === 0 ? 'Any Rating' : `★ ${star}+` }}
          </button>
        </div>
      </div>

      <!-- Sort By -->
      <div>
        <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Sort By</label>
        <select 
          v-model="filters.sortBy" 
          class="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
        >
          <option value="popular">🔥 Most Popular</option>
          <option value="rating">⭐ Highest Rated</option>
          <option value="newest">🕒 Recently Added</option>
          <option value="price-asc">💵 Price: Low to High</option>
          <option value="price-desc">💎 Price: High to Low</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { FilterState, PlaceCategory, StayType } from '~/types'
import { useTravelData } from '~/composables/useTravelData'

const props = defineProps<{
  mode?: 'all' | 'places' | 'stays'
}>()

const { districts, getTownsByDistrict, globalFilter } = useTravelData()
const isOpen = ref(false)
const filters = globalFilter

const availableTowns = computed(() => {
  return getTownsByDistrict(filters.value.district)
})

watch(() => filters.value.district, () => {
  filters.value.town = 'All'
})

const categories: PlaceCategory[] = [
  'Beach', 'Waterfall', 'Mountain', 'Historical', 'Temple', 'Wildlife', 'Nature', 'Adventure', 'Viewpoint', 'Cultural'
]

const stayTypes: StayType[] = [
  'Villa', 'Boutique Hotel', 'Hotel', 'Cabin', 'Guest House', 'Resort', 'Homestay'
]

const activeFilterCount = computed(() => {
  let cnt = 0
  if (filters.value.district !== 'All') cnt++
  if (filters.value.town !== 'All') cnt++
  if (filters.value.category && filters.value.category !== 'All') cnt++
  if (filters.value.stayType && filters.value.stayType !== 'All') cnt++
  if (filters.value.minRating && filters.value.minRating > 0) cnt++
  return cnt
})

const resetFilters = () => {
  filters.value.search = ''
  filters.value.district = 'All'
  filters.value.town = 'All'
  filters.value.category = 'All'
  filters.value.stayType = 'All'
  filters.value.minRating = 0
  filters.value.sortBy = 'popular'
}
</script>
