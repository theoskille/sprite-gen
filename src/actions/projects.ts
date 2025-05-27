'use server';

import { createClient } from '@/lib/supabase/server';
import { Project } from '@/types/database';
import { redirect } from 'next/navigation';

interface ProjectWithModelCount extends Project {
  model_count: number;
}

interface ProjectWithModels extends Project {
  models: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }[];
}

export async function getProjects(): Promise<ProjectWithModelCount[]> {
  const supabase = await createClient();
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      models:models(count)
    `)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return projects.map(project => ({
    ...project,
    model_count: project.models[0].count
  }));
}

export async function getProject(id: string): Promise<ProjectWithModels | null> {
  const supabase = await createClient();
  
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      models:models(
        id,
        name,
        created_at,
        updated_at
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return project;
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('Error getting user:', userError);
    return;
  }

  const { error } = await supabase
    .from('projects')
    .insert([{ 
      name,
      description,
      user_id: user.id 
    }]);

  if (error) {
    console.error('Error creating project:', error);
    return;
  }

  redirect('/dashboard');
} 