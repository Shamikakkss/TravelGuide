import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.district || !body.town || !body.pricePerNight) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, District, Town and Price Per Night are required'
    })
  }

  const slug = (body.slug || body.name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  const stay = await prisma.stay.create({
    data: {
      name: body.name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      district: body.district,
      districtSlug: body.districtSlug || body.district.toLowerCase().replace(/\s+/g, '-'),
      town: body.town,
      type: body.type || 'Villa',
      pricePerNight: Number(body.pricePerNight) || 25000,
      currency: body.currency || 'LKR',
      rating: body.rating || 5.0,
      reviewsCount: 0,
      likesCount: 0,
      coverImage: body.coverImage || '/images/sigiriya.jpg',
      images: JSON.stringify(body.images || [body.coverImage || '/images/sigiriya.jpg']),
      shortDescription: body.shortDescription || '',
      description: body.description || body.shortDescription || '',
      latitude: Number(body.latitude) || 6.0,
      longitude: Number(body.longitude) || 80.5,
      address: body.address || `${body.town}, ${body.district}`,
      amenities: JSON.stringify(body.amenities || ['Wi-Fi', 'Air Conditioning']),
      hostName: body.hostName || 'Host',
      hostPhone: body.hostPhone || '+94 77 000 0000',
      hostWhatsApp: body.hostWhatsApp || '+94770000000',
      hostIsPublic: body.hostIsPublic ?? true,
      status: body.status || 'approved'
    }
  })

  return {
    success: true,
    stay: {
      ...stay,
      images: JSON.parse(stay.images || '[]'),
      amenities: JSON.parse(stay.amenities || '[]')
    }
  }
})
