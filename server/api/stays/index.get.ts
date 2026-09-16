import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const district = query.district as string | undefined
  const stayType = query.stayType as string | undefined
  const search = query.search as string | undefined
  const town = query.town as string | undefined

  const where: any = {
    status: 'approved'
  }

  if (district && district !== 'All') {
    where.district = { equals: district }
  }

  if (town && town !== 'All') {
    where.town = { equals: town }
  }

  if (stayType && stayType !== 'All') {
    where.type = { equals: stayType }
  }

  if (search && search.trim()) {
    const q = search.trim()
    where.OR = [
      { name: { contains: q } },
      { shortDescription: { contains: q } },
      { town: { contains: q } },
      { district: { contains: q } },
      { type: { contains: q } }
    ]
  }

  const stays = await prisma.stay.findMany({
    where,
    orderBy: { likesCount: 'desc' }
  })

  return stays.map(s => ({
    ...s,
    images: JSON.parse(s.images || '[]'),
    amenities: JSON.parse(s.amenities || '[]')
  }))
})
