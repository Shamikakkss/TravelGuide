<template>
  <div class="relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
    <!-- Map Container -->
    <div ref="mapContainer" class="w-full h-[450px] bg-slate-100 dark:bg-slate-900 z-0"></div>

    <!-- Map Info Overlay -->
    <div class="absolute top-4 left-4 z-10 glass-panel px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-md">
      <span>🗺️ Sri Lanka Interactive Map</span>
      <span class="text-[10px] px-2 py-0.5 rounded-full bg-brand-500 text-white">{{ markersCount }} locations</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import type { Place, Stay } from '~/types'

const props = defineProps<{
  places?: Place[]
  stays?: Stay[]
  centerLat?: number
  centerLng?: number
  zoomLevel?: number
}>()

const mapContainer = ref<HTMLElement | null>(null)
let mapInstance: any = null
let markersLayer: any = null

const markersCount = computed(() => {
  return (props.places?.length || 0) + (props.stays?.length || 0)
})

const initMap = async () => {
  if (typeof window === 'undefined') return
  try {
    const L = await import('leaflet')

    if (!mapContainer.value) return
    if (mapInstance) {
      mapInstance.remove()
    }

    const defaultLat = props.centerLat || 7.8731
    const defaultLng = props.centerLng || 80.7718
    const zoom = props.zoomLevel || (props.centerLat ? 12 : 7.5)

    mapInstance = L.map(mapContainer.value, {
      center: [defaultLat, defaultLng],
      zoom: zoom,
      scrollWheelZoom: false
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(mapInstance)

    markersLayer = L.layerGroup().addTo(mapInstance)
    renderMarkers(L)
  } catch (err) {
    console.error('Error loading Leaflet map:', err)
  }
}

const renderMarkers = (L: any) => {
  if (!markersLayer) return
  markersLayer.clearLayers()

  // Custom Icon Helpers
  const placeIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background-color:#c06b52; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white; box-shadow:0 4px 10px rgba(0,0,0,0.3); font-size:14px;">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })

  const stayIcon = L.divIcon({
    className: 'custom-map-pin-stay',
    html: `<div style="background-color:#0284c7; color:white; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white; box-shadow:0 4px 10px rgba(0,0,0,0.3); font-size:14px;">🏡</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })

  // Add Places
  props.places?.forEach(p => {
    if (p.latitude && p.longitude) {
      const popupHtml = `
        <div style="font-family:Plus Jakarta Sans, sans-serif; min-width:180px;">
          <img src="${p.coverImage}" style="width:100%; height:80px; object-fit:cover; border-radius:8px; margin-bottom:6px;" />
          <h4 style="margin:0; font-weight:bold; font-size:13px; color:#0f172a;">${p.name}</h4>
          <p style="margin:2px 0 0; font-size:11px; color:#64748b;">📍 ${p.town}, ${p.district}</p>
          <div style="margin-top:6px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; font-weight:bold; color:#f59e0b;">★ ${p.rating.toFixed(1)}</span>
            <a href="/places/${p.slug}" style="font-size:11px; color:#c06b52; font-weight:bold; text-decoration:none;">View Place →</a>
          </div>
        </div>
      `
      L.marker([p.latitude, p.longitude], { icon: placeIcon })
        .bindPopup(popupHtml)
        .addTo(markersLayer)
    }
  })

  // Add Stays
  props.stays?.forEach(s => {
    if (s.latitude && s.longitude) {
      const popupHtml = `
        <div style="font-family:Plus Jakarta Sans, sans-serif; min-width:180px;">
          <img src="${s.coverImage}" style="width:100%; height:80px; object-fit:cover; border-radius:8px; margin-bottom:6px;" />
          <h4 style="margin:0; font-weight:bold; font-size:13px; color:#0f172a;">${s.name}</h4>
          <p style="margin:2px 0 0; font-size:11px; color:#64748b;">🏡 ${s.type} • ${s.town}</p>
          <div style="margin-top:6px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; font-weight:bold; color:#0f172a;">Rs. ${s.pricePerNight.toLocaleString()}</span>
            <a href="/stays/${s.slug}" style="font-size:11px; color:#0284c7; font-weight:bold; text-decoration:none;">View Stay →</a>
          </div>
        </div>
      `
      L.marker([s.latitude, s.longitude], { icon: stayIcon })
        .bindPopup(popupHtml)
        .addTo(markersLayer)
    }
  })
}

onMounted(() => {
  initMap()
})

watch(() => [props.places, props.stays], () => {
  if (typeof window !== 'undefined') {
    import('leaflet').then(L => renderMarkers(L))
  }
}, { deep: true })
</script>
