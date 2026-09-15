<template>
  <div v-if="authModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
    <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 relative">
      
      <!-- Close Button -->
      <button 
        @click="authModalOpen = false" 
        class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg p-1 rounded-full"
      >
        ✕
      </button>

      <!-- Auth Prompt Banner if triggered by action -->
      <div v-if="authPromptMessage" class="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900/60 text-xs text-brand-700 dark:text-brand-300 font-medium flex items-center gap-2">
        <span class="text-base">🔒</span>
        <span>{{ authPromptMessage }}</span>
      </div>

      <!-- Header & Tabs -->
      <div class="space-y-4 text-center">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md">
          🇱🇰
        </div>
        <div>
          <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white font-sans">
            {{ authModalMode === 'login' ? 'Welcome Back' : 'Join TravelGuide LK' }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ authModalMode === 'login' ? 'Log in to rate places, like stays, and contribute.' : 'Create an account to join the Sri Lanka travel community.' }}
          </p>
        </div>

        <!-- Mode Toggle Tabs -->
        <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          <button 
            @click="authModalMode = 'login'"
            class="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            :class="authModalMode === 'login' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm' : 'text-slate-500'"
          >
            Log In
          </button>
          <button 
            @click="authModalMode = 'register'"
            class="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            :class="authModalMode === 'register' ? 'bg-white dark:bg-slate-900 text-brand-500 shadow-sm' : 'text-slate-500'"
          >
            Sign Up
          </button>
        </div>
      </div>

      <!-- Form Inputs -->
      <form @submit.prevent="handleSubmit" class="space-y-3.5">
        <div v-if="authModalMode === 'register'">
          <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Your Full Name</label>
          <input 
            v-model="name" 
            type="text" 
            placeholder="e.g. Kasun Perera"
            required
            class="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div>
          <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="e.g. traveler@example.lk"
            required
            class="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div>
          <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="••••••••"
            required
            class="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div v-if="authModalMode === 'register'">
          <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Account Role</label>
          <select 
            v-model="selectedRole"
            class="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 text-xs text-slate-900 dark:text-white outline-none"
          >
            <option value="user">Traveler / Explorer</option>
            <option value="owner">Villa / Property Host</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <button 
          type="submit"
          class="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/30 transition-all mt-2"
        >
          {{ authModalMode === 'login' ? 'Sign In' : 'Create Account' }}
        </button>

        <!-- Toggle Mode Switch Text -->
        <div class="text-center pt-1">
          <p v-if="authModalMode === 'login'" class="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account? 
            <button 
              type="button"
              @click="authModalMode = 'register'" 
              class="font-bold text-brand-500 hover:text-brand-600 underline underline-offset-2 ml-1"
            >
              Sign Up here
            </button>
          </p>
          <p v-else class="text-xs text-slate-500 dark:text-slate-400">
            Already have an account? 
            <button 
              type="button"
              @click="authModalMode = 'login'" 
              class="font-bold text-brand-500 hover:text-brand-600 underline underline-offset-2 ml-1"
            >
              Log In here
            </button>
          </p>
        </div>
      </form>

      <!-- 1-Click Fast Demo Accounts -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
          ⚡ 1-Click Demo Logins:
        </p>
        <div class="grid grid-cols-3 gap-2 text-xs">
          <button 
            @click="handleQuickDemo('user')"
            class="py-2 px-2 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/60 text-slate-700 dark:text-slate-300 hover:text-brand-500 font-semibold text-center border border-transparent hover:border-brand-500 transition-all text-[11px]"
          >
            👤 Traveler
          </button>
          <button 
            @click="handleQuickDemo('owner')"
            class="py-2 px-2 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/60 text-slate-700 dark:text-slate-300 hover:text-brand-500 font-semibold text-center border border-transparent hover:border-brand-500 transition-all text-[11px]"
          >
            🏡 Host
          </button>
          <button 
            @click="handleQuickDemo('admin')"
            class="py-2 px-2 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/60 text-slate-700 dark:text-slate-300 hover:text-brand-500 font-semibold text-center border border-transparent hover:border-brand-500 transition-all text-[11px]"
          >
            🛡️ Admin
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTravelData } from '~/composables/useTravelData'

const { authModalOpen, authModalMode, authPromptMessage, login, quickDemoLogin } = useTravelData()

const name = ref('')
const email = ref('')
const password = ref('')
const selectedRole = ref<'user' | 'owner' | 'admin'>('user')

const handleSubmit = () => {
  if (!email.value) return
  login(email.value, selectedRole.value, name.value)
  email.value = ''
  password.value = ''
  name.value = ''
}

const handleQuickDemo = (role: 'user' | 'owner' | 'admin') => {
  quickDemoLogin(role)
}
</script>
