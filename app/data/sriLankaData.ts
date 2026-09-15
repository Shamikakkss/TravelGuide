import type { District, Town, Place, Stay, Review, Submission } from '~/types'

export const sriLankaDistricts: District[] = [
  {
    id: 'dist-badulla',
    name: 'Badulla',
    slug: 'badulla',
    province: 'Uva',
    imageUrl: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop',
    description: 'Home to misty Ella, endless tea plantations, dramatic mountain gaps, and stunning waterfalls.',
    popularTowns: ['Ella', 'Badulla', 'Bandarawela', 'Haputale', 'Mahiyanganaya'],
    placesCount: 14,
    staysCount: 22
  },
  {
    id: 'dist-galle',
    name: 'Galle',
    slug: 'galle',
    province: 'Southern',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop',
    description: 'UNESCO Dutch Fort, pristine golden coastlines, vibrant surf towns, and seaside luxury villas.',
    popularTowns: ['Galle Fort', 'Unawatuna', 'Hikkaduwa', 'Koggala', 'Ahangama'],
    placesCount: 18,
    staysCount: 35
  },
  {
    id: 'dist-matale',
    name: 'Matale',
    slug: 'matale',
    province: 'Central',
    imageUrl: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
    description: 'Ancient wonders like Sigiriya Rock Fortress, Pidurangala, Knuckles Range, and spice gardens.',
    popularTowns: ['Sigiriya', 'Dambulla', 'Matale', 'Knuckles', 'Rattota'],
    placesCount: 12,
    staysCount: 19
  },
  {
    id: 'dist-kandy',
    name: 'Kandy',
    slug: 'kandy',
    province: 'Central',
    imageUrl: 'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
    description: 'The hill capital with the sacred Temple of the Tooth Relic, Royal Botanical Gardens, and scenic lakes.',
    popularTowns: ['Kandy', 'Peradeniya', 'Gampola', 'Digana', 'Hanthana'],
    placesCount: 16,
    staysCount: 28
  },
  {
    id: 'dist-nuwara-eliya',
    name: 'Nuwara Eliya',
    slug: 'nuwara-eliya',
    province: 'Central',
    imageUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop',
    description: 'Little England known for cool mountain climate, Gregory Lake, Horton Plains, and World’s End.',
    popularTowns: ['Nuwara Eliya', 'Nanu Oya', 'Maskeliya', 'Hatton', 'Ramboda'],
    placesCount: 15,
    staysCount: 26
  },
  {
    id: 'dist-matara',
    name: 'Matara',
    slug: 'matara',
    province: 'Southern',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    description: 'World-famous whale watching, Coconut Tree Hill, Secret Beach, and surfing sanctuaries in Mirissa and Weligama.',
    popularTowns: ['Mirissa', 'Weligama', 'Matara', 'Dikwella', 'Hiriketiya'],
    placesCount: 20,
    staysCount: 42
  },
  {
    id: 'dist-colombo',
    name: 'Colombo',
    slug: 'colombo',
    province: 'Western',
    imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop',
    description: 'The bustling commercial heart with Lotus Tower, Galle Face Green, colonial architecture, and rooftop dining.',
    popularTowns: ['Colombo 01', 'Colombo 03 (Kollupitiya)', 'Colombo 07 (Cinnamon Gardens)', 'Mount Lavinia', 'Dehiwala'],
    placesCount: 22,
    staysCount: 50
  },
  {
    id: 'dist-trincomalee',
    name: 'Trincomalee',
    slug: 'trincomalee',
    province: 'Eastern',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    description: 'Crystal turquoise waters, Pigeon Island coral reef snorkeling, and cliffside Koneswaram Temple.',
    popularTowns: ['Nilaveli', 'Uppuveli', 'Trincomalee Town', 'Sampalthivu'],
    placesCount: 11,
    staysCount: 18
  },
  {
    id: 'dist-hambantota',
    name: 'Hambantota',
    slug: 'hambantota',
    province: 'Southern',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
    description: 'Leopard safari capital Yala National Park, Bundala bird sanctuary, and serene Tangalle beaches.',
    popularTowns: ['Yala', 'Tangalle', 'Tissamaharama', 'Hambantota Town'],
    placesCount: 13,
    staysCount: 24
  },
  {
    id: 'dist-anuradhapura',
    name: 'Anuradhapura',
    slug: 'anuradhapura',
    province: 'North Central',
    imageUrl: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
    description: 'Sacred ancient city boasting majestic stupas like Ruwanwelisaya and the sacred Jaya Sri Maha Bodhi tree.',
    popularTowns: ['Anuradhapura Sacred City', 'Mihintale', 'Habarana', 'Kekirawa'],
    placesCount: 15,
    staysCount: 16
  }
]

export const sriLankaTowns: Town[] = [
  // Badulla
  { id: 'town-ella', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Ella', slug: 'ella' },
  { id: 'town-badulla', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Badulla City', slug: 'badulla-city' },
  { id: 'town-bandarawela', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Bandarawela', slug: 'bandarawela' },
  { id: 'town-haputale', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Haputale', slug: 'haputale' },

  // Galle
  { id: 'town-galle-fort', districtId: 'dist-galle', districtName: 'Galle', name: 'Galle Fort', slug: 'galle-fort' },
  { id: 'town-unawatuna', districtId: 'dist-galle', districtName: 'Galle', name: 'Unawatuna', slug: 'unawatuna' },
  { id: 'town-hikkaduwa', districtId: 'dist-galle', districtName: 'Galle', name: 'Hikkaduwa', slug: 'hikkaduwa' },
  { id: 'town-ahangama', districtId: 'dist-galle', districtName: 'Galle', name: 'Ahangama', slug: 'ahangama' },

  // Matale
  { id: 'town-sigiriya', districtId: 'dist-matale', districtName: 'Matale', name: 'Sigiriya', slug: 'sigiriya' },
  { id: 'town-dambulla', districtId: 'dist-matale', districtName: 'Matale', name: 'Dambulla', slug: 'dambulla' },
  { id: 'town-knuckles', districtId: 'dist-matale', districtName: 'Matale', name: 'Knuckles', slug: 'knuckles' },

  // Kandy
  { id: 'town-kandy-city', districtId: 'dist-kandy', districtName: 'Kandy', name: 'Kandy City', slug: 'kandy-city' },
  { id: 'town-peradeniya', districtId: 'dist-kandy', districtName: 'Kandy', name: 'Peradeniya', slug: 'peradeniya' },
  { id: 'town-hanthana', districtId: 'dist-kandy', districtName: 'Kandy', name: 'Hanthana', slug: 'hanthana' },

  // Nuwara Eliya
  { id: 'town-nuwara-eliya', districtId: 'dist-nuwara-eliya', districtName: 'Nuwara Eliya', name: 'Nuwara Eliya City', slug: 'nuwara-eliya-city' },
  { id: 'town-maskeliya', districtId: 'dist-nuwara-eliya', districtName: 'Nuwara Eliya', name: 'Maskeliya (Adam\'s Peak)', slug: 'maskeliya' },
  { id: 'town-horton', districtId: 'dist-nuwara-eliya', districtName: 'Nuwara Eliya', name: 'Horton Plains / Ohiya', slug: 'horton-plains' },

  // Matara
  { id: 'town-mirissa', districtId: 'dist-matara', districtName: 'Matara', name: 'Mirissa', slug: 'mirissa' },
  { id: 'town-weligama', districtId: 'dist-matara', districtName: 'Matara', name: 'Weligama', slug: 'weligama' },
  { id: 'town-hiriketiya', districtId: 'dist-matara', districtName: 'Matara', name: 'Hiriketiya / Dikwella', slug: 'hiriketiya' }
]

export const initialPlaces: Place[] = [
  {
    id: 'place-nine-arch',
    name: 'Nine Arches Bridge',
    slug: 'nine-arches-bridge',
    district: 'Badulla',
    districtSlug: 'badulla',
    town: 'Ella',
    category: 'Historical',
    rating: 4.9,
    reviewsCount: 384,
    likesCount: 1250,
    coverImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'Iconic colonial-era railway viaduct nestled amongst lush green tea hills and misty jungle valleys.',
    description: 'The Nine Arch Bridge in Ella, also known as the Bridge in the Sky, is a magnificent stone viaduct constructed without steel. Set amid rolling emerald tea plantations, it offers one of the most picturesque train passing sights in Asia. A must-visit early in the morning when mist blankets the valley.',
    latitude: 6.8768,
    longitude: 81.0608,
    address: 'Gotuwala, Ella, Badulla District',
    entryFee: 'Free Admission',
    openingHours: 'Open 24/7 (Best visits 06:00 AM - 05:30 PM)',
    bestTimeToVisit: 'Early morning (6:30 AM - 9:00 AM) or sunset',
    highlights: ['Iconic blue train passage', 'Scenic tea valley hiking trails', 'Drone photography paradise', 'Cafe views with fresh coconuts'],
    status: 'approved',
    createdAt: '2025-01-10'
  },
  {
    id: 'place-sigiriya-rock',
    name: 'Sigiriya Lion Rock Fortress',
    slug: 'sigiriya-lion-rock-fortress',
    district: 'Matale',
    districtSlug: 'matale',
    town: 'Sigiriya',
    category: 'Historical',
    rating: 4.95,
    reviewsCount: 520,
    likesCount: 1980,
    coverImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'The legendary 5th-century UNESCO palace citadel perched atop a sheer 200m granite column.',
    description: 'Sigiriya is an ancient rock fortress dominated by a massive column of rock nearly 200 metres high. King Kashyapa built his palace on top of this rock and decorated its sides with colourful frescoes. The fortress complex includes remnants of a ruined palace, surrounded by an extensive network of fortifications, vast water gardens, ponds, canals, and fountains.',
    latitude: 7.9570,
    longitude: 80.7603,
    address: 'Sigiriya UNESCO World Heritage Site, Matale District',
    entryFee: 'LKR 10,800 (Foreign Adult) / LKR 100 (Local)',
    openingHours: '06:30 AM - 05:30 PM Daily',
    bestTimeToVisit: 'Morning 7:00 AM before the heat peaks',
    highlights: ['Ancient Lion Paw entrance', 'Ancient ceiling frescoes', 'Water gardens & Mirror wall', '360-degree panoramic jungle summit'],
    status: 'approved',
    createdAt: '2025-01-05'
  },
  {
    id: 'place-mirissa-coconut-hill',
    name: 'Coconut Tree Hill & Secret Beach',
    slug: 'coconut-tree-hill-mirissa',
    district: 'Matara',
    districtSlug: 'matara',
    town: 'Mirissa',
    category: 'Beach',
    rating: 4.8,
    reviewsCount: 290,
    likesCount: 1420,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'A dramatic reddish dome promontory topped with swaying palms looking directly into the Indian Ocean.',
    description: 'Coconut Tree Hill is a unique coconut palm cliff directly facing the southern Indian Ocean near Mirissa. It has become one of the most photographed vantage points in Sri Lanka for golden hour sunrises and sunsets.',
    latitude: 5.9438,
    longitude: 80.4632,
    address: 'Mirissa South, Matara District',
    entryFee: 'Free',
    openingHours: 'Open 24 Hours',
    bestTimeToVisit: '05:30 PM for sunset or 06:15 AM sunrise',
    highlights: ['Sunset golden photography', 'Ocean waves crashing on rocks', 'Nearby Secret Beach snorkeling', 'Walking distance from beach bars'],
    status: 'approved',
    createdAt: '2025-01-12'
  },
  {
    id: 'place-galle-fort',
    name: 'Galle Dutch Fort Heritage',
    slug: 'galle-dutch-fort',
    district: 'Galle',
    districtSlug: 'galle',
    town: 'Galle Fort',
    category: 'Historical',
    rating: 4.88,
    reviewsCount: 460,
    likesCount: 1840,
    coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: '16th-century Portuguese and Dutch coastal fortress filled with cobblestone streets, cafes, and ramparts.',
    description: 'Galle Fort is a living UNESCO World Heritage site where historic European architecture fuses with South Asian traditions. Walk along the ancient seaside ramparts, view the famous Galle Lighthouse, and enjoy world-class gelato, artisan boutiques, and dining.',
    latitude: 6.0268,
    longitude: 80.2170,
    address: 'Church Street, Galle Fort, Southern Province',
    entryFee: 'Free Fort exploration (Museums have nominal fees)',
    openingHours: 'Open 24/7',
    bestTimeToVisit: 'Late afternoon 04:00 PM for rampart sunset walks',
    highlights: ['Iconic white Galle Lighthouse', 'Flag Rock cliff jumping vantage', 'Boutique jewelers & galleries', 'Charming colonial cobblestone alleys'],
    status: 'approved',
    createdAt: '2025-01-14'
  },
  {
    id: 'place-diyaluma-falls',
    name: 'Diyaluma Upper Falls & Natural Pools',
    slug: 'diyaluma-waterfall',
    district: 'Badulla',
    districtSlug: 'badulla',
    town: 'Ella',
    category: 'Waterfall',
    rating: 4.85,
    reviewsCount: 215,
    likesCount: 970,
    coverImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'Sri Lanka’s 2nd highest waterfall featuring multi-tiered natural infinity rock pools at the crest.',
    description: 'Diyaluma Falls cascades down 220 meters of sheer rock. Hike up to Upper Diyaluma to swim in exhilarating natural infinity rock pools hanging directly over the edge of the precipice.',
    latitude: 6.7328,
    longitude: 81.0319,
    address: 'Poonagala Road, Koslanda, Badulla District',
    entryFee: 'Free (Local guide optional: LKR 1500-2500)',
    openingHours: '07:00 AM - 05:00 PM',
    bestTimeToVisit: 'Morning 9:00 AM to 1:00 PM for refreshing swims',
    highlights: ['Natural infinity cliffside pool', 'Multi-tier freshwater baths', 'Thrilling bamboo trail hike', 'Breathtaking valley views'],
    status: 'approved',
    createdAt: '2025-01-18'
  },
  {
    id: 'place-temple-tooth',
    name: 'Sri Dalada Maligawa (Temple of the Sacred Tooth)',
    slug: 'temple-of-the-tooth-kandy',
    district: 'Kandy',
    districtSlug: 'kandy',
    town: 'Kandy City',
    category: 'Temple',
    rating: 4.92,
    reviewsCount: 610,
    likesCount: 2200,
    coverImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'The sacred Buddhist shrine housing the relic of the tooth of the Buddha inside the royal palace complex.',
    description: 'The golden-roofed Temple of the Sacred Tooth Relic is situated in the royal palace complex of the former Kingdom of Kandy. Since ancient times, the relic has played an active role in local politics because it is believed that whoever holds the relic holds the governance of the country.',
    latitude: 7.2936,
    longitude: 80.6413,
    address: 'Sri Dalada Veediya, Kandy City',
    entryFee: 'LKR 2,000 (Foreign) / Free (Locals)',
    openingHours: '05:30 AM - 08:00 PM (Puja at 05:30 AM, 09:30 AM, 06:30 PM)',
    bestTimeToVisit: 'During evening Thevava prayer ceremony at 06:30 PM',
    highlights: ['Sacred relic golden casket', 'Kandy lake boardwalk', 'Traditional drum rituals', 'Royal audience hall'],
    status: 'approved',
    createdAt: '2025-01-20'
  }
]

export const initialStays: Stay[] = [
  {
    id: 'stay-ella-cliff-cabin',
    name: 'Misty Peak Forest Cabin & Infinity Deck',
    slug: 'misty-peak-forest-cabin-ella',
    district: 'Badulla',
    districtSlug: 'badulla',
    town: 'Ella',
    type: 'Cabin',
    pricePerNight: 28500,
    currency: 'LKR',
    rating: 4.93,
    reviewsCount: 88,
    likesCount: 460,
    coverImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'Eco-luxury wooden mountain cabin hovering above Ella Gap with an outdoor heated jacuzzi and net bed.',
    description: 'Perched on the rim of the Ella mountain pass, Misty Peak Cabin offers unparalleled privacy and breathtaking sunrises. Featuring floor-to-ceiling glass walls, an open-air rain shower, hanging hammock net over the cliff, and complimentary Ceylon breakfast delivered to your balcony.',
    latitude: 6.8710,
    longitude: 81.0490,
    address: 'Waterfall Road, Ella, Badulla District',
    amenities: ['Mountain View', 'Private Jacuzzi', 'High-Speed Wi-Fi', 'Complimentary Breakfast', 'Balcony Net Bed', 'Coffee Maker', 'Free Parking'],
    hostName: 'Sunil Wickramasinghe',
    hostPhone: '+94 77 123 4567',
    hostWhatsApp: '+94771234567',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-10'
  },
  {
    id: 'stay-mirissa-ocean-villa',
    name: 'Saffron Palms Oceanfront Luxury Villa',
    slug: 'saffron-palms-oceanfront-villa',
    district: 'Matara',
    districtSlug: 'matara',
    town: 'Mirissa',
    type: 'Villa',
    pricePerNight: 45000,
    currency: 'LKR',
    rating: 4.96,
    reviewsCount: 112,
    likesCount: 680,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'Direct private beach access, saltwater infinity pool, and personal chef serving fresh seafood.',
    description: 'Wake up to the sound of breaking waves. Saffron Palms is a modern tropical villa designed by acclaimed architects, combining open-concept living with private garden courtyards and direct step-out access to quiet golden sands.',
    latitude: 5.9480,
    longitude: 80.4590,
    address: 'Beach Front Road, Mirissa Coast',
    amenities: ['Direct Beach Access', 'Private Saltwater Pool', 'Chef on Demand', 'Air Conditioning', 'High-Speed Wi-Fi', 'BBQ Grill', 'Airport Shuttle'],
    hostName: 'Chaminda & Dilini Perera',
    hostPhone: '+94 71 889 9001',
    hostWhatsApp: '+94718899001',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-08'
  },
  {
    id: 'stay-galle-heritage-hotel',
    name: 'The Lighthouse Mansions Boutique Stays',
    slug: 'lighthouse-mansions-galle-fort',
    district: 'Galle',
    districtSlug: 'galle',
    town: 'Galle Fort',
    type: 'Boutique Hotel',
    pricePerNight: 36000,
    currency: 'LKR',
    rating: 4.88,
    reviewsCount: 95,
    likesCount: 390,
    coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'Restored 18th-century Dutch colonial manor inside Galle Fort with courtyard plunge pool.',
    description: 'Immerse yourself in history at this boutique colonial residence. Featuring soaring timber ceilings, antique four-poster beds, curated Ceylon artwork, and an internal frangipani courtyard.',
    latitude: 6.0285,
    longitude: 80.2160,
    address: 'Pedlar Street, Galle Fort',
    amenities: ['Heritage Courtyard Pool', 'Cocktail Lounge', 'Fine Dining Restaurant', 'Air Conditioning', 'Bicycle Rentals', 'Spa Services'],
    hostName: 'Rohan de Silva',
    hostPhone: '+94 91 223 4567',
    hostWhatsApp: '+94912234567',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-15'
  },
  {
    id: 'stay-sigiriya-treehouse',
    name: 'Wild Cinnamon Eco Treehouse & Safari Lodge',
    slug: 'wild-cinnamon-eco-treehouse-sigiriya',
    district: 'Matale',
    districtSlug: 'matale',
    town: 'Sigiriya',
    type: 'Resort',
    pricePerNight: 22000,
    currency: 'LKR',
    rating: 4.82,
    reviewsCount: 74,
    likesCount: 310,
    coverImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=1200&auto=format&fit=crop'
    ],
    shortDescription: 'Elevated treehouse cottages with unimpeded views of Sigiriya Lion Rock across the paddy fields.',
    description: 'Nestled between ancient water tanks and peacock-filled farmlands, Wild Cinnamon offers tree-top living with modern amenities. Watch wild elephants in the distance from your private viewing platform.',
    latitude: 7.9490,
    longitude: 80.7520,
    address: 'Kimbissa Road, Sigiriya',
    amenities: ['Lion Rock View', 'Swimming Pool', 'Guided Safari Desk', 'Open-air Restaurant', 'Ayurvedic Massage', 'Free Wi-Fi'],
    hostName: 'Kapila Jayawardena',
    hostPhone: '+94 66 228 9012',
    hostWhatsApp: '+94662289012',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-22'
  }
]

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    targetType: 'place',
    targetId: 'place-nine-arch',
    userId: 'usr-sarah',
    userName: 'Sarah Jenkins (UK)',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    comment: 'One of the most surreal mornings of my life! We arrived at 6:40 AM and watched the blue train cross while sipping hot tea from the small cafe on the hill. Absolute highlight of Sri Lanka.',
    status: 'approved',
    createdAt: '2025-02-14'
  },
  {
    id: 'rev-2',
    targetType: 'place',
    targetId: 'place-sigiriya-rock',
    userId: 'usr-alex',
    userName: 'Alexandre Moreau (France)',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    comment: 'The climb is worth every single step! The ancient engineering and water gardens on top blew my mind. Make sure you start before 8 AM to avoid crowds.',
    status: 'approved',
    createdAt: '2025-02-18'
  },
  {
    id: 'rev-3',
    targetType: 'stay',
    targetId: 'stay-ella-cliff-cabin',
    userId: 'usr-nimal',
    userName: 'Nimali & Kasun (Colombo)',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    comment: 'The private jacuzzi looking at the Ella gap mist is unmatched! Host Sunil was super attentive and arranged tuk-tuks whenever needed. Will definitely return.',
    status: 'approved',
    createdAt: '2025-02-25'
  }
]

export const initialSubmissions: Submission[] = [
  {
    id: 'sub-101',
    type: 'place',
    title: 'Pekoe Trail Stage 12 - Haputale Ridge Walk',
    district: 'Badulla',
    town: 'Haputale',
    submittedBy: 'Danushka Silva',
    userEmail: 'danushka@example.lk',
    status: 'pending',
    submittedAt: '2025-03-01',
    data: {
      name: 'Pekoe Trail Stage 12 - Haputale Ridge Walk',
      category: 'Nature',
      shortDescription: 'Scenic tea ridge trail passing through eucalyptus groves and dramatic Southern plains viewpoints.',
      district: 'Badulla',
      town: 'Haputale',
      rating: 4.8,
      entryFee: 'Free Trail Access',
      coverImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop'
    }
  },
  {
    id: 'sub-102',
    type: 'stay',
    title: 'Ahangama Surf & Coconut Garden Villa',
    district: 'Galle',
    town: 'Ahangama',
    submittedBy: 'Kavindi Fernando',
    userEmail: 'kavindi.f@example.lk',
    status: 'pending',
    submittedAt: '2025-03-02',
    data: {
      name: 'Ahangama Surf & Coconut Garden Villa',
      type: 'Villa',
      pricePerNight: 32000,
      shortDescription: 'Modern 3-bedroom pool villa 4 minutes walk from famous Kabalana surfing point.',
      district: 'Galle',
      town: 'Ahangama',
      hostName: 'Kavindi Fernando',
      hostWhatsApp: '+94770001122',
      coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop'
    }
  }
]
