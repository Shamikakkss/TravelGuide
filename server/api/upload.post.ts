import { defineEventHandler, createError, readMultipartFormData } from 'h3'
import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event)

    if (!files || files.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = files[0]

    // Validate mime type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif']
    if (file.type && !validMimes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type. Only JPEG, PNG, WEBP and GIF are allowed.'
      })
    }

    // Ensure uploads directory exists
    const uploadsDir = path.resolve(process.cwd(), 'public/uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Generate clean unique filename
    const originalExt = path.extname(file.filename || '.jpg') || '.jpg'
    const cleanBaseName = (file.filename || 'image')
      .replace(originalExt, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 30)

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`
    const finalFilename = `${cleanBaseName}-${uniqueSuffix}${originalExt}`
    const destinationPath = path.join(uploadsDir, finalFilename)

    // Write file to disk
    fs.writeFileSync(destinationPath, file.data)

    const publicUrl = `/uploads/${finalFilename}`

    return {
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: file.data.length
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to upload image'
    })
  }
})
