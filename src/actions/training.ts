'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Upload a single image to storage
export async function uploadImageToStorage(
  projectId: string,
  modelId: string,
  formData: FormData
) {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    throw new Error('You must be logged in to upload images')
  }

  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file provided')
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image')
  }

  // Convert file to buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Generate unique file path with user ID as first folder
  const fileId = Math.random().toString(36).substring(7)
  const filePath = `${user.id}/${projectId}/${modelId}/${fileId}-${file.name}`

  try {
    const { data, error } = await supabase.storage
      .from('training-images')
      .upload(filePath, buffer, {
        contentType: file.type,
      })

    if (error) throw error

    // Save file metadata to database
    await supabase
      .from('uploads')
      .insert({
        user_id: user.id,
        project_id: projectId,
        model_id: modelId,
        url: filePath,
        name: file.name
      })

    // Revalidate the model page to show new image
    revalidatePath(`/projects/${projectId}/models/${modelId}`)

    return { success: true, filePath }
  } catch (error) {
    console.error('Error uploading training image:', error)
    throw new Error('Failed to upload image')
  }
}

// Get all images for a model
export async function getModelImages(projectId: string, modelId: string) {
  const supabase = await createClient()
  
  const { data: images, error } = await supabase
    .from('uploads')
    .select('*')
    .eq('project_id', projectId)
    .eq('model_id', modelId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching training images:', error)
    throw new Error('Failed to fetch training images')
  }

  return images
}

// Get a single image from storage
export async function getImageFromStorage(filePath: string) {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase.storage
      .from('training-images')
      .download(filePath)

    if (error) throw error

    // Convert the blob to a base64 string
    const arrayBuffer = await data.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const mimeType = data.type || 'image/png'
    
    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    console.error('Error fetching image:', error)
    throw new Error('Failed to fetch image')
  }
} 

