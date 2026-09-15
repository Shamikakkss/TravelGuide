<template>
  <div class="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/40 dark:border-slate-700/60 transition-all duration-300">
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
      
      <!-- Keyword / Destination Search Input -->
      <div class="sm:col-span-4 relative">
        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
          Search Destination / Stay
        </label>
        <div class="relative flex items-center">
          <span class="absolute left-3 text-slate-400 text-sm">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="e.g. Ella, Sigiriya, Pool Villa..."
            class="w-full pl-9 pr-3 py-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-transparent focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none transition-all"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <!-- District Selector Dropdown -->
      <div class="sm:col-span-3 relative">
        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
          District
        </label>
        <select 
          v-model="selectedDistrict" 
          class="w-full px-3 py-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-transparent focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none transition-all cursor-pointer"
        >
          <option value="All">All 25 Districts</option>
          <option v-for="d in districts" :key="d.id" :value="d.name">
            {{ d.name }}
          </option>
        </select>
      </div>

      <!-- Town Dynamic Dropdown (Cascades based on District) -->
      <div class="sm:col-span-3 relative">
        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
          Town / Area
        </label>
        <select 
          v-model="selectedTown" 
          class="w-full px-3 py-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-transparent focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none transition-all cursor-pointer"
        >
          <option value="All">All Towns</option>
          <option v-for="t in availableTowns" :key="t.id" :value="t.name">
            {{ t.name }}
          </option>
        </select>
      </div>

      <!-- Submit / Explore Button -->
      <div class="sm:col-span-2 pt-1 sm:pt-5">
        <button 
          @click="handleSearch"
          class="w-full py-3.5 px-4 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-sm shadow-lg shadow-brand-500/30 hover:shadow-glow-brand transition-all flex items-center justify-center gap-2"
        >
          <span>Explore</span>
          <span>→</span>
        </button>
      </div>

    </div>

    <!-- Quick Filter Category Chips -->
    <div class="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0">
        Popular:
      </span>
      <button 
        v-for="chip in quickChips" 
        :key="chip.label"
        @click="selectQuickChip(chip.type, chip.value)"
        class="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-slate-100/80 dark:bg-slate-800/80 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white text-slate-600 dark:text-slate-300 transition-all border border-transparent hover:border-brand-500"
      >
        {{ chip.emoji }} {{ chip.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const router = useRouter()
const { districts, getTownsByDistrict, globalFilter } = useTravelData()

const searchQuery = ref('')
const selectedDistrict = ref('All')
const selectedTown = ref('All')

const availableTowns = computed(() => {
  return getTownsByDistrict(selectedDistrict.value)
})

watch(selectedDistrict, () => {
  selectedTown.value = 'All'
})

const quickChips = [
  { label: 'Nine Arches Ella', emoji: '🚂', type: 'search', value: 'Nine Arches' },
  { label: 'Sigiriya Rock', emoji: '🏛️', type: 'search', value: 'Sigiriya' },
  { label: 'Beaches', emoji: '🏖️', type: 'category', value: 'Beach' },
  { label: 'Waterfalls', emoji: '🌊', type: 'category', value: 'Waterfall' },
  { label: 'Luxury Villas', emoji: '🏡', type: 'stayType', value: 'Villa' },
  { label: 'Mountain Cabins', emoji: '⛰️', type: 'stayType', value: 'Cabin' }
]

const handleSearch = () => {
  globalFilter.value.search = searchQuery.value
  globalFilter.value.district = selectedDistrict.value
  globalFilter.value.town = selectedTown.value

  router.push({
    path: '/explore',
    query: {
      q: searchQuery.value || undefined,
      district: selectedDistrict.value !== 'All' ? selectedDistrict.value : undefined,
      town: selectedTown.value !== 'All' ? selectedTown.value : undefined
    }
  })
}

const selectQuickChip = (type: string, value: string) => {
  if (type === 'search') {
    searchQuery.value = value
  } else if (type === 'category') {
    globalFilter.value.category = value as any
  } else if (type === 'stayType') {
    globalFilter.value.stayType = value as any
  }
  handleSearch()
}
</script>
