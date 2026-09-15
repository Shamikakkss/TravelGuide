<template>
  <div class="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col">
    <!-- Image Header with Badges & Like Button -->
    <div class="relative h-60 w-full overflow-hidden img-zoom-box">
      <img 
        :src="place.coverImage" 
        :alt="place.name" 
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
        loading="lazy"
      />
      <div class="absolute inset-0 card-overlay"></div>

      <!-- Category Pill -->
      <div class="absolute top-3.5 left-3.5">
        <span class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white shadow-sm border border-white/20">
          {{ categoryEmoji(place.category) }} {{ place.category }}
        </span>
      </div>

      <!-- Like / Heart Button -->
      <button 
        @click.stop.prevent="toggleLike"
        class="absolute top-3.5 right-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md"
        :class="isLiked ? 'bg-rose-500 text-white scale-110' : 'bg-black/40 hover:bg-black/60 text-white'"
        title="Like this place"
      >
        <span class="text-sm">{{ isLiked ? '❤️' : '🤍' }}</span>
      </button>

      <!-- District & Town Ribbon at Bottom of Image -->
      <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
        <div class="flex items-center gap-1.5 font-medium backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-xl">
          <span>📍</span>
          <span>{{ place.town }}, {{ place.district }}</span>
        </div>
        <div class="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-slate-950 font-bold px-2 py-0.5 rounded-lg text-xs">
          <span>★</span>
          <span>{{ place.rating.toFixed(1) }}</span>
        </div>
      </div>
    </div>

    <!-- Card Content Body -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <NuxtLink :to="`/places/${place.slug}`" class="block group-hover:text-brand-500 transition-colors">
          <h3 class="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 leading-snug">
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
          class="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
        >
          ✓ {{ hl }}
        </span>
      </div>

      <!-- Footer action bar -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span class="text-slate-400 dark:text-slate-500 font-medium">
          💬 {{ place.reviewsCount }} reviews • {{ place.likesCount }} likes
        </span>
        <NuxtLink 
          :to="`/places/${place.slug}`" 
          class="font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1 group/btn"
        >
          <span>Explore</span>
          <span class="group-hover/btn:translate-x-0.5 transition-transform">→</span>
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
