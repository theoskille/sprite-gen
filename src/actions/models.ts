'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function createModel(formData: FormData) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('Error getting user:', userError);
    return;
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const outputWidth = parseInt(formData.get('output_width') as string);
  const outputHeight = parseInt(formData.get('output_height') as string);
  const triggerWord = formData.get('trigger_word') as string;
  const projectId = formData.get('project_id') as string;

  const { error } = await supabase
    .from('models')
    .insert([
      {
        name,
        description,
        output_width: outputWidth,
        output_height: outputHeight,
        trigger_word: triggerWord,
        project_id: projectId,
        user_id: user.id,
        status: 'pending'
      },
    ]);

  if (error) {
    throw error;
  }

  redirect(`/projects/${projectId}`);
} 