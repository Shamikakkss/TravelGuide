<template>
  <div v-if="district" class="pb-24 space-y-12">
    <!-- District Hero Header -->
    <div class="relative h-80 sm:h-96 w-full overflow-hidden">
      <img 
        :src="district.imageUrl" 
        :alt="district.name" 
        class="w-full h-full object-cover" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

      <div class="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white">
          {{ district.province }} Province
        </span>
        <h1 class="text-4xl sm:text-5xl font-extrabold font-serif">
          {{ district.name }} District Guide
        </h1>
        <p class="text-sm sm:text-base text-slate-200 max-w-2xl font-light">
          {{ district.description }}
        </p>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Towns in District -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Popular Towns in {{ district.name }}</h3>
        <div class="flex flex-wrap gap-2">
          <button 
            @click="selectedTown = 'All'"
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
            :class="selectedTown === 'All' ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'"
          >
            All Towns
          </button>
          <button 
            v-for="town in district.popularTowns" 
            :key="town"
            @click="selectedTown = town"
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
            :class="selectedTown === town ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'"
          >
            📍 {{ town }}
          </button>
        </div>
      </div>

      <!-- District Attractions -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
          Attractions in {{ district.name }} ({{ districtPlaces.length }})
        </h2>
        <div v-if="districtPlaces.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaceCard 
            v-for="p in districtPlaces" 
            :key="p.id" 
            :place="p" 
          />
        </div>
        <div v-else class="p-8 text-center glass-panel rounded-3xl text-slate-400 text-xs">
          No attractions added for this town yet.
        </div>
      </div>

      <!-- District Stays -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
          Villas & Stays in {{ district.name }} ({{ districtStays.length }})
        </h2>
        <div v-if="districtStays.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StayCard 
            v-for="s in districtStays" 
            :key="s.id" 
            :stay="s" 
          />
        </div>
        <div v-else class="p-8 text-center glass-panel rounded-3xl text-slate-400 text-xs">
          No accommodations listed for this town yet.
        </div>
      </div>

      <!-- District Map -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
          {{ district.name }} Regional Map
        </h2>
        <InteractiveMap :places="districtPlaces" :stays="districtStays" />
      </div>

    </div>
  </div>

  <div v-else class="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
    <span class="text-5xl">📍</span>
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">District Not Found</h2>
    <NuxtLink to="/districts" class="inline-block px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs">
      ← Back to Districts
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const route = useRoute()
const { districts, places, stays } = useTravelData()

const slug = String(route.params.slug)
const district = computed(() => districts.value.find(d => d.slug === slug || d.name.toLowerCase() === slug.toLowerCase()))

const selectedTown = ref('All')

const districtPlaces = computed(() => {
  if (!district.value) return []
  return places.value.filter(p => {
    const matchesDistrict = p.district.toLowerCase() === district.value!.name.toLowerCase()
    if (!matchesDistrict) return false
    if (selectedTown.value !== 'All' && p.town.toLowerCase() !== selectedTown.value.toLowerCase()) return false
    return true
  })
})

const districtStays = computed(() => {
  if (!district.value) return []
  return stays.value.filter(s => {
    const matchesDistrict = s.district.toLowerCase() === district.value!.name.toLowerCase()
    if (!matchesDistrict) return false
    if (selectedTown.value !== 'All' && s.town.toLowerCase() !== selectedTown.value.toLowerCase()) return false
    return true
  })
})
</script>
