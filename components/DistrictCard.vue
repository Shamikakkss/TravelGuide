<template>
  <NuxtLink 
    :to="`/districts/${district.slug}`"
    class="group relative h-80 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-subtle hover:shadow-card-hover transition-all duration-500 flex flex-col justify-end p-6"
  >
    <!-- Background image -->
    <img 
      :src="district.imageUrl" 
      :alt="district.name" 
      class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700" 
      loading="lazy"
    />
    
    <!-- Deep gradient backdrop -->
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

    <!-- Province badge -->
    <div class="absolute top-4 left-4">
      <span class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/40 text-white border border-white/20">
        {{ district.province }} Province
      </span>
    </div>

    <!-- Content info -->
    <div class="relative z-10 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-extrabold text-white group-hover:text-brand-400 transition-colors font-sans">
          {{ district.name }}
        </h3>
        <span class="text-xs px-2.5 py-1 rounded-xl bg-brand-500/90 text-white font-semibold">
          {{ district.placesCount }} Places • {{ district.staysCount }} Stays
        </span>
      </div>

      <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed">
        {{ district.description }}
      </p>

      <!-- Popular Towns Preview -->
      <div class="pt-2 flex flex-wrap gap-1.5">
        <span 
          v-for="(town, idx) in district.popularTowns.slice(0, 3)" 
          :key="idx" 
          class="text-[11px] px-2 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm text-slate-200 font-medium"
        >
          {{ town }}
        </span>
        <span v-if="district.popularTowns.length > 3" class="text-[11px] text-slate-400 self-center pl-1">
          +{{ district.popularTowns.length - 3 }} more
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { District } from '~/types'

defineProps<{
  district: District
}>()
</script>
