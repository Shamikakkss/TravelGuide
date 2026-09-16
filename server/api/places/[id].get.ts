import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, 'id')

  if (!idOrSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Place ID or Slug is required'
    })
  }

  const place = await prisma.place.findFirst({
    where: {
      OR: [
        { id: idOrSlug },
        { slug: idOrSlug }
      ]
    }
  })

  if (!place) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Place not found'
    })
  }

  // Get reviews for this place
  const reviews = await prisma.review.findMany({
    where: {
      targetType: 'place',
      targetId: place.id,
      status: 'approved'
    },
    orderBy: { createdAt: 'desc' }
  })

  // Get nearby stays
  const nearbyStays = await prisma.stay.findMany({
    where: {
      OR: [
        { districtSlug: place.districtSlug },
        { town: place.town }
      ],
      status: 'approved'
    },
    take: 4
  })

  return {
    place: {
      ...place,
      images: JSON.parse(place.images || '[]'),
      highlights: JSON.parse(place.highlights || '[]')
    },
    reviews,
    nearbyStays: nearbyStays.map(s => ({
      ...s,
      images: JSON.parse(s.images || '[]'),
      amenities: JSON.parse(s.amenities || '[]')
    }))
  }
})
