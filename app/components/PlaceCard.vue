<template>
  <div class="group relative bg-white dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/90 shadow-subtle hover:shadow-card-hover hover:border-brand-500/30 transition-all duration-300 flex flex-col backdrop-blur-sm">
    <!-- Image Header with Badges & Like Button -->
    <div class="relative h-60 w-full overflow-hidden img-zoom-box bg-slate-100 dark:bg-slate-800">
      <img 
        :src="place.coverImage" 
        :alt="place.name" 
        class="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out" 
        loading="lazy"
        @error="handleImageError"
      />
      <div class="absolute inset-0 card-overlay"></div>

      <!-- Category Pill -->
      <div class="absolute top-3.5 left-3.5">
        <span 
          class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border flex items-center gap-1.5"
          :class="categoryBadgeClass(place.category)"
        >
          <span>{{ categoryEmoji(place.category) }}</span>
          <span>{{ place.category }}</span>
        </span>
      </div>

      <!-- Top Right: Like / Heart Button -->
      <button 
        @click.stop.prevent="toggleLike"
        class="absolute top-3.5 right-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md active:scale-90"
        :class="isLiked ? 'bg-rose-500 text-white scale-110 ring-2 ring-rose-300 dark:ring-rose-900' : 'bg-black/40 hover:bg-black/60 text-white'"
        title="Save to favorites"
      >
        <span class="text-sm transition-transform duration-200" :class="isLiked ? 'scale-110 animate-pulse' : ''">
          {{ isLiked ? '❤️' : '🤍' }}
        </span>
      </button>

      <!-- District & Town Ribbon at Bottom of Image -->
      <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs gap-2">
        <div class="flex items-center gap-1.5 font-medium backdrop-blur-md bg-black/50 px-2.5 py-1 rounded-xl border border-white/10 truncate max-w-[70%]">
          <span class="text-amber-300">📍</span>
          <span class="truncate">{{ place.town }}, {{ place.district }}</span>
        </div>
        <div class="flex items-center gap-1 bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-lg text-xs shadow-sm flex-shrink-0">
          <span>★</span>
          <span>{{ place.rating.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <!-- Card Content Body -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <NuxtLink :to="`/places/${place.slug}`" class="block group-hover:text-brand-500 transition-colors">
          <h3 class="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 leading-snug tracking-tight">
            {{ place.name }}
          </h3>
        </NuxtLink>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {{ place.shortDescription }}
        </p>
      </div>

      <!-- Highlights Chips -->
      <div v-if="place.highlights?.length" class="flex flex-wrap gap-1.5 pt-1">
        <span 
          v-for="(hl, idx) in place.highlights.slice(0, 2)" 
          :key="idx" 
          class="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1"
        >
          <span class="text-emerald-500">✓</span>
          <span class="truncate max-w-[150px]">{{ hl }}</span>
        </span>
      </div>

      <!-- Footer action bar -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span class="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
          <span>💬</span>
          <span>{{ place.reviewsCount }} reviews</span>
        </span>
        <NuxtLink 
          :to="`/places/${place.slug}`" 
          class="font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1 group/btn px-3 py-1 rounded-xl bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-all"
        >
          <span>Explore</span>
          <span class="group-hover/btn:translate-x-1 transition-transform">→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Place } from '~/types'
import { useTravelData } from '~/composables/useTravelData'

const props = defineProps<{
  place: Place
}>()

const { likedPlaceIds, toggleLikePlace } = useTravelData()

const isLiked = computed(() => likedPlaceIds.value.includes(props.place.id))

const toggleLike = () => {
  toggleLikePlace(props.place.id)
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target && !target.src.includes('sigiriya.jpg')) {
    target.src = '/images/sigiriya.jpg'
  }
}

const categoryBadgeClass = (cat: string) => {
  switch (cat) {
    case 'Beach':
      return 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-400/30'
    case 'Waterfall':
      return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/30'
    case 'Mountain':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/30'
    case 'Historical':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/30'
    case 'Temple':
      return 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-400/30'
    case 'Wildlife':
      return 'bg-lime-500/15 text-lime-700 dark:text-lime-300 border-lime-400/30'
    case 'Viewpoint':
      return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/30'
    default:
      return 'bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border-white/20'
  }
}

const categoryEmoji = (cat: string) => {
  switch (cat) {
    case 'Beach': return '🏖️'
    case 'Waterfall': return '🌊'
    case 'Mountain': return '⛰️'
    case 'Historical': return '🏛️'
    case 'Temple': return '🛕'
    case 'Wildlife': return '🐘'
    case 'Nature': return '🌿'
    case 'Viewpoint': return '🌅'
    default: return '📍'
  }
}
</script>
