export interface Project {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Model {
  id: string;
  user_id: string;
  project_id: string;
  name: string;
  description: string | null;
  output_width: number;
  output_height: number;
  trigger_word: string;
  status: 'draft' | 'training' | 'ready' | 'failed';
  replicate_training_id: string | null;
  replicate_model_name: string | null;
  replicate_model_version: string | null;
  last_trained_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Upload {
  id: string;
  user_id: string;
  project_id: string;
  model_id: string;
  url: string;
  name: string;
  created_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  project_id: string;
  model_id: string;
  image_url: string;
  prompt: string;
  created_at: string;
} 