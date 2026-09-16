import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!idOrSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Place ID is required'
    })
  }

  const existing = await prisma.place.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }]
    }
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Place not found'
    })
  }

  const dataToUpdate: any = {}

  if (body.likesCount !== undefined) {
    dataToUpdate.likesCount = body.likesCount
  }
  if (body.rating !== undefined) {
    dataToUpdate.rating = body.rating
  }
  if (body.reviewsCount !== undefined) {
    dataToUpdate.reviewsCount = body.reviewsCount
  }
  if (body.status !== undefined) {
    dataToUpdate.status = body.status
  }

  const updated = await prisma.place.update({
    where: { id: existing.id },
    data: dataToUpdate
  })

  return {
    success: true,
    place: {
      ...updated,
      images: JSON.parse(updated.images || '[]'),
      highlights: JSON.parse(updated.highlights || '[]')
    }
  }
})
