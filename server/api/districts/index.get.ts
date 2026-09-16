import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const districts = await prisma.district.findMany({
    orderBy: { name: 'asc' }
  })

  const towns = await prisma.town.findMany({
    orderBy: { name: 'asc' }
  })

  return {
    districts: districts.map(d => ({
      ...d,
      popularTowns: JSON.parse(d.popularTowns || '[]')
    })),
    towns
  }
})
