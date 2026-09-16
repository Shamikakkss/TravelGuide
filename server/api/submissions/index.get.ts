import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const status = query.status as string | undefined

  const where: any = {}
  if (status && status !== 'All') {
    where.status = status
  }

  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { submittedAt: 'desc' }
  })

  return submissions.map(s => ({
    ...s,
    data: JSON.parse(s.data || '{}')
  }))
})
