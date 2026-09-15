<template>
  <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-10">
    <div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
        Sri Lanka 25 Districts Travel Guide
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
        Explore Sri Lanka region by region. From central tea mountains in Badulla and Nuwara Eliya to the golden beaches of Galle, Matara, and Trincomalee.
      </p>
    </div>

    <!-- District Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <DistrictCard 
        v-for="district in districts" 
        :key="district.id" 
        :district="district" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTravelData } from '~/composables/useTravelData'

const { districts } = useTravelData()
</script>
