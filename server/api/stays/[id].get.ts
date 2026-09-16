import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, 'id')

  if (!idOrSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stay ID or Slug is required'
    })
  }

  const stay = await prisma.stay.findFirst({
    where: {
      OR: [
        { id: idOrSlug },
        { slug: idOrSlug }
      ]
    }
  })

  if (!stay) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stay not found'
    })
  }

  // Get reviews for this stay
  const reviews = await prisma.review.findMany({
    where: {
      targetType: 'stay',
      targetId: stay.id,
      status: 'approved'
    },
    orderBy: { createdAt: 'desc' }
  })

  // Get nearby attractions
  const nearbyPlaces = await prisma.place.findMany({
    where: {
      OR: [
        { districtSlug: stay.districtSlug },
        { town: stay.town }
      ],
      status: 'approved'
    },
    take: 4
  })

  return {
    stay: {
      ...stay,
      images: JSON.parse(stay.images || '[]'),
      amenities: JSON.parse(stay.amenities || '[]')
    },
    reviews,
    nearbyPlaces: nearbyPlaces.map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      highlights: JSON.parse(p.highlights || '[]')
    }))
  }
})
