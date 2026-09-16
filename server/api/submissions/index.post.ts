import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.title || !body.type || !body.district || !body.town) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title, type, district and town are required'
    })
  }

  const submission = await prisma.submission.create({
    data: {
      type: body.type,
      title: body.title,
      district: body.district,
      town: body.town,
      submittedBy: body.submittedBy || 'Anonymous Contributor',
      userEmail: body.userEmail || 'traveler@example.lk',
      status: 'pending',
      data: JSON.stringify(body.data || body)
    }
  })

  return {
    success: true,
    submission: {
      ...submission,
      data: JSON.parse(submission.data || '{}')
    }
  }
})
