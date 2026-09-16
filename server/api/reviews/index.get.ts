import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const targetId = query.targetId as string | undefined
  const targetType = query.targetType as string | undefined

  const where: any = {
    status: 'approved'
  }

  if (targetId) {
    where.targetId = targetId
  }

  if (targetType) {
    where.targetType = targetType
  }

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  return reviews
})
