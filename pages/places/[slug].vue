<template>
  <div v-if="place" class="pb-24 space-y-12">
    <!-- Breadcrumb & Back Navigation -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div class="flex items-center justify-between text-xs text-slate-500">
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="hover:text-brand-500">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/places" class="hover:text-brand-500">Places</NuxtLink>
          <span>/</span>
          <span class="text-slate-900 dark:text-white font-medium truncate max-w-xs">{{ place.name }}</span>
        </div>

        <button 
          @click="toggleLike"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all"
          :class="isLiked ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950 dark:border-rose-900' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200'"
        >
          <span>{{ isLiked ? '❤️' : '🤍' }}</span>
          <span class="font-bold text-xs">{{ place.likesCount }} Likes</span>
        </button>
      </div>
    </div>

    <!-- Image Gallery Hero Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden max-h-[500px]">
        <!-- Main Large Image -->
        <div class="md:col-span-2 h-72 md:h-[500px] overflow-hidden group relative">
          <img 
            :src="activeImage || place.coverImage" 
            :alt="place.name" 
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
          />
        </div>

        <!-- Secondary Side Thumbnails -->
        <div class="hidden md:flex flex-col gap-4 h-[500px]">
          <div 
            v-for="(img, idx) in galleryImages.slice(0, 2)" 
            :key="idx" 
            @click="activeImage = img"
            class="flex-1 overflow-hidden relative cursor-pointer group"
          >
            <img 
              :src="img" 
              :alt="`${place.name} view ${idx + 1}`" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Place Details & Aside Column -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <!-- Left 2 Cols: Details, Highlights, Map, Reviews -->
        <div class="lg:col-span-2 space-y-10">
          <!-- Title & Badges -->
          <div class="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white">
                {{ place.category }}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                📍 {{ place.town }}, {{ place.district }} District
              </span>
              <div class="flex items-center gap-1 bg-amber-500/90 text-slate-950 font-bold px-2.5 py-0.5 rounded-lg text-xs">
                <span>★</span>
                <span>{{ place.rating.toFixed(1) }} ({{ placeReviews.length }} reviews)</span>
              </div>
            </div>

            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif">
              {{ place.name }}
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Address: {{ place.address }}
            </p>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white font-sans">
              About this destination
            </h2>
            <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {{ place.description }}
            </p>
          </div>

          <!-- Highlights Checklist -->
          <div v-if="place.highlights?.length" class="space-y-4 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Key Highlights & Experiences
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                v-for="(hl, idx) in place.highlights" 
                :key="idx"
                class="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200"
              >
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 text-xs flex items-center justify-center font-bold">✓</span>
                <span>{{ hl }}</span>
              </div>
            </div>
          </div>

          <!-- Interactive Location Map -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white font-sans">
                Location & Coordinates
              </h2>
              <span class="text-xs text-slate-400 font-mono">{{ place.latitude }}° N, {{ place.longitude }}° E</span>
            </div>
            <InteractiveMap 
              :places="[place]" 
              :center-lat="place.latitude" 
              :center-lng="place.longitude" 
              :zoom-level="13" 
            />
          </div>

          <!-- Reviews & Rating Section -->
          <div class="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-sans">
                  Traveler Reviews
                </h2>
                <p class="text-xs text-slate-500">Real feedback from community explorers</p>
              </div>

              <button 
                @click="reviewModalOpen = true"
                class="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20"
              >
                + Write a Review
              </button>
            </div>

            <!-- Reviews List -->
            <div v-if="placeReviews.length > 0" class="space-y-4">
              <div 
                v-for="rev in placeReviews" 
                :key="rev.id" 
                class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img :src="rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'" class="w-9 h-9 rounded-full object-cover border border-brand-500/30" />
                    <div>
                      <p class="text-xs font-bold text-slate-900 dark:text-white">{{ rev.userName }}</p>
                      <p class="text-[10px] text-slate-400">{{ rev.createdAt }}</p>
                    </div>
                  </div>
                  <div class="flex text-amber-400 text-xs">
                    <span v-for="s in rev.rating" :key="s">★</span>
                  </div>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  "{{ rev.comment }}"
                </p>
              </div>
            </div>
            <div v-else class="p-8 text-center glass-panel rounded-3xl text-slate-400 text-xs">
              No reviews yet. Be the first to share your experience!
            </div>
          </div>
        </div>

        <!-- Right 1 Col: Quick Facts Card & Nearby Stays -->
        <div class="space-y-6">
          <!-- Quick Facts Card -->
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <h3 class="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Traveler Information
            </h3>

            <div class="space-y-3 text-xs">
              <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span class="text-slate-500">Entry Fee:</span>
                <span class="font-semibold text-slate-900 dark:text-white text-right">{{ place.entryFee || 'Free' }}</span>
              </div>
              <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span class="text-slate-500">Opening Hours:</span>
                <span class="font-semibold text-slate-900 dark:text-white text-right">{{ place.openingHours || 'Open 24 Hours' }}</span>
              </div>
              <div class="flex items-start justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span class="text-slate-500">Best Time to Visit:</span>
                <span class="font-semibold text-slate-900 dark:text-white text-right">{{ place.bestTimeToVisit || 'Morning / Evening' }}</span>
              </div>
              <div class="flex items-start justify-between py-2">
                <span class="text-slate-500">District:</span>
                <NuxtLink :to="`/districts/${place.districtSlug}`" class="font-bold text-brand-500 hover:underline">
                  {{ place.district }} District Guide →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Nearby Accommodations -->
          <div class="space-y-4">
            <h3 class="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Stays Near {{ place.town }}
            </h3>
            <div v-if="nearbyStays.length > 0" class="space-y-4">
              <StayCard 
                v-for="s in nearbyStays" 
                :key="s.id" 
                :stay="s" 
              />
            </div>
            <div v-else class="p-6 text-center text-xs text-slate-400 glass-panel rounded-3xl">
              No stays listed in {{ place.town }} yet. 
              <NuxtLink to="/submit?type=stay" class="text-brand-500 font-bold block mt-1">List a villa here →</NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="reviewModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 class="font-bold text-slate-900 dark:text-white">Review {{ place.name }}</h3>
          <button @click="reviewModalOpen = false" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Your Rating</label>
            <div class="flex gap-2">
              <button 
                v-for="star in 5" 
                :key="star" 
                @click="newReviewRating = star"
                class="text-2xl transition-transform hover:scale-125"
                :class="star <= newReviewRating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'"
              >
                ★
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Your Experience / Tips</label>
            <textarea 
              v-model="newReviewComment" 
              rows="4" 
              placeholder="What did you love about this place? Any timing or photography tips?"
              class="w-full p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-xs text-slate-900 dark:text-white outline-none"
            ></textarea>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button @click="reviewModalOpen = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500">Cancel</button>
          <button 
            @click="submitNewReview"
            :disabled="!newReviewComment"
            class="px-5 py-2.5 rounded-xl bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-500/20"
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 404 Not Found -->
  <div v-else class="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
    <span class="text-5xl">🏝️</span>
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Attraction Not Found</h2>
    <p class="text-sm text-slate-500">The destination you are looking for does not exist or is pending moderation.</p>
    <NuxtLink to="/places" class="inline-block px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs">
      ← Back to Attractions
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const route = useRoute()
const { places, stays, reviews, likedPlaceIds, toggleLikePlace, addReview } = useTravelData()

const slug = String(route.params.slug)
const place = computed(() => places.value.find(p => p.slug === slug || p.id === slug))

const isLiked = computed(() => place.value ? likedPlaceIds.value.includes(place.value.id) : false)
const toggleLike = () => {
  if (place.value) toggleLikePlace(place.value.id)
}

const activeImage = ref('')
const galleryImages = computed(() => {
  if (!place.value) return []
  return place.value.images?.length ? place.value.images : [place.value.coverImage]
})

const placeReviews = computed(() => {
  if (!place.value) return []
  return reviews.value.filter(r => r.targetType === 'place' && r.targetId === place.value!.id)
})

const nearbyStays = computed(() => {
  if (!place.value) return []
  return stays.value.filter(s => s.district.toLowerCase() === place.value!.district.toLowerCase()).slice(0, 2)
})

// Review Modal logic
const reviewModalOpen = ref(false)
const newReviewRating = ref(5)
const newReviewComment = ref('')

const submitNewReview = () => {
  if (!place.value || !newReviewComment.value) return
  addReview('place', place.value.id, newReviewRating.value, newReviewComment.value)
  newReviewComment.value = ''
  reviewModalOpen.value = false
}
</script>
