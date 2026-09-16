import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const district = query.district as string | undefined
  const category = query.category as string | undefined
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

  if (category && category !== 'All') {
    where.category = { equals: category }
  }

  if (search && search.trim()) {
    const q = search.trim()
    where.OR = [
      { name: { contains: q } },
      { shortDescription: { contains: q } },
      { town: { contains: q } },
      { district: { contains: q } }
    ]
  }

  const places = await prisma.place.findMany({
    where,
    orderBy: { likesCount: 'desc' }
  })

  return places.map(p => ({
    ...p,
    images: JSON.parse(p.images || '[]'),
    highlights: JSON.parse(p.highlights || '[]')
  }))
})
