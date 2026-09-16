import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Submission ID is required'
    })
  }

  const submission = await prisma.submission.findUnique({
    where: { id }
  })

  if (!submission) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Submission not found'
    })
  }

  const newStatus = body.status // 'approved' | 'rejected'

  const updatedSubmission = await prisma.submission.update({
    where: { id },
    data: { status: newStatus }
  })

  // If approved, create live Place or Stay
  if (newStatus === 'approved') {
    const subData = JSON.parse(submission.data || '{}')
    const slug = (subData.name || submission.title)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    if (submission.type === 'place') {
      await prisma.place.create({
        data: {
          name: subData.name || submission.title,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          district: subData.district || submission.district,
          districtSlug: (subData.district || submission.district).toLowerCase().replace(/\s+/g, '-'),
          town: subData.town || submission.town,
          category: subData.category || 'Nature',
          rating: 5.0,
          reviewsCount: 0,
          likesCount: 0,
          coverImage: subData.coverImage || '/images/sigiriya.jpg',
          images: JSON.stringify(subData.images || [subData.coverImage || '/images/sigiriya.jpg']),
          shortDescription: subData.shortDescription || '',
          description: subData.description || subData.shortDescription || '',
          latitude: Number(subData.latitude) || 7.8731,
          longitude: Number(subData.longitude) || 80.7718,
          address: subData.address || `${submission.town}, ${submission.district}`,
          entryFee: subData.entryFee || 'Free',
          openingHours: subData.openingHours || 'Open 24/7',
          bestTimeToVisit: subData.bestTimeToVisit || 'Morning',
          highlights: JSON.stringify(subData.highlights || []),
          status: 'approved'
        }
      })
    } else if (submission.type === 'stay') {
      await prisma.stay.create({
        data: {
          name: subData.name || submission.title,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          district: subData.district || submission.district,
          districtSlug: (subData.district || submission.district).toLowerCase().replace(/\s+/g, '-'),
          town: subData.town || submission.town,
          type: subData.type || 'Villa',
          pricePerNight: Number(subData.pricePerNight) || 25000,
          currency: subData.currency || 'LKR',
          rating: 5.0,
          reviewsCount: 0,
          likesCount: 0,
          coverImage: subData.coverImage || '/images/sigiriya.jpg',
          images: JSON.stringify(subData.images || [subData.coverImage || '/images/sigiriya.jpg']),
          shortDescription: subData.shortDescription || '',
          description: subData.description || subData.shortDescription || '',
          latitude: Number(subData.latitude) || 6.0,
          longitude: Number(subData.longitude) || 80.5,
          address: subData.address || `${submission.town}, ${submission.district}`,
          amenities: JSON.stringify(subData.amenities || ['Wi-Fi', 'Air Conditioning']),
          hostName: subData.hostName || submission.submittedBy,
          hostPhone: subData.hostPhone || '+94 77 000 0000',
          hostWhatsApp: subData.hostWhatsApp || '+94770000000',
          hostIsPublic: true,
          status: 'approved'
        }
      })
    }
  }

  return {
    success: true,
    submission: {
      ...updatedSubmission,
      data: JSON.parse(updatedSubmission.data || '{}')
    }
  }
})
