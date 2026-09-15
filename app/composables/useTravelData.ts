import {
  sriLankaDistricts,
  sriLankaTowns,
  initialPlaces,
  initialStays,
  initialReviews,
  initialSubmissions
} from '~/data/sriLankaData'
import type { Place, Stay, District, Town, Review, Submission, FilterState, PlaceCategory, StayType } from '~/types'

export const useTravelData = () => {
  // Global reactive states
  const districts = useState<District[]>('districts', () => sriLankaDistricts)
  const towns = useState<Town[]>('towns', () => sriLankaTowns)
  const places = useState<Place[]>('places', () => initialPlaces)
  const stays = useState<Stay[]>('stays', () => initialStays)
  const reviews = useState<Review[]>('reviews', () => initialReviews)
  const submissions = useState<Submission[]>('submissions', () => initialSubmissions)
  const likedPlaceIds = useState<string[]>('likedPlaceIds', () => ['place-nine-arch'])
  const likedStayIds = useState<string[]>('likedStayIds', () => ['stay-mirissa-ocean-villa'])

  // Current logged in mock user / role
  const currentUser = useState('currentUser', () => ({
    id: 'usr-current',
    name: 'Shaminda (Traveler)',
    email: 'traveler@travelguide.lk',
    role: 'admin' as 'admin' | 'user' | 'owner',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
  }))

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

  // Toggle Like Place
  const toggleLikePlace = (placeId: string) => {
    const idx = likedPlaceIds.value.indexOf(placeId)
    const targetPlace = places.value.find(p => p.id === placeId)
    if (idx > -1) {
      likedPlaceIds.value.splice(idx, 1)
      if (targetPlace) targetPlace.likesCount = Math.max(0, targetPlace.likesCount - 1)
    } else {
      likedPlaceIds.value.push(placeId)
      if (targetPlace) targetPlace.likesCount += 1
    }
  }

  // Toggle Like Stay
  const toggleLikeStay = (stayId: string) => {
    const idx = likedStayIds.value.indexOf(stayId)
    const targetStay = stays.value.find(s => s.id === stayId)
    if (idx > -1) {
      likedStayIds.value.splice(idx, 1)
      if (targetStay) targetStay.likesCount = Math.max(0, targetStay.likesCount - 1)
    } else {
      likedStayIds.value.push(stayId)
      if (targetStay) targetStay.likesCount += 1
    }
  }

  // Submit a new Place (community contribution)
  const submitPlace = (placeData: Partial<Place>) => {
    const newId = `place-${Date.now()}`
    const newSubmissionId = `sub-${Date.now()}`
    const fullPlace: Place = {
      id: newId,
      name: placeData.name || 'Untitled Place',
      slug: (placeData.name || 'place').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      district: placeData.district || 'Galle',
      districtSlug: (placeData.district || 'galle').toLowerCase(),
      town: placeData.town || 'Galle Fort',
      category: (placeData.category as PlaceCategory) || 'Nature',
      rating: 5.0,
      reviewsCount: 0,
      likesCount: 1,
      coverImage: placeData.coverImage || 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
      images: placeData.images?.length ? placeData.images : [placeData.coverImage || 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop'],
      shortDescription: placeData.shortDescription || '',
      description: placeData.description || '',
      latitude: placeData.latitude || 6.0535,
      longitude: placeData.longitude || 80.2210,
      address: placeData.address || `${placeData.town}, ${placeData.district}`,
      entryFee: placeData.entryFee || 'Free Admission',
      openingHours: placeData.openingHours || '08:00 AM - 06:00 PM',
      bestTimeToVisit: placeData.bestTimeToVisit || 'Morning / Evening',
      highlights: placeData.highlights || ['Scenic View', 'Photography spot'],
      status: 'pending',
      submittedBy: currentUser.value.name,
      createdAt: new Date().toISOString().split('T')[0]
    }

    const newSub: Submission = {
      id: newSubmissionId,
      type: 'place',
      title: fullPlace.name,
      district: fullPlace.district,
      town: fullPlace.town,
      submittedBy: currentUser.value.name,
      userEmail: currentUser.value.email,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
      data: fullPlace
    }

    submissions.value.unshift(newSub)
    return newSub
  }

  // Submit a new Stay (host/community submission)
  const submitStay = (stayData: Partial<Stay>) => {
    const newId = `stay-${Date.now()}`
    const newSubmissionId = `sub-${Date.now()}`
    const fullStay: Stay = {
      id: newId,
      name: stayData.name || 'Untitled Stay',
      slug: (stayData.name || 'stay').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      district: stayData.district || 'Matara',
      districtSlug: (stayData.district || 'matara').toLowerCase(),
      town: stayData.town || 'Mirissa',
      type: (stayData.type as StayType) || 'Villa',
      pricePerNight: Number(stayData.pricePerNight) || 15000,
      currency: 'LKR',
      rating: 5.0,
      reviewsCount: 0,
      likesCount: 1,
      coverImage: stayData.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      images: stayData.images?.length ? stayData.images : [stayData.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'],
      shortDescription: stayData.shortDescription || '',
      description: stayData.description || '',
      latitude: stayData.latitude || 5.9480,
      longitude: stayData.longitude || 80.4590,
      address: stayData.address || `${stayData.town}, ${stayData.district}`,
      amenities: stayData.amenities || ['Free Wi-Fi', 'Air Conditioning', 'Breakfast'],
      hostName: stayData.hostName || currentUser.value.name,
      hostPhone: stayData.hostPhone || '+94 77 000 0000',
      hostWhatsApp: stayData.hostWhatsApp || '+94770000000',
      hostIsPublic: true,
      status: 'pending',
      submittedBy: currentUser.value.name,
      createdAt: new Date().toISOString().split('T')[0]
    }

    const newSub: Submission = {
      id: newSubmissionId,
      type: 'stay',
      title: fullStay.name,
      district: fullStay.district,
      town: fullStay.town,
      submittedBy: currentUser.value.name,
      userEmail: currentUser.value.email,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
      data: fullStay
    }

    submissions.value.unshift(newSub)
    return newSub
  }

  // Admin approval action
  const approveSubmission = (submissionId: string) => {
    const sub = submissions.value.find(s => s.id === submissionId)
    if (!sub) return
    sub.status = 'approved'

    if (sub.type === 'place') {
      const placeObj = { ...sub.data, status: 'approved' } as Place
      // If not already in places, add it
      if (!places.value.some(p => p.id === placeObj.id)) {
        places.value.unshift(placeObj)
      }
    } else if (sub.type === 'stay') {
      const stayObj = { ...sub.data, status: 'approved' } as Stay
      if (!stays.value.some(s => s.id === stayObj.id)) {
        stays.value.unshift(stayObj)
      }
    }
  }

  // Admin rejection action
  const rejectSubmission = (submissionId: string, reason: string = 'Incomplete details or duplicate listing') => {
    const sub = submissions.value.find(s => s.id === submissionId)
    if (!sub) return
    sub.status = 'rejected'
    sub.rejectionReason = reason
  }

  // Add a review
  const addReview = (targetType: 'place' | 'stay', targetId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      targetType,
      targetId,
      userId: currentUser.value.id,
      userName: currentUser.value.name,
      userAvatar: currentUser.value.avatarUrl,
      rating,
      comment,
      status: 'approved',
      createdAt: new Date().toISOString().split('T')[0]
    }
    reviews.value.unshift(newRev)

    // recalculate target rating
    if (targetType === 'place') {
      const target = places.value.find(p => p.id === targetId)
      if (target) {
        target.reviewsCount += 1
      }
    } else {
      const target = stays.value.find(s => s.id === targetId)
      if (target) {
        target.reviewsCount += 1
      }
    }
    return newRev
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
