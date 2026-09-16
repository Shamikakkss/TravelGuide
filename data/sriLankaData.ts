import type { District, Town, Place, Stay, Review, Submission } from '~/types'

export const sriLankaDistricts: District[] = [
  // Western Province
  {
    id: 'dist-colombo',
    name: 'Colombo',
    slug: 'colombo',
    province: 'Western',
    imageUrl: '/images/colombo.jpg',
    description: 'The vibrant commercial capital featuring Lotus Tower, Galle Face Green, colonial architecture, and seaside dining.',
    popularTowns: ['Colombo Fort', 'Kollupitiya', 'Cinnamon Gardens', 'Mount Lavinia', 'Dehiwala', 'Battaramulla'],
    placesCount: 0,
    staysCount: 0
  },

  // Central Province
  {
    id: 'dist-kandy',
    name: 'Kandy',
    slug: 'kandy',
    province: 'Central',
    imageUrl: '/images/dalada maligawa.jpg',
    description: 'The hill capital with the sacred Temple of the Tooth Relic, Royal Botanical Gardens, and scenic lakes.',
    popularTowns: ['Kandy City', 'Peradeniya', 'Gampola', 'Digana', 'Hanthana', 'Katugastota'],
    placesCount: 1,
    staysCount: 1
  },
  {
    id: 'dist-matale',
    name: 'Matale',
    slug: 'matale',
    province: 'Central',
    imageUrl: '/images/matale.jpg',
    description: 'Ancient wonders like Sigiriya Rock Fortress, Pidurangala, Knuckles Range, and fragrant spice gardens.',
    popularTowns: ['Sigiriya', 'Dambulla', 'Matale City', 'Knuckles', 'Rattota', 'Ukuwela'],
    placesCount: 1,
    staysCount: 1
  },
  {
    id: 'dist-nuwara-eliya',
    name: 'Nuwara Eliya',
    slug: 'nuwara-eliya',
    province: 'Central',
    imageUrl: '/images/nuwaraeliya1.jpg',
    description: 'Little England known for cool mountain climate, Gregory Lake, Horton Plains, and World’s End precipice.',
    popularTowns: ['Nuwara Eliya City', 'Nanu Oya', 'Maskeliya', 'Hatton', 'Ramboda', 'Ohiya'],
    placesCount: 0,
    staysCount: 0
  },

  // Southern Province
  {
    id: 'dist-galle',
    name: 'Galle',
    slug: 'galle',
    province: 'Southern',
    imageUrl: '/images/galle.jpg',
    description: 'UNESCO Dutch Fort, historic seaside ramparts, vibrant surf towns, and seaside boutique villas.',
    popularTowns: ['Galle Fort', 'Unawatuna', 'Hikkaduwa', 'Koggala', 'Ahangama'],
    placesCount: 1,
    staysCount: 1
  },
  {
    id: 'dist-matara',
    name: 'Matara',
    slug: 'matara',
    province: 'Southern',
    imageUrl: '/images/matara.jpg',
    description: 'Famous Parey Duwa Island temple, Coconut Tree Hill, Mirissa whale watching, and Hiriketiya surf bay.',
    popularTowns: ['Mirissa', 'Weligama', 'Matara City', 'Dikwella', 'Hiriketiya', 'Polhena'],
    placesCount: 1,
    staysCount: 1
  },
  {
    id: 'dist-hambantota',
    name: 'Hambantota',
    slug: 'hambantota',
    province: 'Southern',
    imageUrl: '/images/Hambanthota.jpg',
    description: 'Leopard safari capital Yala National Park, Bundala bird sanctuary, and serene Tangalle beaches.',
    popularTowns: ['Yala', 'Tangalle', 'Tissamaharama', 'Hambantota City', 'Bundala', 'Kirinda'],
    placesCount: 0,
    staysCount: 0
  },

  // North Central Province
  {
    id: 'dist-anuradhapura',
    name: 'Anuradhapura',
    slug: 'anuradhapura',
    province: 'North Central',
    imageUrl: '/images/anuradapura.jpg',
    description: 'Sacred first ancient capital boasting majestic stupas like Ruwanwelisaya and the sacred Jaya Sri Maha Bodhi tree.',
    popularTowns: ['Anuradhapura Sacred City', 'Mihintale', 'Habarana', 'Kekirawa', 'Medawachchiya', 'Eppawala'],
    placesCount: 1,
    staysCount: 0
  },
  {
    id: 'dist-polonnaruwa',
    name: 'Polonnaruwa',
    slug: 'polonnaruwa',
    province: 'North Central',
    imageUrl: '/images/polonnaruwa.jpg',
    description: 'Medieval royal kingdom with well-preserved granite stone carvings, Gal Vihara, Parakrama Samudra, and palaces.',
    popularTowns: ['Polonnaruwa Ancient City', 'Kaduruwela', 'Minneriya', 'Giritale', 'Medirigiriya'],
    placesCount: 0,
    staysCount: 0
  },

  // Uva Province
  {
    id: 'dist-badulla',
    name: 'Badulla',
    slug: 'badulla',
    province: 'Uva',
    imageUrl: '/images/badulla.jpg',
    description: 'Home to misty Ella, Nine Arches Bridge, endless tea plantations, dramatic mountain gaps, and stunning waterfalls.',
    popularTowns: ['Ella', 'Badulla City', 'Bandarawela', 'Haputale', 'Mahiyanganaya', 'Passara'],
    placesCount: 1,
    staysCount: 1
  }
]

export const sriLankaTowns: Town[] = [
  // Colombo
  { id: 'town-colombo-fort', districtId: 'dist-colombo', districtName: 'Colombo', name: 'Colombo Fort', slug: 'colombo-fort' },
  { id: 'town-kollupitiya', districtId: 'dist-colombo', districtName: 'Colombo', name: 'Kollupitiya', slug: 'kollupitiya' },
  { id: 'town-cinnamon-gardens', districtId: 'dist-colombo', districtName: 'Colombo', name: 'Cinnamon Gardens', slug: 'cinnamon-gardens' },
  { id: 'town-mount-lavinia', districtId: 'dist-colombo', districtName: 'Colombo', name: 'Mount Lavinia', slug: 'mount-lavinia' },
  { id: 'town-dehiwala', districtId: 'dist-colombo', districtName: 'Colombo', name: 'Dehiwala', slug: 'dehiwala' },

  // Kandy
  { id: 'town-kandy-city', districtId: 'dist-kandy', districtName: 'Kandy', name: 'Kandy City', slug: 'kandy-city' },
  { id: 'town-peradeniya', districtId: 'dist-kandy', districtName: 'Kandy', name: 'Peradeniya', slug: 'peradeniya' },
  { id: 'town-gampola', districtId: 'dist-kandy', districtName: 'Kandy', name: 'Gampola', slug: 'gampola' },
  { id: 'town-hanthana', districtId: 'dist-kandy', districtName: 'Kandy', name: 'Hanthana', slug: 'hanthana' },

  // Matale
  { id: 'town-sigiriya', districtId: 'dist-matale', districtName: 'Matale', name: 'Sigiriya', slug: 'sigiriya' },
  { id: 'town-dambulla', districtId: 'dist-matale', districtName: 'Matale', name: 'Dambulla', slug: 'dambulla' },
  { id: 'town-matale-city', districtId: 'dist-matale', districtName: 'Matale', name: 'Matale City', slug: 'matale-city' },
  { id: 'town-knuckles', districtId: 'dist-matale', districtName: 'Matale', name: 'Knuckles', slug: 'knuckles' },

  // Nuwara Eliya
  { id: 'town-nuwara-eliya', districtId: 'dist-nuwara-eliya', districtName: 'Nuwara Eliya', name: 'Nuwara Eliya City', slug: 'nuwara-eliya-city' },
  { id: 'town-maskeliya', districtId: 'dist-nuwara-eliya', districtName: 'Nuwara Eliya', name: 'Maskeliya', slug: 'maskeliya' },
  { id: 'town-hatton', districtId: 'dist-nuwara-eliya', districtName: 'Nuwara Eliya', name: 'Hatton', slug: 'hatton' },
  { id: 'town-horton', districtId: 'dist-nuwara-eliya', districtName: 'Nuwara Eliya', name: 'Horton Plains', slug: 'horton-plains' },

  // Galle
  { id: 'town-galle-fort', districtId: 'dist-galle', districtName: 'Galle', name: 'Galle Fort', slug: 'galle-fort' },
  { id: 'town-unawatuna', districtId: 'dist-galle', districtName: 'Galle', name: 'Unawatuna', slug: 'unawatuna' },
  { id: 'town-hikkaduwa', districtId: 'dist-galle', districtName: 'Galle', name: 'Hikkaduwa', slug: 'hikkaduwa' },
  { id: 'town-ahangama', districtId: 'dist-galle', districtName: 'Galle', name: 'Ahangama', slug: 'ahangama' },

  // Matara
  { id: 'town-matara-city', districtId: 'dist-matara', districtName: 'Matara', name: 'Matara City', slug: 'matara-city' },
  { id: 'town-mirissa', districtId: 'dist-matara', districtName: 'Matara', name: 'Mirissa', slug: 'mirissa' },
  { id: 'town-weligama', districtId: 'dist-matara', districtName: 'Matara', name: 'Weligama', slug: 'weligama' },
  { id: 'town-hiriketiya', districtId: 'dist-matara', districtName: 'Matara', name: 'Hiriketiya / Dikwella', slug: 'hiriketiya' },

  // Hambantota
  { id: 'town-yala', districtId: 'dist-hambantota', districtName: 'Hambantota', name: 'Yala', slug: 'yala' },
  { id: 'town-tangalle', districtId: 'dist-hambantota', districtName: 'Hambantota', name: 'Tangalle', slug: 'tangalle' },
  { id: 'town-tissamaharama', districtId: 'dist-hambantota', districtName: 'Hambantota', name: 'Tissamaharama', slug: 'tissamaharama' },

  // Anuradhapura
  { id: 'town-anuradhapura-sacred', districtId: 'dist-anuradhapura', districtName: 'Anuradhapura', name: 'Anuradhapura Sacred City', slug: 'anuradhapura-sacred' },
  { id: 'town-mihintale', districtId: 'dist-anuradhapura', districtName: 'Anuradhapura', name: 'Mihintale', slug: 'mihintale' },

  // Polonnaruwa
  { id: 'town-polonnaruwa-ancient', districtId: 'dist-polonnaruwa', districtName: 'Polonnaruwa', name: 'Polonnaruwa Ancient City', slug: 'polonnaruwa-ancient' },

  // Badulla
  { id: 'town-ella', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Ella', slug: 'ella' },
  { id: 'town-badulla-city', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Badulla City', slug: 'badulla-city' },
  { id: 'town-bandarawela', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Bandarawela', slug: 'bandarawela' },
  { id: 'town-haputale', districtId: 'dist-badulla', districtName: 'Badulla', name: 'Haputale', slug: 'haputale' }
]

// =========================================================================
// ACTIVE SAMPLE PLACES (Curated with Local High-Res Photography)
// =========================================================================
export const initialPlaces: Place[] = [
  {
    id: 'place-sigiriya-rock',
    name: 'Sigiriya Lion Rock Fortress',
    slug: 'sigiriya-lion-rock-fortress',
    district: 'Matale',
    districtSlug: 'matale',
    town: 'Sigiriya',
    category: 'Historical',
    rating: 4.98,
    reviewsCount: 420,
    likesCount: 1850,
    coverImage: '/images/sigiriya.jpg',
    images: [
      '/images/sigiriya.jpg',
      '/images/sigiriya2.jpg',
      '/images/matale.jpg',
      '/images/pexels-dtravel-vlog-1025192350-29202494.jpg'
    ],
    shortDescription: 'The legendary 5th-century ancient citadel and UNESCO palace built atop a sheer 200m granite column.',
    description: 'Sigiriya is an ancient rock fortress dominated by a massive column of rock nearly 200 metres high. Built by King Kashyapa in the 5th century, the site features vibrant frescoes, the famous Mirror Wall with ancient graffiti, landscaped water gardens, and the colossal carved Lion Paw entrance leading to the summit palace ruins.',
    latitude: 7.9570,
    longitude: 80.7603,
    address: 'Sigiriya UNESCO Heritage Complex, Matale District',
    entryFee: 'LKR 10,800 (Foreign Adult) / LKR 100 (Local)',
    openingHours: '06:30 AM - 05:30 PM Daily',
    bestTimeToVisit: 'Early morning (06:30 AM - 08:30 AM) to avoid midday heat and crowds',
    highlights: ['Ancient Lion Paw gateway', 'World-famous 5th-century frescoes', 'Water gardens & Mirror Wall', '360° panoramic summit view'],
    status: 'approved',
    createdAt: '2025-01-10'
  },
  {
    id: 'place-nine-arches',
    name: 'Nine Arches Bridge',
    slug: 'nine-arches-bridge',
    district: 'Badulla',
    districtSlug: 'badulla',
    town: 'Ella',
    category: 'Historical',
    rating: 4.95,
    reviewsCount: 380,
    likesCount: 1620,
    coverImage: '/images/ella1.jpg',
    images: [
      '/images/ella1.jpg',
      '/images/ella3.jpg',
      '/images/badulla.jpg',
      '/images/pexels-thilina-alagiyawanna-3266092-34861076.jpg'
    ],
    shortDescription: 'Iconic colonial-era viaduct in the misty hills of Ella, famed for scenic passing trains and tea hills.',
    description: 'The Nine Arches Bridge, also known as the Bridge in the Sky, is a magnificent stone viaduct constructed without steel in Ella. Set amid rolling emerald tea hills, it is one of the most photographed train journey locations in the world. Visitors can hike scenic tea estate trails and witness the blue passenger trains passing over the viaduct.',
    latitude: 6.8768,
    longitude: 81.0608,
    address: 'Gotuwala, Ella, Badulla District',
    entryFee: 'Free Admission',
    openingHours: 'Open 24/7 (Best visits 06:30 AM - 05:30 PM)',
    bestTimeToVisit: 'Train passing times (09:15 AM, 11:30 AM, 03:30 PM, 05:15 PM)',
    highlights: ['Classic blue train crossing', 'Misty tea plantation views', 'Drone and portrait photography', 'Fresh coconut cafe stalls'],
    status: 'approved',
    createdAt: '2025-01-12'
  },
  {
    id: 'place-dalada-maligawa',
    name: 'Temple of the Sacred Tooth Relic',
    slug: 'temple-of-the-sacred-tooth-relic',
    district: 'Kandy',
    districtSlug: 'kandy',
    town: 'Kandy City',
    category: 'Temple',
    rating: 4.97,
    reviewsCount: 510,
    likesCount: 2200,
    coverImage: '/images/dalada maligawa.jpg',
    images: [
      '/images/dalada maligawa.jpg',
      '/images/temple.jpg',
      '/images/pexels-lakshan-abey-2148014952-38253196.jpg'
    ],
    shortDescription: 'The revered Buddhist royal palace complex housing the sacred tooth relic of the Buddha in Kandy.',
    description: 'Sri Dalada Maligawa, or the Temple of the Sacred Tooth Relic, is located in the royal palace complex of the former Kingdom of Kandy. It houses the venerated relic of the tooth of the Buddha. A UNESCO World Heritage site, it attracts millions of pilgrims and travelers worldwide, especially during the annual Esala Perahera festival.',
    latitude: 7.2936,
    longitude: 80.6413,
    address: 'Sri Dalada Veediya, Kandy City, Central Province',
    entryFee: 'LKR 2,000 (Foreign) / Free (Local)',
    openingHours: '05:30 AM - 08:00 PM Daily',
    bestTimeToVisit: 'Morning Thevava ceremony (05:30 AM or 09:30 AM) or evening pooja (06:30 PM)',
    highlights: ['Sacred Tooth Casket darshan', 'Golden Roof canopy', 'Traditional drummers during Thevava', 'Kandy Lake promenade'],
    status: 'approved',
    createdAt: '2025-01-15'
  },
  {
    id: 'place-galle-fort',
    name: 'Galle Dutch Fort & Ramparts',
    slug: 'galle-dutch-fort-and-ramparts',
    district: 'Galle',
    districtSlug: 'galle',
    town: 'Galle Fort',
    category: 'Historical',
    rating: 4.92,
    reviewsCount: 460,
    likesCount: 1980,
    coverImage: '/images/gallefort2.jpg',
    images: [
      '/images/gallefort2.jpg',
      '/images/galle.jpg',
      '/images/beach.jpg',
      '/images/pexels-orkhanshots-37681863.jpg'
    ],
    shortDescription: '17th-century UNESCO fortified coastal citadel featuring colonial cobblestone streets and ocean ramparts.',
    description: 'Built by the Portuguese and extensively fortified by the Dutch in the 17th century, Galle Fort is the best-preserved European fortified city in South Asia. Walk along the historic seawall ramparts, explore boutique cafes, gem shops, and Dutch colonial villas, and watch spectacular Indian Ocean sunsets near the iconic white lighthouse.',
    latitude: 6.0271,
    longitude: 80.2170,
    address: 'Church Street, Galle Fort, Southern Province',
    entryFee: 'Free Admission',
    openingHours: 'Open 24/7 (Ramparts best at sunrise & sunset)',
    bestTimeToVisit: 'Late afternoon (04:30 PM - 06:30 PM) for ocean breeze and sunset',
    highlights: ['Iconic Galle Lighthouse', 'Flag Rock cliff jumping & sunset', 'Colonial Dutch churches and villas', 'Artisan boutiques and cafes'],
    status: 'approved',
    createdAt: '2025-01-18'
  },
  {
    id: 'place-ruwanwelisaya',
    name: 'Ruwanwelisaya Sacred Stupa',
    slug: 'ruwanwelisaya-sacred-stupa',
    district: 'Anuradhapura',
    districtSlug: 'anuradhapura',
    town: 'Anuradhapura Sacred City',
    category: 'Temple',
    rating: 4.96,
    reviewsCount: 390,
    likesCount: 1740,
    coverImage: '/images/anuradapura.jpg',
    images: [
      '/images/anuradapura.jpg',
      '/images/anuradapura1.jpg',
      '/images/pexels-leo-pixie-332282673-18793297.jpg'
    ],
    shortDescription: 'Majestic ancient marvel and one of the world\'s tallest ancient monuments built by King Dutugemunu.',
    description: 'Ruwanwelisaya, also known as the Maha Stupa, is a hemispherical stupa in Anuradhapura built by King Dutugemunu in 140 B.C. Standing 103 meters tall with its iconic elephant wall base, it is one of the most sacred pilgrimage shrines for Buddhists worldwide and a testament to Sri Lanka\'s ancient architectural brilliance.',
    latitude: 8.3500,
    longitude: 80.3963,
    address: 'Sacred City, Anuradhapura, North Central Province',
    entryFee: 'Free Admission (Cultural Triangle ticket for whole city)',
    openingHours: '05:00 AM - 09:00 PM Daily',
    bestTimeToVisit: 'Early morning or evening for serene lotus pooja and illumination',
    highlights: ['Elephant wall perimeter', 'Sacred relics chamber', 'Evening oil lamp illumination', 'Adjacent Jaya Sri Maha Bodhi tree'],
    status: 'approved',
    createdAt: '2025-01-20'
  },
  {
    id: 'place-mirissa-beach',
    name: 'Mirissa Beach & Coconut Tree Hill',
    slug: 'mirissa-beach-and-coconut-tree-hill',
    district: 'Matara',
    districtSlug: 'matara',
    town: 'Mirissa',
    category: 'Beach',
    rating: 4.90,
    reviewsCount: 340,
    likesCount: 1530,
    coverImage: '/images/mirissa.jpg',
    images: [
      '/images/mirissa.jpg',
      '/images/mirissa2.jpg',
      '/images/matara.jpg',
      '/images/beach3.jpg'
    ],
    shortDescription: 'Picturesque palm-covered cliff overlook and vibrant crescent bay renowned for surfing and whale watching.',
    description: 'Mirissa is a tropical paradise on the southern coast of Sri Lanka. The crescent-shaped bay is lined with golden sand, swaying coconut palms, and lively beachside seafood restaurants. Just a short walk away is Coconut Tree Hill, an iconic red-cliff promontory studded with palm trees that offers stunning ocean panoramas.',
    latitude: 5.9482,
    longitude: 80.4578,
    address: 'Mirissa Beach Road, Matara District',
    entryFee: 'Free Admission',
    openingHours: 'Open 24/7',
    bestTimeToVisit: 'Sunrise for photography at Coconut Tree Hill; November to April for Blue Whale safaris',
    highlights: ['Coconut Tree Hill sunrise', 'Blue Whale watching expeditions', 'Secret Beach snorkeling', 'Beachfront candlelit seafood dining'],
    status: 'approved',
    createdAt: '2025-01-22'
  }
]

// =========================================================================
// ACTIVE SAMPLE STAYS & VILLAS
// =========================================================================
export const initialStays: Stay[] = [
  {
    id: 'stay-sigiriya-water-garden',
    name: 'Sigiriya Water Garden & Eco Villa',
    slug: 'sigiriya-water-garden-and-eco-villa',
    district: 'Matale',
    districtSlug: 'matale',
    town: 'Sigiriya',
    type: 'Villa',
    pricePerNight: 28500,
    currency: 'LKR',
    rating: 4.94,
    reviewsCount: 128,
    likesCount: 450,
    coverImage: 'https://images.pexels.com/photos/28736656/pexels-photo-28736656.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/28736656/pexels-photo-28736656.jpeg?auto=compress&cs=tinysrgb&w=1200',
      '/images/sigiriya.jpg',
      '/images/sigiriya2.jpg'
    ],
    shortDescription: 'Luxury water villa with direct views of Sigiriya Rock, infinity pool, and serene lotus ponds.',
    description: 'Nestled in lush countryside with direct unobstructed sightlines to the Sigiriya Rock Citadel, this boutique villa offers private plunge pools, expansive timber sundecks, organic garden dining, and tranquil bird-watching pavilions.',
    latitude: 7.9520,
    longitude: 80.7510,
    address: 'Audangawa Road, Sigiriya, Matale District',
    amenities: ['Private Pool', 'Free High-Speed WiFi', 'Rock View Terrace', 'Organic Restaurant', 'Air Conditioning', 'Free Parking', 'Airport Shuttle'],
    hostName: 'Sunil Weerasinghe',
    hostPhone: '+94 77 123 4567',
    hostWhatsApp: '+94 77 123 4567',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-25'
  },
  {
    id: 'stay-ella-mountain-mist',
    name: 'Ella Mountain Mist Cloud Villa',
    slug: 'ella-mountain-mist-cloud-villa',
    district: 'Badulla',
    districtSlug: 'badulla',
    town: 'Ella',
    type: 'Villa',
    pricePerNight: 22000,
    currency: 'LKR',
    rating: 4.96,
    reviewsCount: 142,
    likesCount: 520,
    coverImage: 'https://images.pexels.com/photos/14504291/pexels-photo-14504291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/14504291/pexels-photo-14504291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      '/images/ella1.jpg',
      '/images/badulla.jpg'
    ],
    shortDescription: 'Breathtaking mountain chalet overlooking Ella Gap and tea plantations with glass jacuzzi balcony.',
    description: 'Perched high in the mist-shrouded peaks of Ella, this modern timber and glass villa provides 180-degree panoramas of Ella Rock and Ravana Falls. Enjoy your morning Ceylon tea on the sun deck surrounded by bird songs and rolling mountain clouds.',
    latitude: 6.8710,
    longitude: 81.0490,
    address: 'Waterfall Road, Ella, Badulla District',
    amenities: ['Mountain View Balcony', 'Outdoor Jacuzzi', 'Breakfast Included', 'Free WiFi', 'Tea Lounge', 'Guided Trekking', 'Room Service'],
    hostName: 'Chaminda Bandara',
    hostPhone: '+94 71 987 6543',
    hostWhatsApp: '+94 71 987 6543',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-26'
  },
  {
    id: 'stay-galle-fort-mansion',
    name: 'Galle Fort Colonial Boutique Villa',
    slug: 'galle-fort-colonial-boutique-villa',
    district: 'Galle',
    districtSlug: 'galle',
    town: 'Galle Fort',
    type: 'Boutique Hotel',
    pricePerNight: 35000,
    currency: 'LKR',
    rating: 4.91,
    reviewsCount: 96,
    likesCount: 380,
    coverImage: 'https://images.pexels.com/photos/33786546/pexels-photo-33786546.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/33786546/pexels-photo-33786546.jpeg?auto=compress&cs=tinysrgb&w=1200',
      '/images/gallefort2.jpg',
      '/images/galle.jpg'
    ],
    shortDescription: 'Restored 18th-century Dutch colonial mansion with courtyard plunge pool inside Galle Fort.',
    description: 'Experience timeless elegance in this meticulously restored heritage mansion located within the UNESCO Galle Fort ramparts. Features antique four-poster beds, high timber ceilings, a private courtyard plunge pool, and gourmet dining.',
    latitude: 6.0285,
    longitude: 80.2185,
    address: 'Light House Street, Galle Fort, Southern Province',
    amenities: ['Plunge Pool', 'Courtyard Garden', 'Air Conditioning', 'Fine Dining Restaurant', 'Free High-Speed WiFi', 'Concierge Service'],
    hostName: 'Rohan De Silva',
    hostPhone: '+94 77 345 6789',
    hostWhatsApp: '+94 77 345 6789',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-28'
  },
  {
    id: 'stay-mirissa-beach-cove',
    name: 'Mirissa Palm Cove Beachfront Villa',
    slug: 'mirissa-palm-cove-beachfront-villa',
    district: 'Matara',
    districtSlug: 'matara',
    town: 'Mirissa',
    type: 'Villa',
    pricePerNight: 31000,
    currency: 'LKR',
    rating: 4.93,
    reviewsCount: 110,
    likesCount: 490,
    coverImage: 'https://images.pexels.com/photos/35242805/pexels-photo-35242805.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/35242805/pexels-photo-35242805.jpeg?auto=compress&cs=tinysrgb&w=1200',
      '/images/mirissa.jpg',
      '/images/mirissa2.jpg'
    ],
    shortDescription: 'Direct beachfront private villa steps away from Coconut Tree Hill with sunset infinity pool.',
    description: 'Wake up to the sound of turquoise waves and palm breezes in this private oceanfront sanctuary. Includes private beach access, a beachfront infinity pool, sun lounger decks, and a private chef ready to cook fresh catches of the day.',
    latitude: 5.9450,
    longitude: 80.4590,
    address: 'Coconut Tree Hill Road, Mirissa, Matara District',
    amenities: ['Direct Beach Access', 'Infinity Pool', 'Sunset Deck', 'Private Chef', 'Surfboard Rental', 'Free WiFi', 'BBQ Grill'],
    hostName: 'Kasun Fernando',
    hostPhone: '+94 76 543 2109',
    hostWhatsApp: '+94 76 543 2109',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-01-30'
  },
  {
    id: 'stay-kandy-lake-resort',
    name: 'Kandy Royal Lakeview Sanctuary',
    slug: 'kandy-royal-lakeview-sanctuary',
    district: 'Kandy',
    districtSlug: 'kandy',
    town: 'Kandy City',
    type: 'Resort',
    pricePerNight: 26000,
    currency: 'LKR',
    rating: 4.92,
    reviewsCount: 88,
    likesCount: 340,
    coverImage: 'https://images.pexels.com/photos/29710782/pexels-photo-29710782.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/29710782/pexels-photo-29710782.jpeg?auto=compress&cs=tinysrgb&w=1200',
      '/images/dalada maligawa.jpg',
      '/images/nuwaraeliya1.jpg'
    ],
    shortDescription: 'Perched on the hill overlooking Kandy Lake and Dalada Maligawa with spa and traditional ayurveda.',
    description: 'Set amidst tranquil tropical hills with panoramic vistas of Kandy Lake and the sacred Temple of the Tooth. Offers authentic ayurvedic treatments, hillside infinity pool, and open-air Kandyan dining.',
    latitude: 7.2910,
    longitude: 80.6450,
    address: 'Upper Lake Road, Kandy City, Central Province',
    amenities: ['Lake & Temple View', 'Ayurvedic Spa', 'Infinity Pool', 'Fine Dining Restaurant', 'Free Parking', 'High-Speed WiFi'],
    hostName: 'Malith Jayawardena',
    hostPhone: '+94 77 654 3210',
    hostWhatsApp: '+94 77 654 3210',
    hostIsPublic: true,
    status: 'approved',
    createdAt: '2025-02-01'
  }
]

// =========================================================================
// ACTIVE SAMPLE REVIEWS
// =========================================================================
export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    targetType: 'place',
    targetId: 'place-sigiriya-rock',
    userId: 'user-elena',
    userName: 'Elena Rostova',
    rating: 5,
    comment: 'Sigiriya blew my mind! The early morning climb was so peaceful and the 360-degree view at the summit is unforgettable.',
    status: 'approved',
    createdAt: '2025-02-10'
  },
  {
    id: 'rev-2',
    targetType: 'place',
    targetId: 'place-nine-arches',
    userId: 'user-david',
    userName: 'David Miller',
    rating: 5,
    comment: 'The train crossing over Nine Arches was like a scene straight from a fantasy movie. Grab a fresh king coconut while waiting!',
    status: 'approved',
    createdAt: '2025-02-14'
  },
  {
    id: 'rev-3',
    targetType: 'stay',
    targetId: 'stay-sigiriya-water-garden',
    userId: 'user-sarah',
    userName: 'Sarah Jenkins',
    rating: 5,
    comment: 'Waking up to the view of Sigiriya Rock while dipping in our private pool was the highlight of our entire Sri Lanka honeymoon.',
    status: 'approved',
    createdAt: '2025-02-18'
  }
]

export const initialSubmissions: Submission[] = []