<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    
    <!-- Admin Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <span>🛡️ Administrator Portal</span>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white font-sans mt-2">
          Moderation & Content Control
        </h1>
      </div>

      <NuxtLink 
        to="/submit" 
        class="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 self-start sm:self-auto"
      >
        + Add Official Listing
      </NuxtLink>
    </div>

    <!-- Metrics Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Approvals</span>
        <div class="flex items-center justify-between">
          <p class="text-3xl font-extrabold text-amber-500">{{ pendingSubmissions.length }}</p>
          <span class="text-2xl">⏳</span>
        </div>
        <p class="text-[11px] text-slate-500">Requires review before live</p>
      </div>

      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Attractions</span>
        <div class="flex items-center justify-between">
          <p class="text-3xl font-extrabold text-brand-500">{{ places.length }}</p>
          <span class="text-2xl">🏔️</span>
        </div>
        <p class="text-[11px] text-slate-500">Publicly published</p>
      </div>

      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Active Stays</span>
        <div class="flex items-center justify-between">
          <p class="text-3xl font-extrabold text-cyan-500">{{ stays.length }}</p>
          <span class="text-2xl">🏡</span>
        </div>
        <p class="text-[11px] text-slate-500">Boutique accommodations</p>
      </div>

      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Reviews</span>
        <div class="flex items-center justify-between">
          <p class="text-3xl font-extrabold text-emerald-500">{{ reviews.length }}</p>
          <span class="text-2xl">💬</span>
        </div>
        <p class="text-[11px] text-slate-500">Traveler ratings</p>
      </div>
    </div>

    <!-- Admin Moderation Queue Section -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Pending Submissions Queue</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold">{{ pendingSubmissions.length }}</span>
        </h2>
      </div>

      <!-- Pending List -->
      <div v-if="pendingSubmissions.length > 0" class="space-y-4">
        <div 
          v-for="sub in pendingSubmissions" 
          :key="sub.id"
          class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div class="flex items-start gap-4">
            <img 
              :src="(sub.data as any).coverImage || 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=200&auto=format&fit=crop'" 
              class="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" 
            />
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {{ sub.type === 'place' ? '🏔️ Place' : '🏡 Stay' }}
                </span>
                <span class="text-xs text-slate-400">Submitted by: <strong class="text-slate-700 dark:text-slate-200">{{ sub.submittedBy }}</strong> ({{ sub.userEmail }})</span>
              </div>
              <h3 class="font-bold text-lg text-slate-900 dark:text-white">{{ sub.title }}</h3>
              <p class="text-xs text-slate-500">📍 {{ sub.town }}, {{ sub.district }} • Date: {{ sub.submittedAt }}</p>
              <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 max-w-xl">
                {{ (sub.data as any).shortDescription }}
              </p>
            </div>
          </div>

          <!-- Moderation Actions -->
          <div class="flex items-center gap-3 w-full md:w-auto">
            <button 
              @click="openRejectModal(sub)"
              class="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-xs transition-colors"
            >
              ✕ Reject
            </button>
            <button 
              @click="handleApprove(sub.id)"
              class="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
            >
              ✓ Approve & Publish
            </button>
          </div>
        </div>
      </div>

      <div v-else class="p-12 text-center glass-panel rounded-3xl text-slate-400 text-sm space-y-2">
        <span class="text-4xl">🎉</span>
        <p class="font-bold text-slate-800 dark:text-slate-200">Moderation Queue is Clear!</p>
        <p class="text-xs text-slate-500">All submitted attractions and accommodations have been approved or handled.</p>
      </div>
    </div>

    <!-- Active Places CMS Table -->
    <div class="space-y-4 pt-6">
      <h2 class="text-xl font-bold text-slate-900 dark:text-white">
        Manage Published Attractions
      </h2>
      <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-subtle">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead class="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-[10px] text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th class="p-4">Name</th>
                <th class="p-4">District</th>
                <th class="p-4">Category</th>
                <th class="p-4">Rating</th>
                <th class="p-4">Likes</th>
                <th class="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr v-for="p in places" :key="p.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td class="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <img :src="p.coverImage" class="w-8 h-8 rounded-lg object-cover" />
                  <span>{{ p.name }}</span>
                </td>
                <td class="p-4">{{ p.district }} ({{ p.town }})</td>
                <td class="p-4"><span class="px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-600 font-semibold">{{ p.category }}</span></td>
                <td class="p-4 font-bold text-amber-500">★ {{ p.rating.toFixed(1) }}</td>
                <td class="p-4">{{ p.likesCount }}</td>
                <td class="p-4 text-right">
                  <NuxtLink :to="`/places/${p.slug}`" class="text-brand-500 font-bold hover:underline">
                    View →
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Reject Reason Modal -->
    <div v-if="rejectModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
        <h3 class="font-bold text-slate-900 dark:text-white">Reject Submission: {{ targetSub?.title }}</h3>
        <p class="text-xs text-slate-500">Provide a reason for rejection so the user can address it:</p>
        <textarea 
          v-model="rejectionReason" 
          rows="3" 
          placeholder="e.g. Incomplete address, low resolution photos, or duplicate entry"
          class="w-full p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-rose-500 text-xs text-slate-900 dark:text-white outline-none"
        ></textarea>
        <div class="flex justify-end gap-3 pt-2">
          <button @click="rejectModalOpen = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500">Cancel</button>
          <button 
            @click="confirmReject" 
            class="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTravelData } from '~/composables/useTravelData'
import type { Submission } from '~/types'

const { submissions, places, stays, reviews, approveSubmission, rejectSubmission } = useTravelData()

const pendingSubmissions = computed(() => {
  return submissions.value.filter(s => s.status === 'pending')
})

const handleApprove = (id: string) => {
  approveSubmission(id)
}

// Reject Modal logic
const rejectModalOpen = ref(false)
const targetSub = ref<Submission | null>(null)
const rejectionReason = ref('')

const openRejectModal = (sub: Submission) => {
  targetSub.value = sub
  rejectionReason.value = 'Incomplete details or duplicate listing'
  rejectModalOpen.value = true
}

const confirmReject = () => {
  if (targetSub.value) {
    rejectSubmission(targetSub.value.id, rejectionReason.value)
    rejectModalOpen.value = false
    targetSub.value = null
  }
}
</script>
