<template>
  <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
          Sri Lanka Attractions Directory
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore iconic historical landmarks, hidden cascading waterfalls, tea hills, and golden beaches.
        </p>
      </div>

      <NuxtLink 
        to="/submit"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 self-start md:self-auto"
      >
        + Add New Attraction
      </NuxtLink>
    </div>

    <!-- Filter Bar & Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-1">
        <FilterDrawer mode="places" />
      </div>

      <div class="lg:col-span-3 space-y-6">
        <div class="flex items-center justify-between text-xs text-slate-500">
          <span>Showing {{ displayedPlaces.length }} tourist destinations</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaceCard 
            v-for="place in displayedPlaces" 
            :key="place.id" 
            :place="place" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTravelData } from '~/composables/useTravelData'

const { places, globalFilter } = useTravelData()
const filters = globalFilter

const displayedPlaces = computed(() => {
  return places.value.filter(p => {
    if (filters.value.district !== 'All' && p.district.toLowerCase() !== filters.value.district.toLowerCase()) return false
    if (filters.value.town !== 'All' && p.town.toLowerCase() !== filters.value.town.toLowerCase()) return false
    if (filters.value.category && filters.value.category !== 'All' && p.category !== filters.value.category) return false
    if (filters.value.minRating && p.rating < filters.value.minRating) return false
    return true
  })
})
</script>
