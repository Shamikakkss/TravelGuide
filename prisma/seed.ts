import { PrismaClient } from '@prisma/client'
import {
  sriLankaDistricts,
  sriLankaTowns,
  initialPlaces,
  initialStays,
  initialReviews
} from '../data/sriLankaData'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database initialization...')

  // Clear existing records
  await prisma.submission.deleteMany()
  await prisma.review.deleteMany()
  await prisma.stay.deleteMany()
  await prisma.place.deleteMany()
  await prisma.town.deleteMany()
  await prisma.district.deleteMany()

  console.log('🗑️ Cleared existing database tables.')

  // Seed Districts
  for (const d of sriLankaDistricts) {
    await prisma.district.create({
      data: {
        id: d.id,
        name: d.name,
        slug: d.slug,
        province: d.province,
        imageUrl: d.imageUrl,
        description: d.description,
        popularTowns: JSON.stringify(d.popularTowns),
        placesCount: d.placesCount ?? 0,
        staysCount: d.staysCount ?? 0
      }
    })
  }
  console.log(`✅ Seeded ${sriLankaDistricts.length} districts.`)

  // Seed Towns
  for (const t of sriLankaTowns) {
    await prisma.town.create({
      data: {
        id: t.id,
        districtId: t.districtId,
        districtName: t.districtName,
        name: t.name,
        slug: t.slug
      }
    })
  }
  console.log(`✅ Seeded ${sriLankaTowns.length} towns.`)

  // Seed Places
  for (const p of initialPlaces) {
    await prisma.place.create({
      data: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        district: p.district,
        districtSlug: p.districtSlug,
        town: p.town,
        category: p.category,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        likesCount: p.likesCount,
        coverImage: p.coverImage,
        images: JSON.stringify(p.images),
        shortDescription: p.shortDescription,
        description: p.description,
        latitude: p.latitude,
        longitude: p.longitude,
        address: p.address,
        entryFee: p.entryFee ?? null,
        openingHours: p.openingHours ?? null,
        bestTimeToVisit: p.bestTimeToVisit ?? null,
        highlights: JSON.stringify(p.highlights),
        status: p.status
      }
    })
  }
  console.log(`✅ Seeded ${initialPlaces.length} places.`)

  // Seed Stays
  for (const s of initialStays) {
    await prisma.stay.create({
      data: {
        id: s.id,
        name: s.name,
        slug: s.slug,
        district: s.district,
        districtSlug: s.districtSlug,
        town: s.town,
        type: s.type,
        pricePerNight: s.pricePerNight,
        currency: s.currency,
        rating: s.rating,
        reviewsCount: s.reviewsCount,
        likesCount: s.likesCount,
        coverImage: s.coverImage,
        images: JSON.stringify(s.images),
        shortDescription: s.shortDescription,
        description: s.description,
        latitude: s.latitude,
        longitude: s.longitude,
        address: s.address,
        amenities: JSON.stringify(s.amenities),
        hostName: s.hostName,
        hostPhone: s.hostPhone ?? '',
        hostWhatsApp: s.hostWhatsApp ?? '',
        hostIsPublic: s.hostIsPublic,
        status: s.status
      }
    })
  }
  console.log(`✅ Seeded ${initialStays.length} stays.`)

  // Seed Reviews
  for (const r of initialReviews) {
    await prisma.review.create({
      data: {
        id: r.id,
        targetType: r.targetType,
        targetId: r.targetId,
        userId: r.userId ?? null,
        userName: r.userName,
        userAvatar: r.userAvatar ?? null,
        rating: r.rating,
        comment: r.comment,
        status: r.status
      }
    })
  }
  console.log(`✅ Seeded ${initialReviews.length} reviews.`)

  console.log('✨ Database seeded with sample places, stays and reviews!')
  console.log('Ready to showcase Sri Lanka Travel Guide!')
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
