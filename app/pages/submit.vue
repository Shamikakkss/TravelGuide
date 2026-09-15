<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold">
        <span>🤝 Community Contribution Portal</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif">
        Submit Place or Accommodation
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
        Share hidden gems or list your boutique villa. All submissions undergo admin moderation before appearing publicly.
      </p>
    </div>

    <!-- Type Selection Toggle: Place vs Stay -->
    <div class="flex justify-center">
      <div class="inline-flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button 
          @click="submissionType = 'place'"
          class="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
          :class="submissionType === 'place' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-md' : 'text-slate-600 dark:text-slate-400'"
        >
          <span>🏔️</span>
          <span>Tourist Attraction</span>
        </button>
        <button 
          @click="submissionType = 'stay'"
          class="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
          :class="submissionType === 'stay' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-md' : 'text-slate-600 dark:text-slate-400'"
        >
          <span>🏡</span>
          <span>Villa / Stay</span>
        </button>
      </div>
    </div>

    <!-- Multi-Step Form Container -->
    <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8">
      
      <!-- Step Progress Bar -->
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 text-xs font-bold">
        <div 
          v-for="(st, idx) in steps" 
          :key="idx" 
          class="flex items-center gap-2"
          :class="currentStep === idx + 1 ? 'text-brand-500' : currentStep > idx + 1 ? 'text-emerald-500' : 'text-slate-400'"
        >
          <span 
            class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold"
            :class="currentStep === idx + 1 ? 'bg-brand-500 text-white' : currentStep > idx + 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'"
          >
            {{ currentStep > idx + 1 ? '✓' : idx + 1 }}
          </span>
          <span class="hidden sm:inline">{{ st }}</span>
        </div>
      </div>

      <!-- Step 1: Basic Info -->
      <div v-if="currentStep === 1" class="space-y-4 animate-fadeIn">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Step 1: General Details</h3>
        
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">
            {{ submissionType === 'place' ? 'Attraction / Place Name' : 'Stay / Villa Name' }} *
          </label>
          <input 
            v-model="form.name" 
            type="text" 
            :placeholder="submissionType === 'place' ? 'e.g. Diyaluma Upper Pools' : 'e.g. Serenity Ocean Villa'"
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- District -->
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">District *</label>
            <select 
              v-model="form.district" 
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            >
              <option v-for="d in districts" :key="d.id" :value="d.name">{{ d.name }}</option>
            </select>
          </div>

          <!-- Town -->
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Town / Area *</label>
            <input 
              v-model="form.town" 
              type="text" 
              placeholder="e.g. Ella, Mirissa, Galle Fort"
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            />
          </div>
        </div>

        <!-- Category or Stay Type & Price -->
        <div v-if="submissionType === 'place'">
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Category *</label>
          <select 
            v-model="form.category" 
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          >
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Accommodation Type *</label>
            <select 
              v-model="form.stayType" 
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            >
              <option v-for="s in stayTypes" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Price per Night (LKR) *</label>
            <input 
              v-model.number="form.pricePerNight" 
              type="number" 
              placeholder="e.g. 25000"
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Step 2: Description & Highlights/Amenities -->
      <div v-if="currentStep === 2" class="space-y-4 animate-fadeIn">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Step 2: Description & Features</h3>
        
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Short Tagline *</label>
          <input 
            v-model="form.shortDescription" 
            type="text" 
            placeholder="One catchy sentence describing this location..."
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Full Description *</label>
          <textarea 
            v-model="form.description" 
            rows="5"
            placeholder="Describe the atmosphere, how to get there, what travelers can expect..."
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">
            {{ submissionType === 'place' ? 'Highlights (comma separated)' : 'Amenities (comma separated)' }}
          </label>
          <input 
            v-model="form.featuresInput" 
            type="text" 
            :placeholder="submissionType === 'place' ? 'e.g. Waterfall swim, Sunset photography, Drone view' : 'e.g. Private Pool, Wi-Fi, Ocean View, Breakfast'"
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          />
        </div>
      </div>

      <!-- Step 3: Location & Contact -->
      <div v-if="currentStep === 3" class="space-y-4 animate-fadeIn">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Step 3: Location & Contact Info</h3>
        
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Address *</label>
          <input 
            v-model="form.address" 
            type="text" 
            placeholder="e.g. Gotuwala, Ella, Badulla District"
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Latitude</label>
            <input 
              v-model.number="form.latitude" 
              type="number" 
              step="any"
              placeholder="e.g. 6.8768"
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Longitude</label>
            <input 
              v-model.number="form.longitude" 
              type="number" 
              step="any"
              placeholder="e.g. 81.0608"
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            />
          </div>
        </div>

        <!-- Host WhatsApp & Phone for Stays -->
        <div v-if="submissionType === 'stay'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Host Contact WhatsApp *</label>
            <input 
              v-model="form.hostWhatsApp" 
              type="text" 
              placeholder="e.g. +94771234567"
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Host Phone Number</label>
            <input 
              v-model="form.hostPhone" 
              type="text" 
              placeholder="e.g. +94 77 123 4567"
              class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Step 4: Images & Photo URLs -->
      <div v-if="currentStep === 4" class="space-y-4 animate-fadeIn">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Step 4: Image Media</h3>
        
        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Main Cover Photo URL *</label>
          <input 
            v-model="form.coverImage" 
            type="url" 
            placeholder="https://images.unsplash.com/..."
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          />
        </div>

        <!-- Image Preview Card -->
        <div v-if="form.coverImage" class="space-y-2">
          <p class="text-xs font-semibold text-slate-400">Cover Photo Preview:</p>
          <div class="h-52 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <img :src="form.coverImage" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Step 5: Review & Submit -->
      <div v-if="currentStep === 5" class="space-y-6 animate-fadeIn">
        <div class="p-6 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-900/50 space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📋</span>
            <h3 class="font-bold text-slate-900 dark:text-white">Review Your Submission</h3>
          </div>
          <div class="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span class="text-slate-400">Title:</span>
              <p class="font-bold text-slate-900 dark:text-white">{{ form.name }}</p>
            </div>
            <div>
              <span class="text-slate-400">Location:</span>
              <p class="font-bold text-slate-900 dark:text-white">{{ form.town }}, {{ form.district }}</p>
            </div>
            <div>
              <span class="text-slate-400">Type / Category:</span>
              <p class="font-bold text-slate-900 dark:text-white">{{ submissionType === 'place' ? form.category : form.stayType }}</p>
            </div>
            <div v-if="submissionType === 'stay'">
              <span class="text-slate-400">Nightly Rate:</span>
              <p class="font-bold text-slate-900 dark:text-white">Rs. {{ form.pricePerNight?.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <p class="text-xs text-slate-500 text-center">
          By clicking submit, your submission will be routed to the Admin Moderation Queue for review.
        </p>
      </div>

      <!-- Footer Navigation Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          v-if="currentStep > 1"
          @click="currentStep--"
          class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          ← Back
        </button>
        <div v-else></div>

        <button 
          v-if="currentStep < 5"
          @click="currentStep++"
          :disabled="!isCurrentStepValid"
          class="px-6 py-2.5 rounded-xl bg-brand-500 disabled:opacity-50 text-white font-bold text-xs hover:bg-brand-600 shadow-md shadow-brand-500/20"
        >
          Continue →
        </button>

        <button 
          v-else
          @click="handleSubmit"
          class="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 active:scale-95 transition-all"
        >
          🚀 Submit for Moderation
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'
import type { PlaceCategory, StayType } from '~/types'

const router = useRouter()
const route = useRoute()
const { districts, submitPlace, submitStay } = useTravelData()

const submissionType = ref<'place' | 'stay'>((route.query.type as any) === 'stay' ? 'stay' : 'place')
const currentStep = ref(1)

const steps = ['Details', 'Features', 'Location', 'Media', 'Review']

const categories: PlaceCategory[] = [
  'Beach', 'Waterfall', 'Mountain', 'Historical', 'Temple', 'Wildlife', 'Nature', 'Adventure', 'Viewpoint', 'Cultural'
]

const stayTypes: StayType[] = [
  'Villa', 'Boutique Hotel', 'Hotel', 'Cabin', 'Guest House', 'Resort', 'Homestay'
]

const form = reactive({
  name: '',
  district: 'Badulla',
  town: 'Ella',
  category: 'Nature' as PlaceCategory,
  stayType: 'Villa' as StayType,
  pricePerNight: 20000,
  shortDescription: '',
  description: '',
  featuresInput: '',
  address: '',
  latitude: 6.8768,
  longitude: 81.0608,
  hostWhatsApp: '+94771234567',
  hostPhone: '+94 77 123 4567',
  coverImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop'
})

const isCurrentStepValid = computed(() => {
  if (currentStep.value === 1) return !!form.name && !!form.district && !!form.town
  if (currentStep.value === 2) return !!form.shortDescription && !!form.description
  if (currentStep.value === 3) return !!form.address
  if (currentStep.value === 4) return !!form.coverImage
  return true
})

const handleSubmit = () => {
  const featuresList = form.featuresInput
    ? form.featuresInput.split(',').map(s => s.trim()).filter(Boolean)
    : ['Scenic Experience']

  if (submissionType.value === 'place') {
    submitPlace({
      name: form.name,
      district: form.district,
      town: form.town,
      category: form.category,
      shortDescription: form.shortDescription,
      description: form.description,
      highlights: featuresList,
      address: form.address,
      latitude: form.latitude,
      longitude: form.longitude,
      coverImage: form.coverImage,
      images: [form.coverImage]
    })
  } else {
    submitStay({
      name: form.name,
      district: form.district,
      town: form.town,
      type: form.stayType,
      pricePerNight: form.pricePerNight,
      shortDescription: form.shortDescription,
      description: form.description,
      amenities: featuresList,
      address: form.address,
      latitude: form.latitude,
      longitude: form.longitude,
      hostWhatsApp: form.hostWhatsApp,
      hostPhone: form.hostPhone,
      coverImage: form.coverImage,
      images: [form.coverImage]
    })
  }

  router.push('/dashboard?submitted=true')
}
</script>
