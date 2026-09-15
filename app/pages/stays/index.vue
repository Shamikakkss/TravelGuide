<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
          Boutique Villas & Stays in Sri Lanka
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Directly discover curated mountain cabins, beachfront pool villas, and heritage manors.
        </p>
      </div>

      <NuxtLink 
        to="/submit?type=stay"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 self-start md:self-auto"
      >
        + List Your Accommodation
      </NuxtLink>
    </div>

    <!-- Filter Bar & Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-1">
        <FilterDrawer mode="stays" />
      </div>

      <div class="lg:col-span-3 space-y-6">
        <div class="flex items-center justify-between text-xs text-slate-500">
          <span>Showing {{ displayedStays.length }} verified accommodations</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StayCard 
            v-for="stay in displayedStays" 
            :key="stay.id" 
            :stay="stay" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTravelData } from '~/composables/useTravelData'

const { stays, globalFilter } = useTravelData()
const filters = globalFilter

const displayedStays = computed(() => {
  return stays.value.filter(s => {
    if (filters.value.district !== 'All' && s.district.toLowerCase() !== filters.value.district.toLowerCase()) return false
    if (filters.value.town !== 'All' && s.town.toLowerCase() !== filters.value.town.toLowerCase()) return false
    if (filters.value.stayType && filters.value.stayType !== 'All' && s.type !== filters.value.stayType) return false
    if (filters.value.minRating && s.rating < filters.value.minRating) return false
    return true
  }).sort((a, b) => {
    if (filters.value.sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight
    if (filters.value.sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight
    if (filters.value.sortBy === 'rating') return b.rating - a.rating
    return 0
  })
})
</script>
