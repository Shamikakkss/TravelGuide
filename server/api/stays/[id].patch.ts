import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!idOrSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stay ID is required'
    })
  }

  const existing = await prisma.stay.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }]
    }
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stay not found'
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

  const updated = await prisma.stay.update({
    where: { id: existing.id },
    data: dataToUpdate
  })

  return {
    success: true,
    stay: {
      ...updated,
      images: JSON.parse(updated.images || '[]'),
      amenities: JSON.parse(updated.amenities || '[]')
    }
  }
})
