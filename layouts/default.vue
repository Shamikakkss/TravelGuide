<template>
  <div class="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark transition-colors font-sans selection:bg-brand-500 selection:text-white">
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <AuthModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTravelData } from '~/composables/useTravelData'

const { isDarkMode } = useTravelData()

onMounted(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
