<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    
    <!-- Header -->
    <div class="text-center space-y-2">
      <span class="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-500 border border-brand-500/20">
        Community Contribution & Host Onboarding
      </span>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
        Submit a New Listing
      </h1>
      <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
        Share a hidden attraction or list your boutique villa with travelers exploring Sri Lanka.
      </p>
    </div>

    <!-- Type Switcher Tabs (Attraction vs Stay) -->
    <div class="flex justify-center">
      <div class="p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex max-w-md w-full">
        <button 
          @click="submissionType = 'place'"
          class="flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
          :class="submissionType === 'place' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm' : 'text-slate-500'"
        >
          <span>🏔️</span>
          <span>Attraction / Place</span>
        </button>
        <button 
          @click="submissionType = 'stay'"
          class="flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
          :class="submissionType === 'stay' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm' : 'text-slate-500'"
        >
          <span>🏡</span>
          <span>Boutique Stay / Villa</span>
        </button>
      </div>
    </div>

    <!-- Multi-Step Form Card -->
    <div class="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-8">
      
      <!-- Stepper Indicator -->
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

      <!-- Step 4: Images & Photo Uploads (Real File Upload + URL) -->
      <div v-if="currentStep === 4" class="space-y-6 animate-fadeIn">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Step 4: Image & Photography</h3>
        
        <!-- File Upload Zone -->
        <div class="space-y-3">
          <label class="block text-xs font-bold uppercase text-slate-500">Upload Photo from your Computer</label>
          <div 
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleFileDrop"
            class="border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer relative"
            :class="isDragging ? 'border-brand-500 bg-brand-50/20 dark:bg-brand-950/30' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:border-brand-500/50'"
            @click="triggerFileInput"
          >
            <input 
              ref="fileInputRef" 
              type="file" 
              accept="image/jpeg,image/png,image/webp" 
              class="hidden" 
              @change="handleFileSelect"
            />

            <div v-if="uploading" class="space-y-3 py-4">
              <div class="w-10 h-10 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p class="text-xs font-semibold text-brand-500">Uploading and processing image...</p>
            </div>

            <div v-else class="space-y-2">
              <span class="text-3xl block">📸</span>
              <p class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Drag and drop your image here, or <span class="text-brand-500 underline">browse files</span>
              </p>
              <p class="text-[11px] text-slate-400">Supports JPG, PNG, WEBP up to 10MB</p>
            </div>
          </div>
        </div>

        <!-- Or Enter URL -->
        <div class="space-y-1">
          <label class="block text-xs font-bold uppercase text-slate-500">Or Paste Image URL</label>
          <input 
            v-model="form.coverImage" 
            type="text" 
            placeholder="/images/sigiriya.jpg or https://..."
            class="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-sm text-slate-900 dark:text-white outline-none"
          />
        </div>

        <!-- Image Preview Card -->
        <div v-if="form.coverImage" class="space-y-2">
          <p class="text-xs font-semibold text-emerald-500 flex items-center gap-1">
            <span>✓</span>
            <span>Cover Photo Ready:</span>
          </p>
          <div class="h-56 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 relative bg-slate-900">
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
          By clicking submit, your submission will be saved in the SQLite Database and routed to the Admin Moderation Queue.
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
          :disabled="submitting"
          class="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 active:scale-95 transition-all"
        >
          {{ submitting ? 'Saving to Database...' : '🚀 Submit for Moderation' }}
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
const { districts, submitPlace, submitStay, currentUser, openAuthModal } = useTravelData()

const submissionType = ref<'place' | 'stay'>((route.query.type as any) === 'stay' ? 'stay' : 'place')
const currentStep = ref(1)
const submitting = ref(false)
const uploading = ref(false)
const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

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
  coverImage: '/images/sigiriya.jpg'
})

// Trigger file input
const triggerFileInput = () => {
  fileInputRef.value?.click()
}

// Upload file helper
const uploadImageFile = async (file: File) => {
  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch<{ success: boolean; url: string }>('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (response?.url) {
      form.coverImage = response.url
    }
  } catch (error: any) {
    alert('Failed to upload image: ' + (error.statusMessage || error.message || 'Unknown error'))
  } finally {
    uploading.value = false
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadImageFile(target.files[0])
  }
}

const handleFileDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
    uploadImageFile(e.dataTransfer.files[0])
  }
}

const isCurrentStepValid = computed(() => {
  if (currentStep.value === 1) return !!form.name && !!form.district && !!form.town
  if (currentStep.value === 2) return !!form.shortDescription && !!form.description
  if (currentStep.value === 3) return !!form.address
  if (currentStep.value === 4) return !!form.coverImage
  return true
})

const handleSubmit = async () => {
  if (!currentUser.value) {
    openAuthModal('login', 'Please log in to submit your listing for moderation.')
    return
  }

  submitting.value = true

  const features = form.featuresInput
    ? form.featuresInput.split(',').map(s => s.trim()).filter(Boolean)
    : []

  try {
    if (submissionType.value === 'place') {
      await submitPlace({
        name: form.name,
        district: form.district,
        town: form.town,
        category: form.category,
        shortDescription: form.shortDescription,
        description: form.description,
        address: form.address,
        latitude: form.latitude,
        longitude: form.longitude,
        highlights: features,
        coverImage: form.coverImage,
        images: [form.coverImage]
      })
    } else {
      await submitStay({
        name: form.name,
        district: form.district,
        town: form.town,
        type: form.stayType,
        pricePerNight: form.pricePerNight,
        shortDescription: form.shortDescription,
        description: form.description,
        address: form.address,
        latitude: form.latitude,
        longitude: form.longitude,
        amenities: features,
        hostWhatsApp: form.hostWhatsApp,
        hostPhone: form.hostPhone,
        coverImage: form.coverImage,
        images: [form.coverImage]
      })
    }

    alert('🎉 Thank you! Your listing has been saved to the database and submitted for moderation.')
    router.push('/dashboard')
  } catch (e: any) {
    alert('Submission error: ' + (e.message || 'Please check your input.'))
  } finally {
    submitting.value = false
  }
}
</script>
