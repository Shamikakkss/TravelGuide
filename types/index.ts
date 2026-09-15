export type PlaceCategory = 
  | 'Beach'
  | 'Waterfall'
  | 'Mountain'
  | 'Historical'
  | 'Temple'
  | 'Wildlife'
  | 'Nature'
  | 'Adventure'
  | 'Viewpoint'
  | 'Cultural'
  | 'Other'

export type StayType = 
  | 'Villa'
  | 'Boutique Hotel'
  | 'Hotel'
  | 'Guest House'
  | 'Budget Room'
  | 'Cabin'
  | 'Resort'
  | 'Homestay'

export type UserRole = 'guest' | 'user' | 'owner' | 'admin'

export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl?: string
  createdAt: string
}

export interface District {
  id: string
  name: string
  slug: string
  province: string
  imageUrl: string
  description: string
  popularTowns: string[]
  placesCount?: number
  staysCount?: number
}

export interface Town {
  id: string
  districtId: string
  districtName: string
  name: string
  slug: string
}

export interface Review {
  id: string
  targetType: 'place' | 'stay'
  targetId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  status: SubmissionStatus
  createdAt: string
}

export interface Place {
  id: string
  name: string
  slug: string
  district: string
  districtSlug: string
  town: string
  category: PlaceCategory
  rating: number
  reviewsCount: number
  likesCount: number
  coverImage: string
  images: string[]
  shortDescription: string
  description: string
  latitude: number
  longitude: number
  address: string
  entryFee?: string
  openingHours?: string
  bestTimeToVisit?: string
  highlights: string[]
  status: SubmissionStatus
  submittedBy?: string
  createdAt: string
}

export interface Stay {
  id: string
  name: string
  slug: string
  district: string
  districtSlug: string
  town: string
  type: StayType
  pricePerNight: number
  currency: string
  rating: number
  reviewsCount: number
  likesCount: number
  coverImage: string
  images: string[]
  shortDescription: string
  description: string
  latitude: number
  longitude: number
  address: string
  amenities: string[]
  hostName: string
  hostPhone?: string
  hostWhatsApp?: string
  hostIsPublic: boolean
  status: SubmissionStatus
  submittedBy?: string
  createdAt: string
}

export interface Submission {
  id: string
  type: 'place' | 'stay'
  title: string
  district: string
  town: string
  submittedBy: string
  userEmail: string
  status: SubmissionStatus
  submittedAt: string
  rejectionReason?: string
  data: Partial<Place> | Partial<Stay>
}

export interface FilterState {
  search: string
  district: string
  town: string
  category?: PlaceCategory | 'All'
  stayType?: StayType | 'All'
  minRating?: number
  maxPrice?: number
  sortBy: 'popular' | 'rating' | 'newest' | 'price-asc' | 'price-desc'
}
