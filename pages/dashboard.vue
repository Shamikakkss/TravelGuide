<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    
    <!-- Success Toast Notification if just submitted -->
    <div 
      v-if="showSuccessToast" 
      class="p-4 rounded-2xl bg-emerald-500 text-white flex items-center justify-between shadow-lg animate-bounce"
    >
      <div class="flex items-center gap-3">
        <span class="text-2xl">🎉</span>
        <div>
          <p class="font-bold text-sm">Submission Received Successfully!</p>
          <p class="text-xs text-emerald-100">Your listing has been queued for admin moderation. You can track its status below.</p>
        </div>
      </div>
      <button @click="showSuccessToast = false" class="text-white text-lg px-2">✕</button>
    </div>

    <!-- User Profile Banner -->
    <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div class="flex items-center gap-4">
        <img 
          :src="currentUser.avatarUrl" 
          :alt="currentUser.name" 
          class="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
        />
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ currentUser.name }}</h1>
            <span class="px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase">
              {{ currentUser.role }}
            </span>
          </div>
          <p class="text-xs text-slate-500">{{ currentUser.email }}</p>
          <p class="text-xs text-slate-400 mt-1">Active Community Explorer</p>
        </div>
      </div>

      <NuxtLink 
        to="/submit" 
        class="px-5 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 flex items-center gap-1.5"
      >
        <span>+</span>
        <span>New Submission</span>
      </NuxtLink>
    </div>

    <!-- Dashboard Tabs: My Submissions, Saved Places, My Reviews -->
    <div class="space-y-6">
      <div class="flex border-b border-slate-200 dark:border-slate-800 text-sm font-bold gap-6">
        <button 
          @click="activeTab = 'submissions'"
          class="pb-3 relative transition-colors"
          :class="activeTab === 'submissions' ? 'text-brand-500 border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
        >
          My Submissions ({{ userSubmissions.length }})
        </button>
        <button 
          @click="activeTab = 'saved'"
          class="pb-3 relative transition-colors"
          :class="activeTab === 'saved' ? 'text-brand-500 border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
        >
          Saved / Liked ({{ likedPlacesList.length + likedStaysList.length }})
        </button>
        <button 
          @click="activeTab = 'reviews'"
          class="pb-3 relative transition-colors"
          :class="activeTab === 'reviews' ? 'text-brand-500 border-b-2 border-brand-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'"
        >
          My Reviews ({{ userReviews.length }})
        </button>
      </div>

      <!-- Tab Content 1: Submissions -->
      <div v-if="activeTab === 'submissions'" class="space-y-4">
        <div v-if="userSubmissions.length > 0" class="space-y-4">
          <div 
            v-for="sub in userSubmissions" 
            :key="sub.id"
            class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                {{ sub.type === 'place' ? '🏔️' : '🏡' }}
              </div>
              <div>
                <h3 class="font-bold text-base text-slate-900 dark:text-white">{{ sub.title }}</h3>
                <p class="text-xs text-slate-500">📍 {{ sub.town }}, {{ sub.district }} • Submitted on {{ sub.submittedAt }}</p>
                <p v-if="sub.rejectionReason" class="text-xs text-rose-500 mt-1 font-semibold">
                  Reason: {{ sub.rejectionReason }}
                </p>
              </div>
            </div>

            <!-- Status Pill -->
            <div>
              <span 
                class="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                :class="{
                  'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400': sub.status === 'pending',
                  'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400': sub.status === 'approved',
                  'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400': sub.status === 'rejected'
                }"
              >
                <span class="w-2 h-2 rounded-full" :class="{
                  'bg-amber-500 animate-ping': sub.status === 'pending',
                  'bg-emerald-500': sub.status === 'approved',
                  'bg-rose-500': sub.status === 'rejected'
                }"></span>
                <span>{{ sub.status }}</span>
              </span>
            </div>
          </div>
        </div>

        <div v-else class="p-12 text-center glass-panel rounded-3xl space-y-3">
          <p class="text-slate-400 text-sm">You haven't submitted any places or accommodations yet.</p>
          <NuxtLink to="/submit" class="inline-block px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold">
            + Submit Your First Location
          </NuxtLink>
        </div>
      </div>

      <!-- Tab Content 2: Saved / Liked -->
      <div v-if="activeTab === 'saved'" class="space-y-6">
        <div v-if="likedPlacesList.length > 0" class="space-y-3">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Liked Attractions</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard v-for="p in likedPlacesList" :key="p.id" :place="p" />
          </div>
        </div>

        <div v-if="likedStaysList.length > 0" class="space-y-3">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Saved Stays</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StayCard v-for="s in likedStaysList" :key="s.id" :stay="s" />
          </div>
        </div>

        <div v-if="likedPlacesList.length === 0 && likedStaysList.length === 0" class="p-12 text-center glass-panel rounded-3xl text-slate-400 text-sm">
          No saved places yet. Click the heart icon on any card to save it here!
        </div>
      </div>

      <!-- Tab Content 3: Reviews -->
      <div v-if="activeTab === 'reviews'" class="space-y-4">
        <div v-if="userReviews.length > 0" class="space-y-4">
          <div 
            v-for="r in userReviews" 
            :key="r.id"
            class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
          >
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-brand-500 uppercase">{{ r.targetType }} review</span>
              <span class="text-amber-400 font-bold">★ {{ r.rating }} / 5</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300">"{{ r.comment }}"</p>
            <p class="text-[10px] text-slate-400">{{ r.createdAt }}</p>
          </div>
        </div>
        <div v-else class="p-12 text-center glass-panel rounded-3xl text-slate-400 text-sm">
          You haven't written any reviews yet.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const route = useRoute()
const { currentUser, submissions, places, stays, reviews, likedPlaceIds, likedStayIds } = useTravelData()

const activeTab = ref<'submissions' | 'saved' | 'reviews'>('submissions')
const showSuccessToast = ref(route.query.submitted === 'true')

const userSubmissions = computed(() => {
  return submissions.value
})

const likedPlacesList = computed(() => {
  return places.value.filter(p => likedPlaceIds.value.includes(p.id))
})

const likedStaysList = computed(() => {
  return stays.value.filter(s => likedStayIds.value.includes(s.id))
})

const userReviews = computed(() => {
  return reviews.value.filter(r => r.userId === currentUser.value.id)
})
</script>
