<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/80 backdrop-blur-md pt-16 pb-12 transition-colors">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
        
        <!-- Brand & Mission Column -->
        <div class="lg:col-span-2 space-y-4">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md">
              <span class="text-xl">🇱🇰</span>
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              TravelGuide <span class="text-brand-500 font-serif italic text-lg">LK</span>
            </span>
          </NuxtLink>
          <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            The premier community-driven tourism and accommodation showcase for Sri Lanka. Discover hidden waterfalls, heritage sites, boutique villas, and local stays curated by travelers.
          </p>
          <div class="pt-2 flex items-center gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span class="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Community Edition & Verified Listings</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Explore Sri Lanka
          </h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><NuxtLink to="/explore" class="hover:text-brand-500 transition-colors">All Destinations</NuxtLink></li>
            <li><NuxtLink to="/places" class="hover:text-brand-500 transition-colors">Top Attractions</NuxtLink></li>
            <li><NuxtLink to="/stays" class="hover:text-brand-500 transition-colors">Boutique Villas & Stays</NuxtLink></li>
            <li><NuxtLink to="/districts" class="hover:text-brand-500 transition-colors">25 Districts Guide</NuxtLink></li>
          </ul>
        </div>

        <!-- Community & Hosts -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Community & Hosts
          </h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><NuxtLink to="/submit" class="hover:text-brand-500 transition-colors">Submit Attraction</NuxtLink></li>
            <li><NuxtLink to="/submit?type=stay" class="hover:text-brand-500 transition-colors">List Your Villa / Stay</NuxtLink></li>
            <li><NuxtLink to="/dashboard" class="hover:text-brand-500 transition-colors">Submission Status</NuxtLink></li>
            <li><NuxtLink to="/admin" class="hover:text-brand-500 transition-colors">Admin Moderation</NuxtLink></li>
          </ul>
        </div>

        <!-- Emergency Hotlines & Info -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Traveler Support
          </h4>
          <div class="p-3.5 rounded-2xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/50 dark:border-brand-900/40 text-xs space-y-1.5">
            <p class="font-semibold text-brand-700 dark:text-brand-400">Tourist Police Hotline</p>
            <p class="text-slate-700 dark:text-slate-300 font-mono text-sm font-bold">📞 1912</p>
            <p class="font-semibold text-brand-700 dark:text-brand-400 pt-1">Emergency Ambulance</p>
            <p class="text-slate-700 dark:text-slate-300 font-mono text-sm font-bold">🚑 1990</p>
          </div>
        </div>

      </div>

      <!-- Copyright & Developer Credit Section -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <p>© 2026 TravelGuide LK. All rights reserved.</p>
          <span class="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <p class="flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <a 
              href="https://shamikakkss.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="font-bold text-brand-500 hover:text-brand-600 hover:underline transition-colors flex items-center gap-1"
            >
              <span>Sachintha</span>
              <span class="text-[10px]">↗</span>
            </a>
          </p>
        </div>

        <div class="flex items-center space-x-6">
          <NuxtLink to="/explore" class="hover:underline">Privacy Policy</NuxtLink>
          <NuxtLink to="/explore" class="hover:underline">Terms of Service</NuxtLink>
          <NuxtLink to="/admin" class="hover:underline text-brand-500 font-medium">Admin Portal</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
