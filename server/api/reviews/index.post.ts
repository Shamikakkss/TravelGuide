import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.targetId || !body.targetType || !body.comment) {
    throw createError({
      statusCode: 400,
      statusMessage: 'targetId, targetType and comment are required'
    })
  }

  const review = await prisma.review.create({
    data: {
      targetType: body.targetType,
      targetId: body.targetId,
      userId: body.userId || 'usr-guest',
      userName: body.userName || 'Anonymous Traveler',
      userAvatar: body.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      rating: Number(body.rating) || 5,
      comment: body.comment,
      status: 'approved'
    }
  })

  // Recalculate rating & reviewsCount for the target Place or Stay
  const allReviews = await prisma.review.findMany({
    where: {
      targetType: body.targetType,
      targetId: body.targetId,
      status: 'approved'
    }
  })

  const count = allReviews.length
  const avgRating = count > 0 
    ? Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(2)) 
    : 5.0

  if (body.targetType === 'place') {
    await prisma.place.update({
      where: { id: body.targetId },
      data: {
        reviewsCount: count,
        rating: avgRating
      }
    })
  } else if (body.targetType === 'stay') {
    await prisma.stay.update({
      where: { id: body.targetId },
      data: {
        reviewsCount: count,
        rating: avgRating
      }
    })
  }

  return {
    success: true,
    review,
    newRating: avgRating,
    newCount: count
  }
})
