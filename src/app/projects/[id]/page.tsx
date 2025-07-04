import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ModelCard } from '@/components/dashboard/ModelCard';
import { CreateModelCard } from '@/components/dashboard/CreateModelCard';
import { getProject } from '@/actions/projects';
import { BackButton } from '@/components/ui/BackButton';
import { Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    redirect('/projects');
  }

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <BackButton href="/dashboard" />
              <div>
                <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                <p className="mt-2 text-sm text-gray-400">{project.description || 'No description'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    Created {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.models.map((model) => (
              <ModelCard
                key={model.id}
                id={model.id}
                name={model.name}
                description={model.description}
                triggerWord={model.trigger_word}
                outputWidth={model.output_width}
                outputHeight={model.output_height}
                lastTrainedAt={model.last_trained_at}
                updatedAt={model.updated_at}
                status={model.status}
                projectId={id}
              />
            ))}
            <CreateModelCard projectId={id} />
          </div>
        </div>
      </main>
    </div>
  );
} 