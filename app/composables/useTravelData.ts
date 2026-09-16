import {
  sriLankaDistricts,
  sriLankaTowns,
  initialPlaces,
  initialStays,
  initialReviews,
  initialSubmissions
} from '~/data/sriLankaData'
import type { Place, Stay, District, Town, Review, Submission, FilterState, PlaceCategory, StayType, User } from '~/types'

export const useTravelData = () => {
  // Global reactive states with fallback to initial data
  const districts = useState<District[]>('districts', () => sriLankaDistricts)
  const towns = useState<Town[]>('towns', () => sriLankaTowns)
  const places = useState<Place[]>('places', () => initialPlaces)
  const stays = useState<Stay[]>('stays', () => initialStays)
  const reviews = useState<Review[]>('reviews', () => initialReviews)
  const submissions = useState<Submission[]>('submissions', () => initialSubmissions)
  const likedPlaceIds = useState<string[]>('likedPlaceIds', () => ['place-nine-arch'])
  const likedStayIds = useState<string[]>('likedStayIds', () => ['stay-mirissa-ocean-villa'])

  // Fetch all data from database API endpoints
  const loadDataFromApi = async () => {
    try {
      const [districtsRes, placesRes, staysRes, reviewsRes, submissionsRes] = await Promise.allSettled([
        $fetch<{ districts: District[]; towns: Town[] }>('/api/districts'),
        $fetch<Place[]>('/api/places'),
        $fetch<Stay[]>('/api/stays'),
        $fetch<Review[]>('/api/reviews'),
        $fetch<Submission[]>('/api/submissions')
      ])

      if (districtsRes.status === 'fulfilled' && districtsRes.value?.districts?.length) {
        districts.value = districtsRes.value.districts
        towns.value = districtsRes.value.towns || sriLankaTowns
      }

      if (placesRes.status === 'fulfilled' && placesRes.value?.length) {
        places.value = placesRes.value
      }

      if (staysRes.status === 'fulfilled' && staysRes.value?.length) {
        stays.value = staysRes.value
      }

      if (reviewsRes.status === 'fulfilled' && reviewsRes.value?.length) {
        reviews.value = reviewsRes.value
      }

      if (submissionsRes.status === 'fulfilled' && submissionsRes.value) {
        submissions.value = submissionsRes.value
      }
    } catch (e) {
      console.warn('API fetch fallback to local initial state:', e)
    }
  }

  // Load from API on mount
  if (process.client) {
    onMounted(() => {
      loadDataFromApi()
    })
  }

  // Auth & Session State
  const currentUser = useState<User | null>('currentUser', () => null)

  const authModalOpen = useState<boolean>('authModalOpen', () => false)
  const authModalMode = useState<'login' | 'register'>('authModalMode', () => 'login')
  const authPromptMessage = useState<string>('authPromptMessage', () => '')

  const openAuthModal = (mode: 'login' | 'register' = 'login', message: string = '') => {
    authModalMode.value = mode
    authPromptMessage.value = message
    authModalOpen.value = true
  }

  const login = (email: string, role: 'user' | 'owner' | 'admin' = 'user', name?: string) => {
    currentUser.value = {
      id: `usr-${Date.now()}`,
      name: name || (email.split('@')[0] || 'Traveler'),
      email: email,
      role: role,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
    }
    authModalOpen.value = false
    authPromptMessage.value = ''
  }

  const logout = () => {
    currentUser.value = null
  }

  const quickDemoLogin = (role: 'user' | 'owner' | 'admin') => {
    if (role === 'admin') {
      login('admin@travelguide.lk', 'admin', 'Sachintha (Admin)')
    } else if (role === 'owner') {
      login('villaowner@travelguide.lk', 'owner', 'Sunil (Villa Owner)')
    } else {
      login('traveler@travelguide.lk', 'user', 'Kasun (Traveler)')
    }
  }

  // Platform Member Ratings
  const platformRatingStats = useState('platformRatingStats', () => ({
    average: 4.9,
    totalCount: 348
  }))
  
  const ratedPlatformUserIds = useState<string[]>('ratedPlatformUserIds', () => [])

  const hasUserRatedPlatform = computed(() => {
    if (!currentUser.value) return false
    return ratedPlatformUserIds.value.includes(currentUser.value.id)
  })

  const submitPlatformRating = (score: number): { success: boolean; message: string } => {
    if (!currentUser.value) {
      openAuthModal('login', 'Please log in or create an account to rate TravelGuide LK.')
      return { success: false, message: 'Authentication required' }
    }

    if (ratedPlatformUserIds.value.includes(currentUser.value.id)) {
      return { success: false, message: 'You have already submitted a rating for TravelGuide LK.' }
    }

    const currentTotal = platformRatingStats.value.average * platformRatingStats.value.totalCount
    platformRatingStats.value.totalCount += 1
    platformRatingStats.value.average = Number(((currentTotal + score) / platformRatingStats.value.totalCount).toFixed(1))
    ratedPlatformUserIds.value.push(currentUser.value.id)

    return { success: true, message: 'Thank you for your rating!' }
  }

  // Dark mode state
  const isDarkMode = useState<boolean>('isDarkMode', () => true)

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    if (process.client) {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Active Global Filter State
  const globalFilter = useState<FilterState>('globalFilter', () => ({
    search: '',
    district: 'All',
    town: 'All',
    category: 'All',
    stayType: 'All',
    minRating: 0,
    sortBy: 'popular'
  }))

  // Towns by District selector helper
  const getTownsByDistrict = (districtName: string): Town[] => {
    if (!districtName || districtName === 'All') return towns.value
    const foundDistrict = districts.value.find(
      d => d.name.toLowerCase() === districtName.toLowerCase() || d.slug.toLowerCase() === districtName.toLowerCase()
    )
    if (!foundDistrict) return []
    return towns.value.filter(t => t.districtId === foundDistrict.id)
  }

  // Toggle Like Place (Requires Login + Persists to API)
  const toggleLikePlace = async (placeId: string): Promise<boolean> => {
    if (!currentUser.value) {
      openAuthModal('login', 'Please log in to like and save attractions to your favorites.')
      return false
    }

    const idx = likedPlaceIds.value.indexOf(placeId)
    const targetPlace = places.value.find(p => p.id === placeId)
    let newLikes = targetPlace ? targetPlace.likesCount : 0

    if (idx > -1) {
      likedPlaceIds.value.splice(idx, 1)
      newLikes = Math.max(0, newLikes - 1)
      if (targetPlace) targetPlace.likesCount = newLikes
    } else {
      likedPlaceIds.value.push(placeId)
      newLikes += 1
      if (targetPlace) targetPlace.likesCount = newLikes
    }

    // Persist to database in background
    try {
      await $fetch(`/api/places/${placeId}`, {
        method: 'PATCH',
        body: { likesCount: newLikes }
      })
    } catch (e) {
      console.warn('Failed to persist place like to DB:', e)
    }

    return true
  }

  // Toggle Like Stay (Requires Login + Persists to API)
  const toggleLikeStay = async (stayId: string): Promise<boolean> => {
    if (!currentUser.value) {
      openAuthModal('login', 'Please log in to like and bookmark accommodations.')
      return false
    }

    const idx = likedStayIds.value.indexOf(stayId)
    const targetStay = stays.value.find(s => s.id === stayId)
    let newLikes = targetStay ? targetStay.likesCount : 0

    if (idx > -1) {
      likedStayIds.value.splice(idx, 1)
      newLikes = Math.max(0, newLikes - 1)
      if (targetStay) targetStay.likesCount = newLikes
    } else {
      likedStayIds.value.push(stayId)
      newLikes += 1
      if (targetStay) targetStay.likesCount = newLikes
    }

    // Persist to database in background
    try {
      await $fetch(`/api/stays/${stayId}`, {
        method: 'PATCH',
        body: { likesCount: newLikes }
      })
    } catch (e) {
      console.warn('Failed to persist stay like to DB:', e)
    }

    return true
  }

  // Submit a new Place (community contribution to DB)
  const submitPlace = async (placeData: Partial<Place>) => {
    if (!currentUser.value) {
      openAuthModal('login', 'Please log in to contribute and submit new attractions.')
      return null
    }

    const fullPlace: Partial<Place> = {
      name: placeData.name || 'Untitled Place',
      district: placeData.district || 'Badulla',
      town: placeData.town || 'Ella',
      category: (placeData.category as PlaceCategory) || 'Nature',
      coverImage: placeData.coverImage || '/images/sigiriya.jpg',
      images: placeData.images?.length ? placeData.images : [placeData.coverImage || '/images/sigiriya.jpg'],
      shortDescription: placeData.shortDescription || '',
      description: placeData.description || '',
      latitude: placeData.latitude || 7.8731,
      longitude: placeData.longitude || 80.7718,
      address: placeData.address || `${placeData.town}, ${placeData.district}`,
      entryFee: placeData.entryFee || 'Free Admission',
      openingHours: placeData.openingHours || '08:00 AM - 06:00 PM',
      bestTimeToVisit: placeData.bestTimeToVisit || 'Morning / Evening',
      highlights: placeData.highlights || ['Scenic View', 'Photography spot']
    }

    try {
      const res = await $fetch<{ success: boolean; submission: Submission }>('/api/submissions', {
        method: 'POST',
        body: {
          type: 'place',
          title: fullPlace.name,
          district: fullPlace.district,
          town: fullPlace.town,
          submittedBy: currentUser.value.name,
          userEmail: currentUser.value.email,
          data: fullPlace
        }
      })

      if (res?.submission) {
        submissions.value.unshift(res.submission)
        return res.submission
      }
    } catch (e) {
      console.error('Failed to submit place to API:', e)
    }

    return null
  }

  // Submit a new Stay (host submission to DB)
  const submitStay = async (stayData: Partial<Stay>) => {
    if (!currentUser.value) {
      openAuthModal('login', 'Please log in to submit and list accommodations.')
      return null
    }

    const fullStay: Partial<Stay> = {
      name: stayData.name || 'Untitled Stay',
      district: stayData.district || 'Matara',
      town: stayData.town || 'Mirissa',
      type: (stayData.type as StayType) || 'Villa',
      pricePerNight: Number(stayData.pricePerNight) || 25000,
      currency: 'LKR',
      coverImage: stayData.coverImage || '/images/sigiriya.jpg',
      images: stayData.images?.length ? stayData.images : [stayData.coverImage || '/images/sigiriya.jpg'],
      shortDescription: stayData.shortDescription || '',
      description: stayData.description || '',
      latitude: stayData.latitude || 5.9480,
      longitude: stayData.longitude || 80.4590,
      address: stayData.address || `${stayData.town}, ${stayData.district}`,
      amenities: stayData.amenities || ['Free Wi-Fi', 'Air Conditioning', 'Breakfast'],
      hostName: stayData.hostName || currentUser.value.name,
      hostPhone: stayData.hostPhone || '+94 77 000 0000',
      hostWhatsApp: stayData.hostWhatsApp || '+94770000000',
      hostIsPublic: true
    }

    try {
      const res = await $fetch<{ success: boolean; submission: Submission }>('/api/submissions', {
        method: 'POST',
        body: {
          type: 'stay',
          title: fullStay.name,
          district: fullStay.district,
          town: fullStay.town,
          submittedBy: currentUser.value.name,
          userEmail: currentUser.value.email,
          data: fullStay
        }
      })

      if (res?.submission) {
        submissions.value.unshift(res.submission)
        return res.submission
      }
    } catch (e) {
      console.error('Failed to submit stay to API:', e)
    }

    return null
  }

  // Admin approval action (Updates SQLite DB)
  const approveSubmission = async (submissionId: string) => {
    try {
      const res = await $fetch<{ success: boolean; submission: Submission }>(`/api/submissions/${submissionId}`, {
        method: 'PATCH',
        body: { status: 'approved' }
      })

      const sub = submissions.value.find(s => s.id === submissionId)
      if (sub) sub.status = 'approved'

      // Reload places and stays from DB
      const [placesRes, staysRes] = await Promise.all([
        $fetch<Place[]>('/api/places'),
        $fetch<Stay[]>('/api/stays')
      ])
      if (placesRes) places.value = placesRes
      if (staysRes) stays.value = staysRes
    } catch (e) {
      console.error('Failed to approve submission:', e)
    }
  }

  // Admin rejection action
  const rejectSubmission = async (submissionId: string, reason: string = 'Incomplete details or duplicate listing') => {
    try {
      await $fetch<{ success: boolean; submission: Submission }>(`/api/submissions/${submissionId}`, {
        method: 'PATCH',
        body: { status: 'rejected', reason }
      })

      const sub = submissions.value.find(s => s.id === submissionId)
      if (sub) {
        sub.status = 'rejected'
        sub.rejectionReason = reason
      }
    } catch (e) {
      console.error('Failed to reject submission:', e)
    }
  }

  // Add a review (Persists to SQLite DB)
  const addReview = async (reviewInput: {
    targetType: 'place' | 'stay'
    targetId: string
    rating: number
    comment: string
    userName?: string
  }) => {
    const userName = reviewInput.userName || currentUser.value?.name || 'Traveler'
    const userAvatar = currentUser.value?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'

    try {
      const res = await $fetch<{
        success: boolean
        review: Review
        newRating: number
        newCount: number
      }>('/api/reviews', {
        method: 'POST',
        body: {
          targetType: reviewInput.targetType,
          targetId: reviewInput.targetId,
          rating: reviewInput.rating,
          comment: reviewInput.comment,
          userName: userName,
          userAvatar: userAvatar,
          userId: currentUser.value?.id || 'usr-guest'
        }
      })

      if (res?.review) {
        reviews.value.unshift(res.review)

        // Update local place or stay counts
        if (reviewInput.targetType === 'place') {
          const p = places.value.find(item => item.id === reviewInput.targetId)
          if (p) {
            p.rating = res.newRating
            p.reviewsCount = res.newCount
          }
        } else {
          const s = stays.value.find(item => item.id === reviewInput.targetId)
          if (s) {
            s.rating = res.newRating
            s.reviewsCount = res.newCount
          }
        }

        return res.review
      }
    } catch (e) {
      console.error('Failed to post review to API:', e)
    }

    return null
  }

  return {
    districts,
    towns,
    places,
    stays,
    reviews,
    submissions,
    likedPlaceIds,
    likedStayIds,
    currentUser,
    isDarkMode,
    globalFilter,
    platformRatingStats,
    hasUserRatedPlatform,
    authModalOpen,
    authModalMode,
    authPromptMessage,
    loadDataFromApi,
    openAuthModal,
    login,
    logout,
    quickDemoLogin,
    submitPlatformRating,
    toggleDarkMode,
    getTownsByDistrict,
    toggleLikePlace,
    toggleLikeStay,
    submitPlace,
    submitStay,
    approveSubmission,
    rejectSubmission,
    addReview
  }
}
