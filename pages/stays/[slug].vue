<template>
  <div v-if="stay" class="pb-24 space-y-12">
    <!-- Breadcrumb & Back Navigation -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
      <div class="flex items-center justify-between text-xs text-slate-500">
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="hover:text-brand-500">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/stays" class="hover:text-brand-500">Stays</NuxtLink>
          <span>/</span>
          <span class="text-slate-900 dark:text-white font-medium truncate max-w-xs">{{ stay.name }}</span>
        </div>

        <button 
          @click="toggleLike"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all"
          :class="isLiked ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950 dark:border-rose-900' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200'"
        >
          <span>{{ isLiked ? '❤️' : '🤍' }}</span>
          <span class="font-bold text-xs">{{ stay.likesCount }} Likes</span>
        </button>
      </div>
    </div>

    <!-- Image Gallery Hero Grid -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden max-h-[500px]">
        <!-- Main Large Image -->
        <div class="md:col-span-2 h-72 md:h-[500px] overflow-hidden group relative">
          <img 
            :src="activeImage || stay.coverImage" 
            :alt="stay.name" 
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
              :alt="`${stay.name} view ${idx + 1}`" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content & Booking / Contact Sidebar -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <!-- Left 2 Cols: Details, Amenities, Map, Reviews -->
        <div class="lg:col-span-2 space-y-10">
          <!-- Title & Location Header -->
          <div class="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white">
                🏡 {{ stay.type }}
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                📍 {{ stay.town }}, {{ stay.district }} District
              </span>
              <div class="flex items-center gap-1 bg-amber-500/90 text-slate-950 font-bold px-2.5 py-0.5 rounded-lg text-xs">
                <span>★</span>
                <span>{{ stay.rating.toFixed(1) }} ({{ stayReviews.length }} reviews)</span>
              </div>
            </div>

            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif">
              {{ stay.name }}
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Address: {{ stay.address }}
            </p>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white font-sans">
              Property Description
            </h2>
            <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {{ stay.description }}
            </p>
          </div>

          <!-- Amenities Grid -->
          <div class="space-y-4 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Amenities & Facilities
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div 
                v-for="(am, idx) in stay.amenities" 
                :key="idx"
                class="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                <span class="w-5 h-5 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs flex items-center justify-center font-bold">✓</span>
                <span>{{ am }}</span>
              </div>
            </div>
          </div>

          <!-- Location Map -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white font-sans">
                Location on Map
              </h2>
              <span class="text-xs text-slate-400 font-mono">{{ stay.latitude }}° N, {{ stay.longitude }}° E</span>
            </div>
            <InteractiveMap 
              :stays="[stay]" 
              :center-lat="stay.latitude" 
              :center-lng="stay.longitude" 
              :zoom-level="13" 
            />
          </div>

          <!-- Reviews Section -->
          <div class="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-sans">
                  Guest Reviews
                </h2>
                <p class="text-xs text-slate-500">Verified stays & traveler experiences</p>
              </div>

              <button 
                @click="handleWriteReviewClick"
                class="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20"
              >
                + Write a Review
              </button>
            </div>

            <div v-if="stayReviews.length > 0" class="space-y-4">
              <div 
                v-for="rev in stayReviews" 
                :key="rev.id" 
                class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img :src="rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'" class="w-9 h-9 rounded-full object-cover border border-brand-500/30" />
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
              No reviews for this property yet. Be the first guest to leave feedback!
            </div>
          </div>
        </div>

        <!-- Right 1 Col: Host Contact & Booking Inquiry Card -->
        <div class="space-y-6">
          <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 sticky top-28">
            <!-- Price Display -->
            <div class="pb-4 border-b border-slate-100 dark:border-slate-800">
              <span class="text-xs font-medium text-slate-400">Nightly Rate</span>
              <div class="flex items-baseline gap-1 mt-1">
                <span class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                  Rs. {{ stay.pricePerNight.toLocaleString() }}
                </span>
                <span class="text-xs text-slate-500 font-medium">/ night</span>
              </div>
            </div>

            <!-- Host Profile -->
            <div class="space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Hosted by</span>
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {{ stay.hostName.charAt(0) }}
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white">{{ stay.hostName }}</h4>
                  <p class="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span>✓</span> <span>Verified Property Host</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Contact Buttons (WhatsApp & Phone) -->
            <div class="space-y-3">
              <a 
                v-if="stay.hostWhatsApp" 
                :href="`https://wa.me/${stay.hostWhatsApp.replace(/[^0-9]/g, '')}?text=Hi%20${stay.hostName},%20I%20saw%20your%20property%20'${stay.name}'%20on%20TravelGuide%20LK%20and%20would%20like%20to%20inquire%20about%20availability.`"
                target="_blank"
                class="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <span>💬</span>
                <span>Chat via WhatsApp</span>
              </a>

              <a 
                v-if="stay.hostPhone" 
                :href="`tel:${stay.hostPhone}`"
                class="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>📞</span>
                <span>Call Host: {{ stay.hostPhone }}</span>
              </a>
            </div>

            <!-- Booking Note -->
            <p class="text-[11px] text-slate-400 text-center leading-relaxed">
              🔒 Direct booking: 100% of your payment goes directly to the local host with zero booking commissions.
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="reviewModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 class="font-bold text-slate-900 dark:text-white">Review {{ stay.name }}</h3>
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
            <label class="block text-xs font-semibold text-slate-500 mb-1">Your Experience / Stay Feedback</label>
            <textarea 
              v-model="newReviewComment" 
              rows="4" 
              placeholder="How was the hospitality, cleanliness, and view during your stay?"
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

  <!-- 404 -->
  <div v-else class="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
    <span class="text-5xl">🏡</span>
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Accommodation Not Found</h2>
    <p class="text-sm text-slate-500">The stay you are looking for is currently unavailable or pending approval.</p>
    <NuxtLink to="/stays" class="inline-block px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs">
      ← Back to Stays
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const route = useRoute()
const { stays, reviews, likedStayIds, toggleLikeStay, addReview, currentUser, openAuthModal } = useTravelData()

const slug = String(route.params.slug)
const stay = computed(() => stays.value.find(s => s.slug === slug || s.id === slug))

const isLiked = computed(() => stay.value ? likedStayIds.value.includes(stay.value.id) : false)
const toggleLike = () => {
  if (stay.value) toggleLikeStay(stay.value.id)
}

const handleWriteReviewClick = () => {
  if (!currentUser.value) {
    openAuthModal('login', `Please log in to review ${stay.value?.name || 'this stay'}.`)
  } else {
    reviewModalOpen.value = true
  }
}

const activeImage = ref('')
const galleryImages = computed(() => {
  if (!stay.value) return []
  return stay.value.images?.length ? stay.value.images : [stay.value.coverImage]
})

const stayReviews = computed(() => {
  if (!stay.value) return []
  return reviews.value.filter(r => r.targetType === 'stay' && r.targetId === stay.value!.id)
})

// Review Modal
const reviewModalOpen = ref(false)
const newReviewRating = ref(5)
const newReviewComment = ref('')

const submitNewReview = () => {
  if (!stay.value || !newReviewComment.value) return
  addReview('stay', stay.value.id, newReviewRating.value, newReviewComment.value)
  newReviewComment.value = ''
  reviewModalOpen.value = false
}
</script>
