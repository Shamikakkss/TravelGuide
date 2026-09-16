import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.district || !body.town) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, District and Town are required'
    })
  }

  const slug = (body.slug || body.name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  const place = await prisma.place.create({
    data: {
      name: body.name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      district: body.district,
      districtSlug: body.districtSlug || body.district.toLowerCase().replace(/\s+/g, '-'),
      town: body.town,
      category: body.category || 'Nature',
      rating: body.rating || 5.0,
      reviewsCount: 0,
      likesCount: 0,
      coverImage: body.coverImage || '/images/sigiriya.jpg',
      images: JSON.stringify(body.images || [body.coverImage || '/images/sigiriya.jpg']),
      shortDescription: body.shortDescription || '',
      description: body.description || body.shortDescription || '',
      latitude: Number(body.latitude) || 7.8731,
      longitude: Number(body.longitude) || 80.7718,
      address: body.address || `${body.town}, ${body.district}`,
      entryFee: body.entryFee || 'Free',
      openingHours: body.openingHours || 'Open 24/7',
      bestTimeToVisit: body.bestTimeToVisit || 'Morning',
      highlights: JSON.stringify(body.highlights || []),
      status: body.status || 'approved'
    }
  })

  return {
    success: true,
    place: {
      ...place,
      images: JSON.parse(place.images || '[]'),
      highlights: JSON.parse(place.highlights || '[]')
    }
  }
})
