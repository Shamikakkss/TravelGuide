<template>
  <header class="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Logo (Scrolls to top on click) -->
        <NuxtLink 
          to="/" 
          @click="scrollToTop"
          class="flex items-center space-x-3 group cursor-pointer"
        >
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-500 flex items-center justify-center text-white shadow-glow-brand transform group-hover:scale-105 transition-transform duration-300">
            <span class="text-xl">🇱🇰</span>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-1.5">
              TravelGuide <span class="text-brand-500 font-serif italic text-lg">LK</span>
            </span>
            <span class="text-[10px] tracking-wider uppercase font-semibold text-slate-400 dark:text-slate-400">
              Sri Lanka Explorer
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1 lg:space-x-2">
          <NuxtLink 
            to="/" 
            @click="scrollToTop"
            class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="$route.path === '/' ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/40 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/explore" 
            class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="$route.path.startsWith('/explore') ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/40 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'"
          >
            Explore
          </NuxtLink>
          <NuxtLink 
            to="/places" 
            class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="$route.path.startsWith('/places') ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/40 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'"
          >
            Attractions
          </NuxtLink>
          <NuxtLink 
            to="/stays" 
            class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="$route.path.startsWith('/stays') ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/40 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'"
          >
            Villas & Stays
          </NuxtLink>
          <NuxtLink 
            to="/districts" 
            class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            :class="$route.path.startsWith('/districts') ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/40 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'"
          >
            Districts
          </NuxtLink>
        </nav>

        <!-- Right Side: Dark Mode, Submit Action, Auth Profile -->
        <div class="hidden md:flex items-center space-x-3">
          <!-- Dark Mode Toggle Button -->
          <button 
            @click="toggleDarkMode" 
            class="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            <span v-if="isDarkMode" class="text-lg">☀️</span>
            <span v-else class="text-lg">🌙</span>
          </button>

          <!-- Submit Community Content Button -->
          <button 
            @click="handleAddClick"
            class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-md shadow-brand-500/20 hover:shadow-glow-brand transition-all duration-300"
          >
            <span>+</span>
            <span>Add Place / Stay</span>
          </button>

          <!-- When Logged In: Role / Dashboard Dropdown -->
          <div v-if="currentUser" class="relative group">
            <button class="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 hover:border-brand-500 transition-colors">
              <img :src="currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'" :alt="currentUser.name" class="w-8 h-8 rounded-full object-cover border border-brand-500/40" />
              <div class="flex flex-col text-left">
                <span class="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">{{ currentUser.name.split(' ')[0] }}</span>
                <span class="text-[10px] text-emerald-500 font-medium uppercase tracking-wider">{{ currentUser.role }}</span>
              </div>
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-52 py-2 glass-panel rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p class="text-xs font-semibold text-slate-900 dark:text-white">{{ currentUser.name }}</p>
                <p class="text-[11px] text-slate-400 truncate">{{ currentUser.email }}</p>
              </div>
              <NuxtLink to="/dashboard" class="flex items-center px-4 py-2.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-500 transition-colors">
                👤 My Submissions
              </NuxtLink>
              <NuxtLink v-if="currentUser.role === 'admin'" to="/admin" class="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-500 transition-colors">
                <span>🛡️ Admin Moderation</span>
                <span class="px-1.5 py-0.5 text-[9px] bg-brand-500 text-white rounded-full">{{ pendingSubmissionsCount }}</span>
              </NuxtLink>
              <div class="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button 
                  @click="logout" 
                  class="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold flex items-center gap-2"
                >
                  <span>🚪</span>
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          <!-- When Guest (Not Logged In): Log In / Sign Up Buttons -->
          <div v-else class="flex items-center gap-2">
            <button 
              @click="openAuthModal('login')"
              class="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              Log In
            </button>
            <button 
              @click="openAuthModal('register')"
              class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>

        <!-- Mobile Menu Hamburger Button -->
        <div class="flex items-center space-x-2 md:hidden">
          <button 
            @click="toggleDarkMode" 
            class="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span v-if="isDarkMode">☀️</span>
            <span v-else>🌙</span>
          </button>
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Slide-Down Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
      <NuxtLink 
        @click="handleMobileHomeClick" 
        to="/" 
        class="block px-4 py-2.5 rounded-xl text-sm font-medium"
        :class="$route.path === '/' ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-500 font-bold' : 'text-slate-700 dark:text-slate-200'"
      >
        🏠 Home
      </NuxtLink>
      <NuxtLink 
        @click="mobileMenuOpen = false" 
        to="/explore" 
        class="block px-4 py-2.5 rounded-xl text-sm font-medium"
        :class="$route.path.startsWith('/explore') ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-500 font-bold' : 'text-slate-700 dark:text-slate-200'"
      >
        🧭 Explore All
      </NuxtLink>
      <NuxtLink 
        @click="mobileMenuOpen = false" 
        to="/places" 
        class="block px-4 py-2.5 rounded-xl text-sm font-medium"
        :class="$route.path.startsWith('/places') ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-500 font-bold' : 'text-slate-700 dark:text-slate-200'"
      >
        🏔️ Attractions
      </NuxtLink>
      <NuxtLink 
        @click="mobileMenuOpen = false" 
        to="/stays" 
        class="block px-4 py-2.5 rounded-xl text-sm font-medium"
        :class="$route.path.startsWith('/stays') ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-500 font-bold' : 'text-slate-700 dark:text-slate-200'"
      >
        🏡 Villas & Stays
      </NuxtLink>
      <NuxtLink 
        @click="mobileMenuOpen = false" 
        to="/districts" 
        class="block px-4 py-2.5 rounded-xl text-sm font-medium"
        :class="$route.path.startsWith('/districts') ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-500 font-bold' : 'text-slate-700 dark:text-slate-200'"
      >
        📍 Districts Directory
      </NuxtLink>

      <!-- Auth section in Mobile Drawer -->
      <div v-if="currentUser" class="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <NuxtLink 
          @click="mobileMenuOpen = false" 
          to="/dashboard" 
          class="block px-4 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200"
        >
          👤 My Submissions ({{ currentUser.name }})
        </NuxtLink>
        <NuxtLink 
          v-if="currentUser.role === 'admin'"
          @click="mobileMenuOpen = false" 
          to="/admin" 
          class="block px-4 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200"
        >
          🛡️ Admin Moderation ({{ pendingSubmissionsCount }})
        </NuxtLink>
        <button 
          @click="handleMobileLogout"
          class="w-full text-left px-4 py-2 rounded-xl text-xs text-rose-500 font-bold"
        >
          🚪 Log Out
        </button>
      </div>
      <div v-else class="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <button 
          @click="openAuthModal('login'); mobileMenuOpen = false"
          class="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200"
        >
          Log In
        </button>
        <button 
          @click="openAuthModal('register'); mobileMenuOpen = false"
          class="flex-1 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-bold"
        >
          Sign Up
        </button>
      </div>

      <div class="pt-2">
        <button 
          @click="handleAddClick(); mobileMenuOpen = false"
          class="block w-full text-center py-3 rounded-xl bg-brand-500 text-white font-semibold shadow-md shadow-brand-500/20 text-xs"
        >
          + Submit Place / Accommodation
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTravelData } from '~/composables/useTravelData'

const router = useRouter()
const { isDarkMode, toggleDarkMode, currentUser, submissions, logout, openAuthModal } = useTravelData()
const mobileMenuOpen = ref(false)

const pendingSubmissionsCount = computed(() => {
  return submissions.value.filter(s => s.status === 'pending').length
})

const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const handleMobileHomeClick = () => {
  mobileMenuOpen.value = false
  scrollToTop()
}

const handleAddClick = () => {
  if (!currentUser.value) {
    openAuthModal('login', 'Please log in to submit a tourist place or accommodation.')
  } else {
    router.push('/submit')
  }
}

const handleMobileLogout = () => {
  logout()
  mobileMenuOpen.value = false
}
</script>
