<template>
  <div v-if="place" class="pb-24 space-y-12">
    <!-- Breadcrumb & Top Navigation Bar -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
      <div class="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <NuxtLink to="/" class="hover:text-brand-500 transition-colors flex items-center gap-1">
            <span>🏠</span>
            <span>Home</span>
          </NuxtLink>
          <span>/</span>
          <NuxtLink to="/places" class="hover:text-brand-500 transition-colors">Attractions</NuxtLink>
          <span>/</span>
          <NuxtLink :to="`/districts/${place.districtSlug}`" class="hover:text-brand-500 transition-colors">{{ place.district }}</NuxtLink>
          <span>/</span>
          <span class="text-slate-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-xs">{{ place.name }}</span>
        </div>

        <div class="flex items-center gap-2">
          <!-- Share Button -->
          <button 
            @click="handleShare"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-brand-500 hover:text-brand-500 transition-all text-xs font-semibold shadow-sm"
          >
            <span>🔗</span>
            <span>{{ copiedLink ? 'Copied!' : 'Share' }}</span>
          </button>

          <!-- Like / Favorite Button -->
          <button 
            @click="toggleLike"
            class="flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all text-xs font-bold shadow-sm"
            :class="isLiked ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-rose-300'"
          >
            <span>{{ isLiked ? '❤️' : '🤍' }}</span>
            <span>{{ place.likesCount }} Likes</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Image Gallery Hero Grid with Lightbox Trigger -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-3xl overflow-hidden">
        <!-- Main Large Image (8 cols on desktop) -->
        <div 
          class="md:col-span-8 h-72 sm:h-96 md:h-[520px] overflow-hidden group relative rounded-3xl bg-slate-900 cursor-pointer shadow-lg"
          @click="openLightbox(activeImageIndex)"
        >
          <img 
            :src="currentImage" 
            :alt="place.name" 
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

          <!-- Bottom Left Overlay on Main Photo -->
          <div class="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white pointer-events-none">
            <div class="space-y-1">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/90 backdrop-blur-md inline-block shadow-md">
                {{ place.category }}
              </span>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif drop-shadow-md">
                {{ place.name }}
              </h1>
            </div>

            <!-- View Fullscreen Button -->
            <div class="pointer-events-auto flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20 text-xs font-semibold transition-all">
              <span>🔍</span>
              <span class="hidden sm:inline">View Gallery ({{ galleryImages.length }})</span>
            </div>
          </div>
        </div>

        <!-- Right Side Thumbnails Grid (4 cols on desktop) -->
        <div class="hidden md:grid md:col-span-4 grid-rows-2 gap-4 h-[520px]">
          <div 
            v-for="(img, idx) in galleryImages.slice(1, 3)" 
            :key="idx" 
            @click="activeImageIndex = idx + 1"
            class="overflow-hidden relative cursor-pointer group rounded-3xl bg-slate-900 shadow-md border-2 transition-all"
            :class="activeImageIndex === idx + 1 ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-transparent hover:border-white/40'"
          >
            <img 
              :src="img" 
              :alt="`${place.name} view ${idx + 2}`" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            
            <div v-if="idx === 1 && galleryImages.length > 3" @click.stop="openLightbox(2)" class="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center text-white font-bold text-sm hover:bg-black/70 transition-all">
              +{{ galleryImages.length - 2 }} More Photos
            </div>
          </div>
        </div>
      </div>

      <!-- Thumbnail Strip for Mobile / Quick Switcher -->
      <div v-if="galleryImages.length > 1" class="flex gap-2.5 mt-3 overflow-x-auto no-scrollbar py-1">
        <button 
          v-for="(img, idx) in galleryImages" 
          :key="idx"
          @click="activeImageIndex = idx"
          class="w-20 h-14 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all relative"
          :class="activeImageIndex === idx ? 'border-brand-500 ring-2 ring-brand-500/40 scale-105' : 'border-transparent opacity-70 hover:opacity-100'"
        >
          <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>

    <!-- Main Place Details & Aside Column -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <!-- Left 2 Cols: Details, Highlights, Map, Reviews -->
        <div class="lg:col-span-2 space-y-10">
          <!-- Title & Meta Badges -->
          <div class="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white">
                {{ place.category }}
              </span>
              <NuxtLink 
                :to="`/districts/${place.districtSlug}`" 
                class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-brand-50 hover:text-brand-600 transition-colors"
              >
                📍 {{ place.town }}, {{ place.district }} District
              </NuxtLink>
              <div class="flex items-center gap-1 bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-full text-xs shadow-sm">
                <span>★</span>
                <span>{{ place.rating.toFixed(1) }} ({{ placeReviews.length }} reviews)</span>
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span>📌</span>
                <span>{{ place.address }}</span>
              </p>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span>📖</span>
              <span>About this destination</span>
            </h2>
            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {{ place.description }}
            </p>
          </div>

          <!-- Key Highlights Checklist -->
          <div v-if="place.highlights?.length" class="space-y-4 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-subtle">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span>✨</span>
              <span>Key Highlights & Experiences</span>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div 
                v-for="(hl, idx) in place.highlights" 
                :key="idx"
                class="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200 p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60"
              >
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">✓</span>
                <span class="font-medium leading-snug">{{ hl }}</span>
              </div>
            </div>
          </div>

          <!-- Interactive Location Map -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                <span>🗺️</span>
                <span>Location & Map Coordinates</span>
              </h2>
              <a 
                :href="`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-xs text-brand-500 hover:text-brand-600 font-bold flex items-center gap-1 bg-brand-50 dark:bg-brand-950/50 px-3 py-1.5 rounded-xl border border-brand-200 dark:border-brand-900/50"
              >
                <span>Open in Google Maps</span>
                <span>↗</span>
              </a>
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
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                  <span>💬</span>
                  <span>Traveler Reviews & Tips</span>
                </h2>
                <p class="text-xs text-slate-500 mt-0.5">Real feedback from community explorers</p>
              </div>

              <button 
                @click="handleWriteReviewClick"
                class="px-5 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
              >
                <span>✍️</span>
                <span>Write a Review</span>
              </button>
            </div>

            <!-- Reviews List -->
            <div v-if="placeReviews.length > 0" class="space-y-4">
              <div 
                v-for="rev in placeReviews" 
                :key="rev.id" 
                class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img 
                      :src="rev.userAvatar || '/images/sigiriya.jpg'" 
                      class="w-10 h-10 rounded-full object-cover border-2 border-brand-500/30" 
                    />
                    <div>
                      <p class="text-xs font-bold text-slate-900 dark:text-white">{{ rev.userName }}</p>
                      <p class="text-[10px] text-slate-400">{{ rev.createdAt }}</p>
                    </div>
                  </div>
                  <div class="flex text-amber-400 text-sm">
                    <span v-for="s in rev.rating" :key="s">★</span>
                  </div>
                </div>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light pl-1">
                  "{{ rev.comment }}"
                </p>
              </div>
            </div>
            <div v-else class="p-8 text-center glass-panel rounded-3xl text-slate-400 text-xs space-y-2">
              <span class="text-2xl block">📝</span>
              <p>No traveler reviews yet for {{ place.name }}. Be the first to share your experience!</p>
            </div>
          </div>
        </div>

        <!-- Right 1 Col: Quick Facts Card & Nearby Stays -->
        <div class="space-y-6">
          <!-- Quick Facts Card -->
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-5 sticky top-24">
            <h3 class="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <span>📋</span>
              <span>Traveler Quick Facts</span>
            </h3>

            <div class="space-y-3.5 text-xs">
              <div class="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span class="text-slate-500">🎟️ Entry Fee:</span>
                <span class="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{{ place.entryFee || 'Free Admission' }}</span>
              </div>
              <div class="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span class="text-slate-500">⏰ Opening Hours:</span>
                <span class="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{{ place.openingHours || 'Open 24 Hours' }}</span>
              </div>
              <div class="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span class="text-slate-500">☀️ Best Time:</span>
                <span class="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{{ place.bestTimeToVisit || 'Morning / Evening' }}</span>
              </div>
              <div class="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                <span class="text-slate-500">📍 District:</span>
                <NuxtLink :to="`/districts/${place.districtSlug}`" class="font-bold text-brand-500 hover:underline">
                  {{ place.district }} District →
                </NuxtLink>
              </div>
              <div class="flex items-start justify-between py-1">
                <span class="text-slate-500">🧭 GPS Coordinates:</span>
                <span class="font-mono text-slate-600 dark:text-slate-300 text-[11px]">{{ place.latitude.toFixed(4) }}, {{ place.longitude.toFixed(4) }}</span>
              </div>
            </div>

            <!-- Get Directions Button -->
            <a 
              :href="`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full py-3 px-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs text-center block shadow-md shadow-brand-500/20 transition-all"
            >
              Get Driving Directions 🚗
            </a>

            <!-- Nearby Accommodations -->
            <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 class="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>🏡</span>
                <span>Stays Near {{ place.town }}</span>
              </h4>
              <div v-if="nearbyStays.length > 0" class="space-y-4">
                <StayCard 
                  v-for="s in nearbyStays" 
                  :key="s.id" 
                  :stay="s" 
                />
              </div>
              <div v-else class="p-4 text-center text-xs text-slate-400 glass-panel rounded-2xl">
                No stays listed in {{ place.town }} yet. 
                <NuxtLink to="/submit?type=stay" class="text-brand-500 font-bold block mt-1">List a stay here →</NuxtLink>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- Related Other Attractions Section -->
    <div v-if="relatedPlaces.length > 0" class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6 pt-10 border-t border-slate-200 dark:border-slate-800">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white font-sans">
            More Attractions in {{ place.district }} & Surrounds
          </h3>
          <p class="text-xs text-slate-500">Discover more incredible places nearby</p>
        </div>
        <NuxtLink to="/places" class="text-xs font-bold text-brand-500 hover:underline">
          View All Attractions →
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceCard 
          v-for="relPlace in relatedPlaces.slice(0, 3)" 
          :key="relPlace.id" 
          :place="relPlace" 
        />
      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="reviewModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 class="font-bold text-slate-900 dark:text-white">Review {{ place.name }}</h3>
          <button @click="reviewModalOpen = false" class="text-slate-400 hover:text-slate-600 text-lg">✕</button>
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
            <label class="block text-xs font-semibold text-slate-500 mb-1">Your Name</label>
            <input 
              v-model="newReviewAuthor" 
              type="text" 
              placeholder="e.g. Ruwan from Colombo" 
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-xs text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Review & Helpful Tips</label>
            <textarea 
              v-model="newReviewComment" 
              rows="4" 
              placeholder="Share what you loved, best times to visit, ticket tips..."
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-xs text-slate-900 dark:text-white outline-none resize-none"
            ></textarea>
          </div>

          <button 
            @click="submitNewReview"
            class="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>

    <!-- Fullscreen Lightbox Modal -->
    <div 
      v-if="lightboxOpen" 
      class="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
      @keydown.esc="lightboxOpen = false"
      tabindex="0"
    >
      <div class="flex items-center justify-between text-white text-xs max-w-6xl mx-auto w-full">
        <span class="font-bold text-sm">{{ place.name }} ({{ lightboxIndex + 1 }} / {{ galleryImages.length }})</span>
        <button @click="lightboxOpen = false" class="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white font-bold text-sm">
          ✕ Close
        </button>
      </div>

      <div class="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
        <!-- Prev Button -->
        <button 
          v-if="galleryImages.length > 1"
          @click="prevLightboxImage" 
          class="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xl font-bold border border-white/20"
        >
          ‹
        </button>

        <img 
          :src="galleryImages[lightboxIndex]" 
          :alt="place.name" 
          class="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl" 
        />

        <!-- Next Button -->
        <button 
          v-if="galleryImages.length > 1"
          @click="nextLightboxImage" 
          class="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xl font-bold border border-white/20"
        >
          ›
        </button>
      </div>

      <!-- Bottom Thumbnail Slider in Lightbox -->
      <div class="flex justify-center gap-2 max-w-6xl mx-auto w-full overflow-x-auto no-scrollbar py-2">
        <button 
          v-for="(img, idx) in galleryImages" 
          :key="idx" 
          @click="lightboxIndex = idx"
          class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0"
          :class="lightboxIndex === idx ? 'border-brand-500 scale-105' : 'border-transparent opacity-50'"
        >
          <img :src="img" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>

  </div>

  <div v-else class="max-w-xl mx-auto py-24 text-center space-y-4">
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Attraction Not Found</h2>
    <p class="text-xs text-slate-500">The requested attraction destination could not be located.</p>
    <NuxtLink to="/places" class="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs inline-block">
      Back to Attractions Directory
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const route = useRoute()
const slug = route.params.slug as string

const { places, stays, reviews, likedPlaceIds, toggleLikePlace, addReview } = useTravelData()

const place = computed(() => places.value.find(p => p.slug === slug || p.id === slug))

const isLiked = computed(() => place.value ? likedPlaceIds.value.includes(place.value.id) : false)

const toggleLike = () => {
  if (place.value) {
    toggleLikePlace(place.value.id)
  }
}

// Active Image Gallery Index
const activeImageIndex = ref(0)
const galleryImages = computed(() => {
  if (!place.value) return []
  const list = [place.value.coverImage, ...(place.value.images || [])]
  // Remove duplicates while maintaining order
  return [...new Set(list)]
})

const currentImage = computed(() => {
  if (!galleryImages.value.length) return '/images/sigiriya.jpg'
  return galleryImages.value[activeImageIndex.value] || galleryImages.value[0]
})

// Lightbox state
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const nextLightboxImage = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.value.length
}

const prevLightboxImage = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length
}

// Reviews for this place
const placeReviews = computed(() => {
  if (!place.value) return []
  return reviews.value.filter(r => r.targetType === 'place' && r.targetId === place.value?.id)
})

// Nearby Stays
const nearbyStays = computed(() => {
  if (!place.value) return []
  return stays.value.filter(s => s.districtSlug === place.value?.districtSlug || s.town === place.value?.town)
})

// Related Places
const relatedPlaces = computed(() => {
  if (!place.value) return []
  return places.value.filter(p => p.id !== place.value?.id && (p.districtSlug === place.value?.districtSlug || p.category === place.value?.category))
})

// Review Modal logic
const reviewModalOpen = ref(false)
const newReviewRating = ref(5)
const newReviewAuthor = ref('')
const newReviewComment = ref('')

const handleWriteReviewClick = () => {
  reviewModalOpen.value = true
}

const submitNewReview = () => {
  if (!newReviewComment.value.trim() || !place.value) return

  addReview({
    targetType: 'place',
    targetId: place.value.id,
    userName: newReviewAuthor.value.trim() || 'Anonymous Traveler',
    rating: newReviewRating.value,
    comment: newReviewComment.value.trim()
  })

  newReviewComment.value = ''
  reviewModalOpen.value = false
}

// Share Link
const copiedLink = ref(false)
const handleShare = async () => {
  if (process.client) {
    try {
      if (navigator.share) {
        await navigator.share({
          title: place.value?.name,
          text: place.value?.shortDescription,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        copiedLink.value = true
        setTimeout(() => { copiedLink.value = false }, 2500)
      }
    } catch {
      await navigator.clipboard.writeText(window.location.href)
      copiedLink.value = true
      setTimeout(() => { copiedLink.value = false }, 2500)
    }
  }
}
</script>
