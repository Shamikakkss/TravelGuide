<template>
  <div class="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col">
    <!-- Image with Stay Type and Like -->
    <div class="relative h-60 w-full overflow-hidden img-zoom-box">
      <img 
        :src="stay.coverImage" 
        :alt="stay.name" 
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
        loading="lazy"
      />
      <div class="absolute inset-0 card-overlay"></div>

      <!-- Stay Type Badge -->
      <div class="absolute top-3.5 left-3.5">
        <span class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-brand-500/90 text-white shadow-sm">
          🏡 {{ stay.type }}
        </span>
      </div>

      <!-- Like / Heart Button -->
      <button 
        @click.stop.prevent="toggleLike"
        class="absolute top-3.5 right-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md"
        :class="isLiked ? 'bg-rose-500 text-white scale-110' : 'bg-black/40 hover:bg-black/60 text-white'"
        title="Save this stay"
      >
        <span class="text-sm">{{ isLiked ? '❤️' : '🤍' }}</span>
      </button>

      <!-- District & Rating bar -->
      <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
        <div class="flex items-center gap-1.5 font-medium backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-xl">
          <span>📍</span>
          <span>{{ stay.town }}, {{ stay.district }}</span>
        </div>
        <div class="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-slate-950 font-bold px-2 py-0.5 rounded-lg text-xs">
          <span>★</span>
          <span>{{ stay.rating.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <!-- Content Body -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <NuxtLink :to="`/stays/${stay.slug}`" class="block group-hover:text-brand-500 transition-colors">
          <h3 class="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 leading-snug">
            {{ stay.name }}
          </h3>
        </NuxtLink>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {{ stay.shortDescription }}
        </p>
      </div>

      <!-- Amenities preview -->
      <div v-if="stay.amenities?.length" class="flex flex-wrap gap-1.5 pt-1">
        <span 
          v-for="(amenity, idx) in stay.amenities.slice(0, 3)" 
          :key="idx" 
          class="text-[11px] px-2 py-0.5 rounded-lg bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-medium"
        >
          {{ amenity }}
        </span>
      </div>

      <!-- Price & View Stay footer -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400 dark:text-slate-500">From</span>
          <p class="text-base font-extrabold text-slate-900 dark:text-white font-sans">
            Rs. {{ formatPrice(stay.pricePerNight) }} <span class="text-xs font-normal text-slate-400">/ night</span>
          </p>
        </div>
        <NuxtLink 
          :to="`/stays/${stay.slug}`" 
          class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-500 dark:bg-slate-800 dark:hover:bg-brand-500 text-white text-xs font-semibold transition-all duration-300"
        >
          View Stay
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Stay } from '~/types'
import { useTravelData } from '~/composables/useTravelData'

const props = defineProps<{
  stay: Stay
}>()

const { likedStayIds, toggleLikeStay } = useTravelData()

const isLiked = computed(() => likedStayIds.value.includes(props.stay.id))

const toggleLike = () => {
  toggleLikeStay(props.stay.id)
}

const formatPrice = (val: number) => {
  return val.toLocaleString('en-US')
}
</script>
