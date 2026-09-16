<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
    <div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
        Sri Lanka Districts Travel Guide
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
        Explore Sri Lanka region by region. From central tea mountains in Badulla and Nuwara Eliya to the cultural heartlands of Kandy and coastal wonderlands of Galle and Matara.
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
